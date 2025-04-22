import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const coursePurchaseSchema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course', // Assumes you have a 'Course' model
    required: [true, 'Course ID is required.'],
    index: true, // Index for faster lookups by course
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Assumes you have a 'User' model
    required: [true, 'User ID is required.'],
    index: true, // Index for faster lookups by user
  },
  amount: {
    type: Number,
    required: [true, 'Purchase amount is required.'],
    min: [0, 'Amount cannot be negative.'],
  },
  currency: {
    type: String,
    required: [true, 'Currency code is required.'],
    uppercase: true, // Standardize currency codes (e.g., 'USD', 'EUR')
    trim: true,
    // Consider adding an enum if you only support specific currencies:
    // enum: { values: ['USD', 'EUR', 'GBP'], message: '{VALUE} is not a supported currency.' }
  },
  status: {
    type: String,
    required: true,
    enum: {
        values: ['pending', 'completed', 'failed', 'refunded', 'partially_refunded'],
        message: '{VALUE} is not a valid purchase status.'
    },
    default: 'pending',
    index: true, // Index for faster lookups by status
  },
  paymentMethod: {
    type: String,
    required: [true, 'Payment method is required.'],
    trim: true,
    // Consider adding an enum for known payment methods:
    // enum: ['stripe', 'paypal', 'credit_card', 'bank_transfer']
  },
  paymentId: { // Transaction ID from the payment gateway
    type: String,
    // Often required once status is 'completed', but might not exist for 'pending' or 'failed' initially
    required: function() { return this.status === 'completed' || this.status === 'refunded' || this.status === 'partially_refunded'; },
    unique: true, // Payment IDs from gateways should be unique
    sparse: true, // Allows multiple documents to have null/missing paymentId if not required
    index: true,
    trim: true,
  },
  refundId: { // Transaction ID for the refund, if applicable
    type: String,
    trim: true,
    index: true,
    default: null,
  },
  refundAmount: {
    type: Number,
    min: [0, 'Refund amount cannot be negative.'],
    default: null,
    // Add validation: refundAmount should not exceed the original amount
    validate: {
        validator: function(value) {
            // Allows null or ensures refund is not more than paid amount
            return value === null || value <= this.amount;
        },
        message: 'Refund amount cannot exceed the original purchase amount.'
    }
  },
  refundReason: {
    type: String,
    trim: true,
    default: null,
  },
  metadata: { // Flexible field for storing additional unstructured data
    type: Schema.Types.Mixed,
    default: {},
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Optional: Compound index for efficiently finding a specific user's purchase of a specific course
coursePurchaseSchema.index({ user: 1, course: 1 });


// isRefundeable
coursePurchaseSchema.virtual("isRefundeable").get(function (){
    if(this.status !== "completed" && this.status !== "refunded" && this.status !== "partially_refund") return false;
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    return this.createdAt > thirtyDaysAgo
})

// method to process refund

coursePurchaseSchema.methods.refundProcess = function(amount,reason) {
    if(this.isRefundeable) {
        this.status = "refunded"
        this.refundAmount = amount || this.amount
        this.refundReason = reason
        return this.save()
    }
}

// Create the Mongoose model
const CoursePurchase = mongoose.model('CoursePurchase', coursePurchaseSchema);



export default CoursePurchase;
