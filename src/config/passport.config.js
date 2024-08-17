import passport from "passport";
import local from "passport-local";
import jwtStrategy from "passport-jwt";
import GithubStrategy from "passport-github2";
import { userModel } from "../models/user.model.js";
import { comparePassword } from "../utils/hash.js";
import { config } from "./config.js";

const LocalStrategy = local.Strategy;
const JWTStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

export const initializePassport = () => {
  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: "Iv23ctr1BFJpHQQtdW3W",
        clientSecret: "a3d8954d5cb25a7359949033b0f27ab0675d5716",
        callbackURL: "http://localhost:5000/api/sessions/githubCallback",
        scope: ["user:email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await userModel.findOne({
            email: profile.emails[0].value,
          });

          if (user) {
            return done(null, user);
          }

          const newUser = await userModel.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            age: profile.age,
            githubId: profile.id,
          });

          return done(null, newUser);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          const user = await userModel.findOne({ email });

          if (!user) {
            return done(null, false, { message: "Usuario no encontrado" });
          }

          if (!(await comparePassword(password, user.password))) {
            return done(null, false, { message: "Contraseña incorrecta" });
          }

          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "register",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name, age } = req.body;

          const userExists = await userModel.findOne({ email });

          if (userExists) {
            return done(null, false, { message: "El usuario ya existe" });
          }

          const hashPassword = await createHash(password);

          const user = await userModel.create({
            first_name,
            last_name,
            email,
            age,
            password: hashPassword,
          });

          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: config.JWT_SECRET,
      },
      async (payload, done) => {
        try {
          const user = await userModel.find({ email: payload.email });

          if (!user) {
            return done(null, false, { message: "No se encontró el usuario" });
          }

          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    userModel.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }
  return token;
}