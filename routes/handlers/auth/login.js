const jwt = require("jsonwebtoken");
const { compareSync } = require("bcrypt");
const { User } = require("../../../models");

module.exports = async (req, res) => {
  // email, password
  const { body } = req;

  if (!body.email || !body.password)
    return res.status(400).json({
      message: "Email and password must be provided",
    });

  // Check email
  const user = await User.findOne({
    where: { email: body.email },
  });

  if (!user)
    return res.status(404).json({
      message: "Email not found",
    });

  // Check password
  const isPasswordCorrect = compareSync(body.password, user.password);

  if (!isPasswordCorrect)
    return res.status(400).json({
      message: "Wrong password",
    });

  const data = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const token = jwt.sign({ data }, "dahsdhalsdh", {
    expiresIn: "10s",
  });

  return res.json({ token });
};
