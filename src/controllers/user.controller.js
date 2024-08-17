import { userService } from "../services/mongoDB/user.service.js";
import { mailService } from "../services/mail.service.js";
import { smsService } from "../services/sms.service.js";

class UserController {

  async getAll(req, res) {
    try {
      const users = await userService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        error: "Error al obtener los usuarios",
        details: error.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);

      if (!user) {
        return res.status(404).json({
          error: "User no encontrado",
        });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        error: "Error al obtener el usuario",
        details: error.message,
      });
    }
  }

  async create(req, res) {
    try {
      const { first_name, email, phone } = req.body;
      if (!first_name || !email) {
        return res.status(400).json({
          error: "Falta información",
        });
      }

      const userExist = await userService.getUsersByEmail(email)
      if (userExist) {
      return res.status(400).json({
        error: "Email ya existe",
        });
      }
      
      userService.createUser(req.body)
      .then( response => {
        // Envío e-mail de bienvenida
        mailService.sendMail({
          to: email,
          subject: "Bienvenido a nuestro servicio de mensajes masivos",
          type: "welcome",
        })
        .then( resp => {
          smsService.sendSms(phone, "Bienvenido a nuestro servicio de mensajes masivos")
          return res.status(200).json(response)
        });
      })

    } catch (error) {
      res.status(500).json({
        error: "Error al crear el usuario",
        details: error.message,
      });
    }
  }

  async update(req, res){
    try {
      const { uid } = req.params;
      const data = req.body;
      const opt = { new: true };
  
      const user = await userService.updateUser(uid, data, opt);
      res.status(200).json(user);
  
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el usuario", details: error.message });
    }
  }

  async delete(req, res){
    try {
      const { uid } = req.params;
      const user = await userService.deleteUser(uid);
      res.status(200).json(user);
  
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el usuario", details: error.message });
    }
  }
}

export const userController = new UserController();