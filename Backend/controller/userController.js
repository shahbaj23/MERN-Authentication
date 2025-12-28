import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Password do not match!" });
    }

    const emailExist = await User.findOne({ email });

    if (emailExist) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already exists." });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Password should be not less than 8",
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    

    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Register successfuly",
      newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({success: false, message: "Email doesn't exist."})
    }

    const isMatchedPass = await bcrypt.compare(password,  user.password)

    if(!isMatchedPass){
        return res.status(400).json({success: false, message: "Invalid email or password"})
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_TOKEN, {expiresIn: "2h"})

     return res.status(200).json({
        success: true,
        token,
        user:{
            email: user.email,
            password: user.password,
        }
     })

  } catch (error) {
    console.log(error.message);
  }
};

export { register, login };
