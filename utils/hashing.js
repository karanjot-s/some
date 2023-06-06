const bcrypt = require("bcrypt");
exports.hash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

exports.validate = async (password1, password2) => {
  return await bcrypt.compare(password1, password2);
};
