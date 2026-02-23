import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  confirmPassword: { 
    type: String, 
    required: false
  },
   contactNumber: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, "Enter a valid 10 digit phone number"]
  },
  whatsappNumber: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, "Enter a valid 10 digit WhatsApp number"]
  },
  location: { 
    type: String, // ya lat,lng string ya full address
    required: true
  },
  favouriteShops: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "Shop"
}],

  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  // Hash the password
  this.password = await bcrypt.hash(this.password, 10);

  // confirmPassword ko remove kar do database se
  this.confirmPassword = undefined;

 
});

// Compare password method for login
userSchema.methods.comparePassword = async function(candidate) {
  return await bcrypt.compare(candidate, this.password);
}

export default mongoose.model('Webuser', userSchema);
