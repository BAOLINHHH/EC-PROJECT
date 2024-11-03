import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import nodemailer from "nodemailer";
import crypto from "crypto";

// @desc     Auth user & get token
// @route    POST api/users/login
// @access   Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    if (user.status === 0) {
      res.status(403).json({ message: "Tài khoản chưa được kích hoạt"});
    } else if (await user.matchPassword(password)) {
      generateToken(res, user._id);

      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401);
      throw new Error("Email hoặc mật khẩu không hợp lệ");
    }
  } else {
    res.status(401);
    throw new Error("Email hoặc mật khẩu không hợp lệ");
  }
});


// @desc     Register user
// @route    POST api/users
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const sendOtpByEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Kiểm tra email có trong yêu cầu hay không
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Tìm người dùng với email
    const user = await User.findOne({ email });

    // Nếu người dùng không tồn tại
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Kiểm tra thời gian hết hạn OTP
    const now = Date.now();
    if (user.expiresAt && user.expiresAt > now) {
      return res.status(400).json({ message: "OTP is still valid. Please check your email." });
    } else {
      // Nếu OTP đã hết hạn hoặc không có OTP, tạo mã mới
      const otp = crypto.randomInt(100000, 999999);
      const expiresAt = new Date(now + 10 * 60 * 1000); // 10 phút sau

      // Cập nhật OTP và thời hạn trong bảng User
      user.code = otp;
      user.expiresAt = expiresAt;
      await user.save();

      // Cấu hình bộ gửi SMTP
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Tùy chọn email
      const mailOptions = {
        from: `"Xác thực OTP" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Mã xác thực",
        text: `Mã OTP của bạn là: ${otp}`,
        html: `<p>Mã OTP của bạn là: <strong>${otp}</strong></p><p>Lưu ý: mã OTP của bạn có thời hạn 10 phút.</p>`,
      };

      // Gửi email
      await transporter.sendMail(mailOptions);

      // Phản hồi khi email được gửi thành công
      res.status(200).json({
        message: "New OTP sent to email and updated in user profile",
      });
    }
  } catch (error) {
    console.error("Error sending OTP:", error.message || error);
    res.status(500).json({
      message: "Failed to send OTP",
      error: error.message || "An unexpected error occurred",
    });
  }
};

// @desc     Verify OTP for user's email
// @route    POST api/users/verify-otp
// @access   Public
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Kiểm tra nếu thiếu email hoặc otp
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    // Tìm người dùng với email và kiểm tra OTP
    const user = await User.findOne({ email });

    // Kiểm tra nếu người dùng không tồn tại hoặc OTP không trùng khớp
    if (!user || user.code !== parseInt(otp, 10)) {
      return res.status(400).json({ message: "Invalid OTP or email" });
    }

    // Kiểm tra thời gian hết hạn OTP
    if (user.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // OTP hợp lệ, có thể tiếp tục với xác thực người dùng hoặc cập nhật trạng thái
    res.status(200).json({ message: "OTP verified successfully" });

    // Cập nhật lại trạng thái 
    await User.updateOne({ email }, { $set: { status: 1 } });

  } catch (error) {
    console.error("Error verifying OTP:", error.message || error);
    res
      .status(500)
      .json({ message: "Failed to verify OTP", error: error.message });
  }
};

// @desc     Logout user / clear cookie
// @route    POST api/users/logout
// @access   Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

// @desc     Get user profile
// @route    GET api/users/profile
// @access   Public
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc     Update user profile
// @route    Put api/users/profile
// @access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updateUser = await user.save();

    res.status(200).json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc     Get users
// @route    GET api/users
// @access   Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc     Delete user
// @route    DELETE api/users/:id
// @access   Public
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User delete successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc     Get user by ID
// @route    GET api/users/:id
// @access   Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc     Update user
// @route    PUT api/users/:id
// @access   Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  sendOtpByEmail,
  verifyOtp
};