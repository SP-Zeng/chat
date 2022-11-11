const { verifyToken } = require("./token");

const checkToken = async (req, res, next) => {
    let token = req.cookies.token;
    try{
      const valid = await verifyToken(token);
      if (!valid) {
        return res.status(403).json({
          message:
            "You are not authorized to access this resource.",
        });
      }
    } catch (err) {
      return res.status(403).json({
        message:
          "You are not authorized to access this resource.",
      });
    }
    next();
};

module.exports = {
    checkToken,
};