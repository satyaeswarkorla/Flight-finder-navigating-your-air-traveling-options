exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Simple validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if email exists (case insensitive)
    const existingUser = await User.findOne({ 
      email: { $regex: new RegExp(`^${email}$`, 'i') } 
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create new user
    const user = new User({
      username,
      email: email.toLowerCase(),
      password: await bcrypt.hash(password, 10)
    });

    await user.save();
    
    // Return success
    res.status(201).json({ 
      message: 'Registration successful',
      user: {
        id: user._id,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
};