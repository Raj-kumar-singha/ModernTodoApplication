const User = require('../models/users'),
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    // Validate user input
    if (!(name && email && role && password)) {
      return res.status(400).send('All input is required');
    }

    //  Check if user exists in our database
    const oldUser = await User.findOne({ email: email });

    if (oldUser) {
      return res.status(409).send('User Already Exists. Please Login');
    }
    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      name,
      password: encryptedPassword,
      role,
      email,
    });

    // Return user
    res.status(201).json({
      Msg: 'User created successfully',
      user: user
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.login = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).send('All input is required');
    }
    // Validate if user exists in our database
    const user = await User.findOne({ email });

    // Password Validate: -
    if (!(user && (await bcrypt.compare(password, user.password)))) {
      return res.status(400).send('Invalid Credentials');
    }

    // Create token
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: "2h",
      }
    );

    // Return user and token
    res.status(201).json({
      Msg: 'LoggedIn successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred' });
  }
};
