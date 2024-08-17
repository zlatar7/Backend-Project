import { Router } from "express";
import passport from "passport";
import { validate } from "../../middlewares/validation.middleware.js";
import { sessionDto } from "../../dtos/session.dto.js" ;
import { userDto } from "../../dtos/user.dto.js"
import { sessionController } from "../../controllers/session.controller.js";

const sessionsRouters = Router();

sessionsRouters.get("/github", passport.authenticate("github"));
sessionsRouters.get("/githubCallback", passport.authenticate("github", { failureRedirect: "/login" }), sessionController.github);
sessionsRouters.post("/register", validate(userDto), sessionController.register);
sessionsRouters.get("/logout", sessionController.logout);
sessionsRouters.get("/current", passport.authenticate("jwt", { session: false }), sessionController.current);
sessionsRouters.get("/login", sessionController.unauthorized);
sessionsRouters.post("/login", validate(sessionDto), passport.authenticate("login", {
    session: false,
    failureRedirect: "/api/sessions/login",
  }),
  sessionController.login
);

export default sessionsRouters;