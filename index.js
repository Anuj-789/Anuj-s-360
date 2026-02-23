import express from 'express';
import path from 'path';
import session from 'express-session';
import dotenv from 'dotenv';
import { fileURLToPath } from "url";

// config
dotenv.config();

const app = express();

app.use('/uploads', express.static(path.join(process.cwd(), 'public/uploads')));

// ===== PATH SETUP =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== BODY PARSERS (VERY IMPORTANT) =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== SESSION (ROUTES SE PEHLE) =====
app.use(session({
  secret: 'techmer-secret',
  resave: false,
  saveUninitialized: true
}));

// ===== VIEW ENGINE =====
app.set("view engine", "ejs");

// ===== STATIC FILES =====
app.use('/public', express.static(path.resolve(__dirname, 'public')));

// ===== DATABASE =====
import connectdatabase from './config/database.js';
connectdatabase();


// ===== ROUTES =====
import router from './routes/route.js';
app.use(router);

import authrouter from './routes/authroutes.js';
app.use(authrouter);

// ===== SERVER =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server connected at " + PORT);
});
