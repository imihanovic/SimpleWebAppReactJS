const jwt = require("jsonwebtoken");
const User = require("../models/UserModel.js");

module.exports = async (req, res, next) => {
  const authorization = req.header("Authorization");
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, "secret");
    req.user = await User.findOne({ _id }).select("_id");

    next();
  } catch (error) {
    console.log("error ", error);
    return res.status(401).json({ error: "Request is not authorized" });
  }
};
