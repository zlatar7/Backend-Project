import { UserService as memoryUserService } from "./memoryDB/user.service.js";
import { UserService as mongoUserService } from "./mongoDB/user.service.js";
import { config } from "../config/config.js";

// Patrón Factory
function getServices() {
  switch (config.PERSISTANCE) {
    case "memory": {
      return {
        userService: new memoryUserService(),
      };
    }
    case "mongodb": {
      return {
        userService: new mongoUserService(),
      };
    }
    default:
      return {
        userService: new memoryUserService(),
      };
  }
}

export const { userService, toyService } = getServices();