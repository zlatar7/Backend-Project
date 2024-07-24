import { Router } from "express";
import { userModel } from "../../models/user.model.js";
import { createHash } from "../../utils/hash.js";

const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios", details: error.message });
  }
});

usersRouter.get("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await userModel.findById(uid);
    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario", details: error.message });
  }
});

usersRouter.post("/", async (req, res, next)=>{
  try {
    const data = req.body
    const hashPassword = await createHash(data.password);
    data.password = hashPassword
    const user = await userModel.create(data)
    res.status(200).json(user)

  } catch (error) {
    res.status(500).json({error: "Error al agregar el usaurio", details: error.message})
  }
})

usersRouter.put("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const data = req.body;
    const opt = { new: true };

    const user = await userModel.findByIdAndUpdate(uid, data, opt);
    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario", details: error.message });
  }
});

usersRouter.delete("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await userModel.findByIdAndDelete(uid);
    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario", details: error.message });
  }
});

export default usersRouter;