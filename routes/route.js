import express from 'express'
const router = express.Router();
import { requireLogin } from '../controller/controller.js';
import  { sendemail, getAllCartData, getservicepage , gethomepage , getaboutuspage,  getShopsApi , shopProductsPage ,  getCartData , addToCartItem, removeCartItem, updateCartItemQty ,placeOrderAndClearCart} from '../controller/controller.js'


router.get("/service", getservicepage);

router.get("/",gethomepage);

router.get("/aboutus", getaboutuspage);
router.get("/api/shops", getShopsApi);

router.get("/shop/:id", shopProductsPage);

router.get("/cart/data", requireLogin, getCartData);



router.post("/cart/add", requireLogin, addToCartItem);
router.post("/cart/remove", requireLogin, removeCartItem);
router.post("/cart/update", requireLogin, updateCartItemQty);

router.get("/cart/all", requireLogin, getAllCartData);

router.post("/send-order-email", requireLogin, sendemail);

router.post("/order/place", requireLogin, placeOrderAndClearCart);







export default router;