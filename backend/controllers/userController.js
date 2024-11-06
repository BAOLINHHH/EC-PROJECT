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

// @desc     Sending OTP to user's email
// @route    POST api/users/send-otp
// @access   Public
const sendOtpByEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Kiểm tra email có trong yêu cầu hay không
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Tạo mã OTP và thời gian hết hạn mới
    const otp = crypto.randomInt(100000, 999999);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 phút sau

    // Tìm người dùng với email
    const user = await User.findOne({ email });

    // Nếu người dùng tồn tại, kiểm tra và cập nhật OTP
    if (user) {
      if (user.expiresAt && user.expiresAt > Date.now()) {
        return res.status(400).json({ message: "OTP is still valid. Please check your email." });
      }      
      user.code = otp;
      user.expiresAt = expiresAt;
      await user.save();
    }

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
      message: "New OTP sent to email",
    });
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

// @desc     Request password reset (forgot password)
// @route    POST /api/users/forgot-password
// @access   Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Kiểm tra nếu email không được cung cấp
  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }

  const user = await User.findOne({ email });

  // Kiểm tra nếu người dùng không tồn tại
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Tạo token ngẫu nhiên
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Mã hóa token trước khi lưu trong DB
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Lưu token và thời gian hết hạn vào user document
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // Hết hạn sau 10 phút
  await user.save();

  // Cấu hình SMTP và gửi email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const resetUrl = `localhost:4000/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: `"Đặt lại mật khẩu" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Yêu cầu đặt lại mật khẩu",
    text: `Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng sử dụng liên kết sau: ${resetUrl}`,
    html: `<p>Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng sử dụng liên kết sau:</p><a href="${resetUrl}">${resetUrl}</a>`,
  };

  await transporter.sendMail(mailOptions);

  res.status(200).json({ message: "Reset password email sent" });
});

// @desc     Reset password
// @route    POST /api/users/reset-password
// @access   Public
const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  // Kiểm tra token và mật khẩu mới có trong yêu cầu
  if (!token || !newPassword) {
    res.status(400);
    throw new Error("Token and new password are required");
  }

  // Mã hóa token để so sánh với token đã lưu trong DB
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  // Tìm người dùng có token khớp và còn hạn
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() }, // Token chưa hết hạn
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired token");
  }

  // Cập nhật mật khẩu mới
  user.password = newPassword;
  user.resetPasswordToken = undefined; // Xóa token sau khi sử dụng
  user.resetPasswordExpires = undefined;
  await user.save();

  res.status(200).json({ message: "Password reset successful" });
});

// @desc     Change user password
// @route    PUT /api/users/change-password
// @access   Private (Yêu cầu người dùng đăng nhập)
const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  // Kiểm tra xem các trường dữ liệu có được cung cấp đầy đủ không
  if (!oldPassword || !newPassword) {
    res.status(400);
    throw new Error("Old password and new password are required");
  }

  // Tìm người dùng hiện tại bằng ID từ token xác thực
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Kiểm tra xem mật khẩu cũ có khớp không
  const isMatch = await user.matchPassword(oldPassword);
  if (!isMatch) {
    res.status(401);
    throw new Error("Old password is incorrect");
  }

  // Cập nhật mật khẩu mới
  user.password = newPassword;
  await user.save();

  res.status(200).json({ message: "Password changed successfully" });
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
  verifyOtp,
  forgotPassword,
  resetPassword,
  changePassword
};