

import Shop from '../models/schema.js';
import Product from "../models/productschema.js";
import Cart from "../models/cartschema.js";
import Webuser from "../models/users-schema.js"; 
import { sendOrderSuccessEmail , sendShopOrderEmail } from "./ordersuccessmail.js";



export const requireLogin = (req, res, next) => {
  if (!req.session?.user) {
    // ✅ Check if request is AJAX/fetch (expects JSON)
    const isAjax = req.xhr || req.headers.accept.includes("json");

    if (isAjax) {
      // Return JSON for fetch calls instead of redirect
      return res.status(401).json({ message: "Login required" });
    }

    // Normal browser request → redirect to login/profile page
    return res.redirect('/profile');
  }
  next();
};


// Controller function to render the service page----------------------------------------------------------
  export const getservicepage = (req,res)=>{
    res.render('service.ejs');
}
// Controller function to render the home page----------------------------------------------------------
export const gethomepage = (req,res)=>{
  res.render('home.ejs');
}

// Controller function to render the about us page----------------------------------------------------------
export const getaboutuspage = (req,res)=>{
  res.render('aboutus.ejs')
}


// Controller function to get shops based on query parameters-----------------------------------------------
export const getShopsApi = async (req, res) => {
  const { district, area, category } = req.query;

  const shops = await Shop.find({
    district,
    area,
    category
  });

  res.json(shops);
};


// Controller function to get products of a shop-----------------------------------------------------------------
export const shopProductsPage = async (req, res) => {
  try {
    const shopId = req.params.id;

    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.send("Shop not found");
    }

    const products = await Product.find({
      category: shop.category
    });

      let isFavourite = false;
          if (req.session?.user?.id) {
      const user = await Webuser.findById(req.session.user.id);
      if (user) {
        isFavourite = user.favouriteShops.some(id => id.toString() === shopId);
      }
    }

    res.render("shops-product", {
      shop,
      products,
       isFavourite
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};


//


// Controller function to get cart page with items-----------------------------------------------------------------
export const getCartPage = async (req, res) => {
  try {
    const userId = req.session?.user?.id;
  if (!userId) return res.status(401).json({ message: "Login required" });// TEMP

    const cart = await Cart.findOne({ user: userId })
      .populate("items.product")
      .populate("shop");

    res.render("cart", { cart });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Controller function to get cart data as JSON (for AJAX)---------------------------------------------------------------
export const getCartData = async (req, res) => {
 const userId = req.session?.user?.id;
  if (!userId) return res.status(401).json({ message: "Login required" });

  const { shopId } = req.query; // query se shopId le lo

  if (!shopId) return res.status(400).json({ message: "Shop ID required" });

  const cart = await Cart.findOne({ user: userId, shop: shopId })
    .populate("items.product")
    .populate("shop");

  res.json(cart || { items: [] });
};

// Controller function to add item to cart (for AJAX)---------------------------------------------------------------

export const addToCartItem = async (req, res) => {
  try {
     const userId = req.session?.user?.id;
  if (!userId) return res.status(401).json({ message: "Login required" }); // TEMP user
    const { productId, shopId } = req.body;

    // Step 1: Fetch cart with populated fields
    let cart = await Cart.findOne({ user: userId, shop: shopId  })
      .populate("items.product")
      .populate("shop");

    // Step 2: If no cart, create new
    if (!cart) {
      cart = new Cart({
        user: userId,
        shop: shopId,
        items: [{ product: productId, quantity: 1 }]
      });
    } else {
      // Step 3: Check if item exists
      const item = cart.items.find(i => i.product._id.toString() === productId);
      if (item) {
        item.quantity += 1;
      } else {
        cart.items.push({ product: productId, quantity: 1 });
      }
    }

    // Step 4: Save cart
    await cart.save();

    // Step 5: Re-fetch cart with populated fields (safe)
    const updatedCart = await Cart.findById(cart._id)
      .populate("items.product")
      .populate("shop");

    // Step 6: Return updated cart
    res.json(updatedCart);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



// Controller function to remove item from cart (for AJAX)---------------------------------------------------------------
export const removeCartItem = async (req, res) => {
  try {
    const userId = req.session?.user?.id;
  if (!userId) return res.status(401).json({ message: "Login required" });// TEMP user
    const { productId, shopId } = req.body;

    // Step 1: Fetch cart with populated fields
    const cart = await Cart.findOne({ user: userId, shop: shopId})
      .populate("items.product")
      .populate("shop");

    if (!cart) return res.status(400).json({ message: "Cart not found" });

    // Step 2: Remove item
    cart.items = cart.items.filter(i => i.product._id.toString() !== productId);

    if (cart.items.length === 0) {
  await cart.deleteOne();
  return res.json({ items: [], shop: cart.shop });
}
    // Step 3: Save cart
    await cart.save();

    // Step 4: Return updated cart (already populated)
    res.json(cart);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Controller function to update cart item quantity (for AJAX)---------------------------------------------------------------
export const updateCartItemQty = async (req, res) => {
  try {
    const userId = req.session?.user?.id;
  if (!userId) return res.status(401).json({ message: "Login required" });
   // TEMP user
    const { productId, quantity, shopId  } = req.body;

    // Step 1: Fetch cart with populated fields
    const cart = await Cart.findOne({ user: userId, shop: shopId })
      .populate("items.product")
      .populate("shop");

    if (!cart) return res.status(400).json({ message: "Cart not found" });

    // Step 2: Find item
    const item = cart.items.find(i => i.product._id.toString() === productId);
    if (!item) return res.status(400).json({ message: "Item not found" });

    // Step 3: Update quantity
    item.quantity = quantity > 0 ? quantity : 1;

    // Step 4: Save cart
    await cart.save();

    // Step 5: Return updated cart (already populated)
    res.json(cart);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Controller function to toggle favourite shop (for AJAX)---------------------------------------------------------------

// Get all carts of a user (for profile page)
export const getAllCartData = async (req, res) => {
  const userId = req.session?.user?.id;
  if (!userId) return res.status(401).json({ message: "Login required" });

  try {
    const carts = await Cart.find({ user: userId })
      .populate("shop")
      .populate("items.product");

    res.json(carts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};





// Controller function to send order confirmation email (for AJAX)---------------------------------------------------------------
export const sendemail = async (req, res) => {
  const userEmail = req.session?.user?.email;
  const { method, total , shop } = req.body;

  if (!userEmail) return res.status(401).json({ message: "Login required" });

  try {
    await sendOrderSuccessEmail(userEmail, { method, total, shop });
    res.json({ message: "Email sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send email" });
  }
}
// 1. Email bhejne ke baad cart clear karne ka function

export const placeOrderAndClearCart = async (req, res) => {
  const userId = req.session?.user?.id;
  const { method, shopId } = req.body;

  if (!userId) return res.status(401).json({ message: "Login required" });

  try {
    // 1️⃣ Fetch user
    const user = await Webuser.findById(userId);

    // 2️⃣ Fetch cart
    const cart = await Cart.findOne({ user: userId, shop: shopId })
      .populate("items.product")
      .populate("shop");

    if (!cart) return res.status(400).json({ message: "Cart not found" });

    // 3️⃣ Calculate total
    let total = 0;
    const items = cart.items.map(item => {
      total += item.product.price * item.quantity;
      return {
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      };
    });

    // 4️⃣ User confirmation email
    await sendOrderSuccessEmail(user.email, {
      method,
      total,
      shop: cart.shop.name,
      whatsappLink: `https://wa.me/91${cart.shop.whatsappNumber}`
    });

    // 5️⃣ Shop detailed email
    await sendShopOrderEmail(cart.shop.email, {
      shopName: cart.shop.name,
      userName: user.name,
      userEmail: user.email,
      userPhone: user.contactNumber,
      userWhatsapp: user.whatsappNumber,
      userlocation: user.location,
      items,
      total,
      method
    });

    // 6️⃣ Clear cart
    await Cart.findOneAndDelete({ user: userId, shop: shopId });

    res.json({ message: "Order placed successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to place order" });
  }
};



