import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../modles/Admin.js";
import Listview from "../modles/Listview.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
     
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
    
      location,
      occupation,
    
    });
 
   
    const savedAdmin = await newAdmin.save();
    // const newList = await Listview.findOne({listViewName:"Admin"})
  
    
    res.status(201).json(savedAdmin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const JWT_VALIDITY = '7 days';
    const { email, password } = req.body;
    const user = await Admin.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET,{
      expiresIn: JWT_VALIDITY,
    });
    delete user.password;
    res.status(200).json({ accessToken, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } 
};