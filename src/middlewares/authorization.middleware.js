export function authorizations(roles) {
    return async (req, res, next) => {
      if (!req.user) return res.status(401).json({ message: "No autorizado" });
  
      if (!roles.includes(req.user[0].role)) {
        return res.status(401).json({ message: "No tienes permisos" });
      }
      next();
    };
  }