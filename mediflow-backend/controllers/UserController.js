const User = require("../models/User");

/* LOGIN CONTROLLER */
const loginUser = async (req, res) => {

  try {

    const { username, password } = req.body;

    const user = await User.findOne({
      username,
      password
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    res.json({
      role: user.role,
      doctorName: user.doctorName || null
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = { loginUser };