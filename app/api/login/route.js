import jwt from 'jsonwebtoken';
import dbConnect from './../../../config/dbConnect'
import User from '../../models/user';
import bcrypt from 'bcryptjs';





export async function post(req, res) {
  console.log('Request body:', req.body);

  await dbConnect();

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Authentication successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}