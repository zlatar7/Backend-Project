import { createHash } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import { userService } from "../services/mongoDB/user.service.js";

class SessionController {

  async register(req, res) {
      try {
        const { first_name, last_name, email, age, role, password } = req.body;
    
        if (!first_name || !last_name || !email || !age || !password) {
          return res.status(400).json({
            error: "Missing fields",
          });
        }
        try {
          // Hashea la contraseña
          const hashPassword = await createHash(password);
    
          const user = await userService.createUser({
            first_name,
            last_name,
            email,
            age,
            password: hashPassword,
            role,
          });
    
          res.status(201).json(user);
        } catch (error) {
          res.status(500).json({ error: "Error al crear el usuario", details: error.message });
        }
      } catch (error) {
          throw error
      }
  }
  
  async login(req, res) {
    try {
      const payload = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        role: req.user.role,
      };
      const token = generateToken(payload);

      res.cookie("token", token, {
        maxAge: 100000,
        httpOnly: true,
      });
  
      res.status(200).json({
        message: "Login success",
        token,
      });
    } catch (error) {
      throw error
    }
  }

  async github(req, res) {
    try {
      if (req.user) {
        req.session.user = req.user;
        return res.redirect("/");
      }
      res.redirect("/login");
    } catch (error) {
      throw error
    }
  }

  async logout(req, res) {
    try {
      res.clearCookie("token");
      res.status(200).json({
        message: "Sesión cerrada",
      });
    } catch (error) {
        throw error
    }
  }

  async current(req, res) {
    try {
      const user = req.user[0]
      res.status(200).json({
        message: `Bienvenido ${user.first_name}`,
        user: user.email,
      });
    } catch (error) {
      throw error
    }
  }

  async unauthorized(req, res) {
    try {
      res.status(401).json({
        error: "Unauthorized",
      });
    } catch (error) {
      throw error
    }
  }
}

export const sessionController = new SessionController()