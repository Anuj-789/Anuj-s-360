import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/productschema.js";

dotenv.config();

const products = [

/* ================= GROCERY ================= */
{ name: "Aashirvaad Atta 5kg", price: 320, category: "grocery", image: "/public/images/product.image/grocery/Aashirvaad-aata.jpg" },
{ name: "India Gate Basmati Rice 5kg", price: 650, category: "grocery", image: "/public/images/product.image/grocery/baasmati-rice.jpg" },
{ name: "Fortune Sunflower Oil 1L", price: 160, category: "grocery", image: "/public/images/product.image/grocery/fortune-oil.webp" },
{ name: "Tata Salt 1kg", price: 28, category: "grocery", image: "/public/images/product.image/grocery/tata-salt.webp" },
{ name: "Maggi Noodles Pack", price: 56, category: "grocery", image: "/public/images/product.image/grocery/maggie.jpg" },
{ name: "Toor Dal 1kg", price: 180, category: "grocery", image: "/public/images/product.image/grocery/toor-daal.jpg" },
{ name: "Sugar 1kg", price: 45, category: "grocery", image: "/public/images/product.image/grocery/sugar.webp" },
{ name: "Tea Powder 500g", price: 220, category: "grocery", image: "/public/images/product.image/grocery/chaipatti.webp" },
{ name: "Coffee Powder 200g", price: 180, category: "grocery", image: "/public/images/product.image/grocery/coffie.jpg" },
{ name: "Besan 1kg", price: 95, category: "grocery", image: "/public/images/product.image/grocery/besan.webp" },

{ name: "Butter 200g", price: 180, category: "grocery", image: "/public/images/product.image/grocery/butter.webp" },
{ name: "Paneer 250g", price: 120, category: "grocery", image: "/public/images/product.image/grocery/paneer.webp" },
{ name: "Milk 1L", price: 65, category: "grocery", image: "/public/images/product.image/grocery/milk.webp" },
{ name: "Curd 500g", price: 50, category: "grocery", image: "/public/images/product.image/grocery/curd.webp" },
{ name: "Peanuts 250g", price: 90, category: "grocery", image: "/public/images/product.image/grocery/peanuts.webp" },
{ name: "Cashews 200g", price: 300, category: "grocery", image: "/public/images/product.image/grocery/cashews.webp" },
{ name: "Raisins 100g", price: 120, category: "grocery", image: "/public/images/product.image/grocery/raisins.webp" },
{ name: "Dates 250g", price: 200, category: "grocery", image: "/public/images/product.image/grocery/dates.webp" },
{ name: "Oats 500g", price: 150, category: "grocery", image: "/public/images/product.image/grocery/oats.webp" },
{ name: "Cornflakes 250g", price: 120, category: "grocery", image: "/public/images/product.image/grocery/cornflakes.webp" },
{ name: "Noodles 2 Pack", price: 100, category: "grocery", image: "/public/images/product.image/grocery/noodles.webp" },

/* ================= FRUITS ================= */

{ name: "Apple (1kg)", price: 160, category: "fruits", image: "/public/images/product.image/fruits/apples.webp" },
{ name: "Black Carrot (1kg)", price: 120, category: "fruits", image: "/public/images/product.image/fruits/bacror.jpg" },
{ name: "Indian Carrot (1kg)", price: 120, category: "fruits", image: "/public/images/product.image/fruits/carrot.jpg" },
{ name: "Banana (1 dozen)", price: 60, category: "fruits", image: "/public/images/product.image/fruits/banana.webp" },
{ name: "Orange (1kg)", price: 90, category: "fruits", image: "/public/images/product.image/fruits/orange.webp" },
{ name: "Mango (1kg)", price: 120, category: "fruits", image: "/public/images/product.image/fruits/mango.webp" },
{ name: "Grapes (500g)", price: 70, category: "fruits", image: "/public/images/product.image/fruits/greaps.jpg" },
{ name: "Pomegranate (1kg)", price: 180, category: "fruits", image: "/public/images/product.image/fruits/pome.webp" },
{ name: "Papaya (1pc)", price: 55, category: "fruits", image: "/public/images/product.image/fruits/papaya.jpg" },
{ name: "Pineapple (1pc)", price: 75, category: "fruits", image: "/public/images/product.image/fruits/pineappla.jpg" },
{ name: "Watermelon", price: 90, category: "fruits", image: "/public/images/product.image/fruits/watermelon.webp" },
{ name: "Guava (1kg)", price: 80, category: "fruits", image: "/public/images/product.image/fruits/guava.webp" },

/* ================= BAKERY ================= */
{ name: "White Bread", price: 40, category: "bakery", image: "/public/images/product.image/bakery/be1.webp" },
{ name: "Brown Bread", price: 45, category: "bakery", image: "/public/images/product.image/bakery/be2.webp" },
{ name: "Cup Cake", price: 55, category: "bakery", image: "/public/images/product.image/bakery/be9.webp" },
{ name: "Cream Cake", price: 290, category: "bakery", image: "/public/images/product.image/bakery/be4.jpg" },
{ name: "Cream Cake", price: 350, category: "bakery", image: "/public/images/product.image/bakery/be4.jpg" },
{ name: "Chocolate Pastry", price: 60, category: "bakery", image: "/public/images/product.image/bakery/be4.webp" },
{ name: "Butter Cookies", price: 120, category: "bakery", image: "/public/images/product.image/bakery/be5.webp" },
{ name: "Croissant", price: 80, category: "bakery", image: "/public/images/product.image/bakery/be6.webp" },
{ name: "Donut", price: 50, category: "bakery", image: "/public/images/product.image/bakery/be7.webp" },
{ name: "Cream Cake", price: 250, category: "bakery", image: "/public/images/product.image/bakery/be4.jpg" },
{ name: "Garlic Bread", price: 95, category: "bakery", image: "/public/images/product.image/bakery/be8.webp" },
{ name: "Cup Cake", price: 45, category: "bakery", image: "/public/images/product.image/bakery/be9.webp" },
{ name: "Cream Cake", price: 250, category: "bakery", image: "/public/images/product.image/bakery/be4.jpg" },
{ name: "Rusk Pack", price: 70, category: "bakery", image: "/public/images/product.image/bakery/be10.webp" },
{ name: "White Bread", price: 20, category: "bakery", image: "/public/images/product.image/bakery/be1.webp" },

/* ================= ELECTRONICS ================= */
{ name: "LED Bulb 9W", price: 120, category: "electronics", image: "/public/images/product.image/electronics/bulb.webp" },
{ name: "Extension Board", price: 350, category: "electronics", image: "/public/images/product.image/electronics/extension.jpg" },
{ name: "USB Cable", price: 150, category: "electronics", image: "/public/images/product.image/electronics/usb.webp" },
{ name: "Power Bank", price: 999, category: "electronics", image: "/public/images/product.image/electronics/powerbank.webp" },
{ name: "Bluetooth Speaker", price: 1299, category: "electronics", image: "/public/images/product.image/electronics/speaker.webp" },
{ name: "Earphones", price: 499, category: "electronics", image: "/public/images/product.image/electronics/earp.webp" },
{ name: "Electric Kettle", price: 899, category: "electronics", image: "/public/images/product.image/electronics/kettle.webp" },
{ name: "Mobile Charger", price: 299, category: "electronics", image: "/public/images/product.image/electronics/charger.webp" },
{ name: "Table Fan", price: 1499, category: "electronics", image: "/public/images/product.image/electronics/fan.webp" },
{ name: "Night Lamp", price: 899, category: "electronics", image: "/public/images/product.image/electronics/lamp.webp" },
{ name: "USB Cable", price: 350, category: "electronics", image: "/public/images/product.image/electronics/usb.webp" },
{ name: "Power Bank", price: 959, category: "electronics", image: "/public/images/product.image/electronics/powerbank.webp" },
{ name: "Bluetooth Speaker", price: 1199, category: "electronics", image: "/public/images/product.image/electronics/speaker.webp" },
{ name: "Earphones", price: 397, category: "electronics", image: "/public/images/product.image/electronics/earp.webp" },
{ name: "Electric Kettle", price: 199, category: "electronics", image: "/public/images/product.image/electronics/kettle.webp" },
{ name: "Mobile Charger", price: 2190, category: "electronics", image: "/public/images/product.image/electronics/charger.webp" },
{ name: "Table Fan", price: 1999, category: "electronics", image: "/public/images/product.image/electronics/fan.webp" },
{ name: "USB Cable", price: 356, category: "electronics", image: "/public/images/product.image/electronics/usb.webp" },
{ name: "Power Bank", price: 559, category: "electronics", image: "/public/images/product.image/electronics/powerbank.webp" },
{ name: "Bluetooth Speaker", price: 1299, category: "electronics", image: "/public/images/product.image/electronics/speaker.webp" },
{ name: "Earphones", price: 499, category: "electronics", image: "/public/images/product.image/electronics/earp.webp" },
{ name: "Electric Kettle", price: 889, category: "electronics", image: "/public/images/product.image/electronics/kettle.webp" },
{ name: "Mobile Charger", price: 399, category: "electronics", image: "/public/images/product.image/electronics/charger.webp" },

/* ================= HOUSEHOLD ================= */
{ name: "Banarasi Saree", price: 1880, category: "garments", image: "/public/images/product.image/garments/sar.webp" },
{ name: "Kanjeevaram Saree", price: 1295, category: "garments", image: "/public/images/product.image/garments/sar1.webp" },
{ name: "Chanderi Saree", price: 1108, category: "garments", image: "/public/images/product.image/garments/sar2.webp" },
{ name: "Paithani Saree", price: 1606, category: "garments", image: "/public/images/product.image/garments/sar3.webp" },
{ name: "Bandhani Saree", price: 1200, category: "garments", image: "/public/images/product.image/garments/sar4.jpg" },
{ name: "Tussar Silk Saree", price: 902, category: "garments", image: "/public/images/product.image/garments/sar4.webp" },
{ name: "Pochampally Saree", price: 6450, category: "garments", image: "/public/images/product.image/garments/sar5.jpg" },
{ name: "Pochampally Saree", price: 3130, category: "garments", image: "/public/images/product.image/garments/sar6.jpg" },
{ name: "Kasavu Saree", price: 753, category: "garments", image: "/public/images/product.image/garments/sar7.jpg" },
{ name: "Patola Saree", price: 660, category: "garments", image: "/public/images/product.image/garments/sar8.jpg" },
{ name: "Kota Doria Saree", price: 1450, category: "garments", image: "/public/images/product.image/garments/sar8.webp" },
{ name: "Baluchari Saree", price: 1300, category: "garments", image: "/public/images/product.image/garments/sar9.jpg" },
{ name: "Maheshwari Saree", price: 750, category: "garments", image: "/public/images/product.image/garments/sar10.jpg" },
{ name: "Bhagalpuri (Tussar) Saree", price:960, category: "garments", image: "/public/images/product.image/garments/sar11.jpg" },
{ name: "Mysore Silk Saree", price: 1370, category: "garments", image: "/public/images/product.image/garments/sar12.webp" },
{ name: "Bandhani Saree", price: 750, category: "garments", image: "/public/images/product.image/garments/sar15.webp" },


/* ================= STATIONERY ================= */
{ name: "Notebook", price: 60, category: "stationery", image: "/public/images/product.image/stationary/st1.jpg" },
{ name: "Ball Pen Pack", price: 120, category: "stationery", image: "/public/images/product.image/stationary/st11.jpg" },
{ name: "Pencil Box", price: 95, category: "stationery", image: "/public/images/product.image/stationary/st10.jpg" },
{ name: "Eraser Pack", price: 40, category: "stationery", image: "/public/images/product.image/stationary/st4.webp" },
{ name: "Sharpener", price: 25, category: "stationery", image: "/public/images/product.image/stationary/st5.webp" },
{ name: "Sketch Pens", price: 150, category: "stationery", image: "/public/images/product.image/stationary/st6.jpg" },
{ name: "Color Pencils", price: 180, category: "stationery", image: "/public/images/product.image/stationary/st6.webp" },
{ name: "Glue Stick", price: 55, category: "stationery", image: "/public/images/product.image/stationary/st7.webp" },
{ name: "Scale", price: 30, category: "stationery", image: "/public/images/product.image/stationary/st8.jpg" },
{ name: "Exam Pad", price: 90, category: "stationery", image: "/public/images/product.image/stationary/st8.webp" },
{ name: "Sharpener", price: 75, category: "stationery", image: "/public/images/product.image/stationary/st5.webp" },
{ name: "Sketch Pens", price: 250, category: "stationery", image: "/public/images/product.image/stationary/st6.jpg" },
{ name: "Color Pencils", price: 120, category: "stationery", image: "/public/images/product.image/stationary/st6.webp" },
{ name: "Glue Stick", price: 65, category: "stationery", image: "/public/images/product.image/stationary/st7.webp" },
{ name: "Scale", price: 40, category: "stationery", image: "/public/images/product.image/stationary/st8.jpg" },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Product.deleteMany();
    console.log("Old products removed");

    await Product.insertMany(products);
    console.log("Products inserted successfully");

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

seedProducts();
