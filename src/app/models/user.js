    // models/user.js
    import mongoose from 'mongoose';

    const userSchema = new mongoose.Schema({
      name: String,
      number: String,
      email: String,
      roleId: String,
      gender: String,
      address: String,
      password: String, // Note: In a real app, you should hash the password before storing it
      profilePhoto: String, // Assuming you're storing the file path or URL
    });

    export default mongoose.models.User || mongoose.model('User', userSchema);