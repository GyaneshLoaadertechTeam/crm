    // models/user.js
    import mongoose from 'mongoose';

    const userSchema = new mongoose.Schema({
      name: String,
      number: String,
      email: String,
      role: String,
      gender: String,
      address: String,
      password: String, // Note: In a real app, you should hash the password before storing it
      profilePhoto: String, // Assuming you're storing the file path or URL
    });

    export default mongoose.models.User || mongoose.model('User', userSchema);
    // 










//     import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     trim: true,
//     lowercase: true,
//     // Consider adding a regex validation for email
//   },
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//   },
//   // If you plan to use timestamps (createdAt and updatedAt), you can enable them like this:
// }, { timestamps: true });

// export default mongoose.models.User || mongoose.model('User', userSchema);
