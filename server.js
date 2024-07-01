import express from "express";
import { connectTomongoDB } from "./database.js";
import User from "./schema.js";
import ejs from "ejs";
import passport from "passport";
import { initializingpassport, isAuthenticated } from "./passportconfig.js";
import expressSession from "express-session";

initializingpassport(passport);
const app = express();
app.use(express.json()); // to parse the incoming request with json payload (from req.body)
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({ secret: "secret", resave: false, saveUninitialized: false ,cookie: { secure: false }})
);
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/register", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) return res.status(404).send("user alredy exist");
  const newuser = await User.create(req.body);
  res.status(201).send(newuser);
});
app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/register",
    successRedirect: "/",
  }),
  (req, res) => {
    console.log("User logged in:", req.user);
    res.send("Successfully logged in");
  }
);
app.get("/profile", isAuthenticated, (req, res) => {
  res.send(req.user);
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
  
app.listen(4000, async (req, res) => {
  await connectTomongoDB();
  // await User.create({username:"shiva",password:"asyudc"});
  console.log("listening on port 4000");
});
