import mongoose from "mongoose";
import bcrypt from "bcrypt"
import crypto from "crypto"


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        trim: true,
        kMaxLength: [52, "Name cannot exceed 52 characters"]
    ,
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        lowerCase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']  
      },
      password: {
        type: String,
        require:true,
        minLength:[8,"password should be greater than 8 characters"],
        select: false,
    },
    role:{
        type:String,
        enum:{values:["student","instructor","admin"],message:"role is not supported"},
        default:"student"
    },
    bio:{
        type:String,
        maxLength:[200, "Bio cannot exceed 200 characters"]
    },
    entrolledCourses:[{
       course:{
        type:mongoose.Schema.ObjectId,
        ref:"Course"
    },
    entrolledAt:{
        type:Date,
        default:Date.now
    }
}],
    resetPasswordTaken:String,
    resetPasswordExpireDate:Date,
    lastActive:{
        type:Date,
        default:Date.now
    }
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

// pre-save hooks for password hashing here using bcrypt

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
   try {
       this.password = await bcrypt.hash(this.password,10)
       next()
   } catch (error) {
    next(error)
   }
}
)


userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.getResetPasswordToken = function () {
    const resetToken= crypto.randomBytes(20).toString("hex")
    this.resetPasswordTaken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex")

    this.resetPasswordExpireDate = Date.now() + 10 * 60 * 1000 // 10 minutes

    // Return the plain token (to be sent to the user)
    return resetToken    
}

userSchema.methods.updateLastActive = async function () {
    // Update the lastActive field
    this.lastActive = Date.now();
    try {
        // Save the change to the database, skipping validation for just this field update
        await this.save({ validateBeforeSave: false });
        return this.lastActive; // Return the updated date after successful save
    } catch (error) {
        console.error("Error updating lastActive:", error);
        // Decide how to handle the error, maybe re-throw or return null
        throw error;
    }
};


// vertual field for entrolled courses

userSchema.virtual("entrolledCourses").get(function(){
    return this.entrolledCourses.length
})


const User = mongoose.model("User",userSchema)

export default User