import Admin from '../models/admin.models.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//New User
export const registerAdmin = async (req, res) => {
  //get the email and password from the user
  const { email, password } = req.body;

  try {
    //try to find the admin in the database using his email id
    const existingAdmin = await Admin.findOne({ email });
    //if they already exists return "Already Exists"
    if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

    //If he doesnt exists , then start to hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create a new admin
    const newAdmin = new Admin({ email, password: hashedPassword });
    //save him in mongodb
    await newAdmin.save();

    //after saving, return success message
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    //if theres something wrong, it returns an error
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//Existing User
export const loginAdmin = async (req, res) => {

  const { email, password } = req.body;

  try {
    //try to compare the email the user entered with the one in the database
    const admin = await Admin.findOne({ email });
    //if it doesnt match , return invalid credentials
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    //if it matches , compare the password
    const isMatch = await bcrypt.compare(password, admin.password);
    //if it doesnt match , return invalid credentials
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    //if it matches , return success message
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {

    //if theres something wrong, it returns an error
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
