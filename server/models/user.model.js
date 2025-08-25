import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      trim: true,
      kMaxLength: [52, 'Name cannot exceed 52 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      lowerCase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    password: {
      type: String,
      require: true,
      minLength: [8, 'password should be greater than 8 characters'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: true,
      validate: {
        validator: function (el) {
          return el === this.password
        },
        message: 'Passwords are not the same!',
      },
    },
    profile: {
      type: String,
      default: 'default.jpg',
    },
    roles: [
      {
        // Changed from 'role' to 'roles'
        type: String,
        enum: {
          values: ['student', 'instructor', 'admin'],
          message: 'Role is not supported',
        },
        default: ['student'], // student by default,
      },
    ],
    bio: {
      type: String,
      maxLength: [200, 'Bio cannot exceed 200 characters'],
    },
    entrolledCourses: [
      {
        course: {
          type: mongoose.Schema.ObjectId,
          ref: 'Course',
        },
        entrolledAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    resetPasswordTaken: String,
    resetPasswordExpireDate: Date,
    passwordChangedAt: Date,
    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirm = undefined
  next()
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next()
  this.passwordChangedAt = Date.now() - 1000
  next()
})

userSchema.methods.comparePassword = async function (
  enteredPassword,
  candidatePassword,
) {
  if (!candidatePassword || !enteredPassword) return false
  return await bcrypt.compare(enteredPassword, candidatePassword)
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    )
    // JWTTimestamp is in seconds, passwordChangedAt is a Date object
    return JWTTimestamp < changedTimestamp
  }
  return false
}

// change password
userSchema.methods.updatePassword = async function (
  newPassword,
  passwordConfirm,
) {
  this.password = newPassword
  this.passwordConfirm = passwordConfirm
  this.passwordChangedAt = Date.now()
  await this.save()
}

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex')
  this.resetPasswordTaken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  this.resetPasswordExpireDate = Date.now() + 10 * 60 * 1000 // 10 minutes

  // Return the plain token (to be sent to the user)
  return resetToken
}

userSchema.methods.updateLastActive = async function () {
  // Update the lastActive field
  this.lastActive = Date.now()
  try {
    // Save the change to the database, skipping validation for just this field update
    await this.save({ validateBeforeSave: false })
    return this.lastActive // Return the updated date after successful save
  } catch (error) {
    console.error('Error updating lastActive:', error)
    // Decide how to handle the error, maybe re-throw or return null
    throw error
  }
}

// vertual field for entrolled courses

// userSchema.virtual("entrolledCourses").get(function(){
//     return this.entrolledCourses.length
// })

const User = mongoose.model('User', userSchema)

export default User
