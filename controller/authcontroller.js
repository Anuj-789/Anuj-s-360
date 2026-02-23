// controller/authController.js
import Webuser from '../models/users-schema.js';
import { sendWelcomeEmail } from './signupmail.js';


// ----------------------
// PROFILE PAGE
// ----------------------
export const profilePage = (req, res) => {
  const user = req.session && req.session.user ? req.session.user : null;

  res.render('profile', {
    user,
    error: null
  });
};
// ----------------------
// SIGNUP
export const signupUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, contactNumber, whatsappNumber, favouriteShops, location } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const userExists = await Webuser.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = new Webuser({
      name,
  email,
  password,
  contactNumber,
  whatsappNumber,
  location,
  favouriteShops: Array.isArray(favouriteShops) ? favouriteShops : []
    });

    await user.save();

    await sendWelcomeEmail(email, name);

    // Store minimal info in session
    req.session.user = {
   id: user._id,
  name: user.name,
  email: user.email,
  contactNumber: user.contactNumber,
  whatsappNumber: user.whatsappNumber,
  location: user.location,
  favouriteShops: user.favouriteShops
    };

    return res.json({ message: "Signup successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed" });
  }
};


// ----------------------
// LOGIN
// ----------------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Webuser.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Wrong password"
      });
    }

    req.session.user = {
       id: user._id,
  name: user.name,
  email: user.email,
  contactNumber: user.contactNumber,   
  whatsappNumber: user.whatsappNumber, 
  location: user.location,
  favouriteShops: user.favouriteShops
    };

    return res.json({
      message: "Login success"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error"
    });
  }
};

// ----------------------
// LOGOUT
// ----------------------
export const logoutUser = (req, res) => {
  req.session.destroy(err => {
    if (err) console.log(err);
    res.redirect('/profile');
  });
};


