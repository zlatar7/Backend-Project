import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import morgan from "morgan";
// import MongStore from "connect-mongo";
import path from "path";
import handlebars from "express-handlebars";
import __dirname from "./src/dirname.js";
import passport from "passport";
import { initializePassport } from "./src/config/passport.config.js";
import router from "./src/routes/index.routers.js";
import { config } from "./src/config/config.js";

// Create app
const app = express();
const PORT = config.PORT;

// Express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  session({
    secret: "s3cr3t",
    resave: false,
    saveUninitialized: false,
  })
);

// Mongo config
mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

// Passport config
initializePassport();
app.use(passport.initialize());

// Handlebars config
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", router);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running in ${config.ENVIRONMENT} on port ${config.PORT}`);
});
