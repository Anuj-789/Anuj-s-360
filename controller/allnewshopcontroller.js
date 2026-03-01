import Shop from "../models/schema.js";
import Product from '../models/productschema.js';
import multer from 'multer';
import bcrypt from 'bcrypt';

export const createShop = async (req, res ) => {
  try {
    const {
      shopkeeperName,
      name,
      whatsappNumber,
      contactNumber,
      email,
      password,
      district,
      area,
      address,
       category,
      locationLink
    } = req.body;

    // Uploaded file info
    let image = '';
    if(req.file){
      image = '/uploads/' + req.file.filename; // frontend me access /public/uploads/filename
    }

    // Check if email already exists
    const existingShop = await Shop.findOne({ email });
    if (existingShop) {
      return res.status(400).json({ message: "Email already registered" });
    }
      const hashedPassword = await bcrypt.hash(password, 10);

    const newShop = new Shop({
      shopkeeperName,
      name,
      image,
      whatsappNumber,
      contactNumber,
      email,
      password:hashedPassword, // plaintext for now
      district,
      area,
      address,
       category,
      locationLink
    });

    await newShop.save();

    res.status(201).json({
      message: "Shop registered successfully",
      shop: newShop
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
   
  }
};


// Login
export const shopLogin = async (req, res) => {
 const { email, password } = req.body;

  try {
    const shop = await Shop.findOne({ email }); // your shop model

    if (!shop) {
      return res.status(400).json({ message: "Shop not found" });
    }

    const validPassword = await bcrypt.compare(password, shop.password);
if(!validPassword){
    return res.status(400).json({ message: "Incorrect password" });
}

    

    // login success → save session
    req.session.shop = shop;

    res.json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Logout
export const shopLogout = (req, res) => {
   req.session.destroy(err => {
    if(err) return res.status(500).send("Error logging out");
    res.redirect("/shopprofile"); // redirect to homepage after logout
  });
};


const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'public/uploads/'); // folder create karna agar nahi hai
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + '-' + file.originalname);
  }
});

export const upload = multer({ storage: storage });



export const shopprofilePage = async (req, res) => {
  try {
    const shop = req.session.shop;

    if (!shop) {
      return res.render('shopprofile', { shop: null, productsByCategory: {} });
    }

    // Fetch products for the shop's category only
    const products = await Product.find({ category: shop.category });

    // Group products by category (ab ek hi category ka hoga, fir bhi frontend code same rahega)
    const productsByCategory = products.reduce((acc, product) => {
      if (!acc[product.category]) acc[product.category] = [];
      acc[product.category].push(product);
      return acc;
    }, {});

    res.render('shopprofile', { shop, productsByCategory });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};







export const updateShop = async (req, res) => {
  try {
    const shopId = req.session.shop._id;
    const shop = await Shop.findById(shopId);

    if (!shop) return res.status(404).json({ message: "Shop not found" });

    // Fields to update
    const fields = [
      "name",
      "shopkeeperName",
      "email",
      "contactNumber",
      "whatsappNumber",
      "district",
      "area",
      "address",
      "category",
      "locationLink"
    ];

    fields.forEach(field => {
      if (req.body[field]) shop[field] = req.body[field];
    });

    await shop.save();

    // Update session so frontend sees new data immediately
    req.session.shop = shop;

    res.json({ message: "Shop profile updated successfully!", shop });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};