import { userModel } from "../../models/user.model.js";

export class UserService {
  
  async createUser(user) {
    try {
      const newUser = await userModel.create(user);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async getUsers() {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      throw error;
    }
  }
  async getUsersByEmail(email) {
    try {
      const user = await userModel.findOne({email: email});
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const user = await userModel.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id, data, opt){
    try {
      const user = await userModel.findByIdAndUpdate(id, data, opt)
      return user;      
    } catch (error) {
      throw error
    }
  }

  async deleteUser(id){
    try {
      const user = await userModel.findByIdAndDelete(id)
      return user;
    } catch (error) {
      throw error
    }
  }
}

export const userService = new UserService();