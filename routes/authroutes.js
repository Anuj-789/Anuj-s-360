import express from 'express';

import {
  profilePage,
  signupUser,
  loginUser,
  logoutUser
} from '../controller/authcontroller.js';


import { createShop, shopLogin, shopLogout , upload , shopprofilePage, updateShop} from "../controller/allnewshopcontroller.js";


const router = express.Router();



router.get('/profile', profilePage);   // single page
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
//for new shop


// Shop login
router.post("/shops/login", shopLogin);

// Shop logout
router.get("/shops/logout", shopLogout);


router.post("/shops/register", upload.single('image'), createShop);

// for getting shopogin page

router.get('/shopprofile', shopprofilePage);

// Shop profile update
router.post('/shop/update', updateShop);

export default router;
