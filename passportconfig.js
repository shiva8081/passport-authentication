import { Strategy as LocalStrategy } from "passport-local";
import User from "./schema.js";
import { send } from "process";

export const initializingpassport = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "user", passwordField: "pass" },
      async (username, password, done) => {
        try {
          console.log(username);
          console.log(password);
          const user = await User.findOne({ username });
          console.log(`User found: ${user}`);
          if (!user)
            return done(null, false, { message: "Incorrect username." });
          if (user.password !== password)
            return done(null, false, { message: "Incorrect password." });
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      })
    )
  ;
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  });
};
export const isAuthenticated=(req,res,next)=>{
    if(req.user) return next();
    res.redirect("/login")

}



