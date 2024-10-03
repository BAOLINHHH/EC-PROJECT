import Cart from "../models/cartModel.js";

// Hàm thêm sản phẩm vào giỏ hàng
const addToCart = async (req, res) => {
  const {
    userId,
    cartItems,
    itemsPrice,
    itemsShip,
    paymentMethhod,
    totalPrice,
  } = req.body;

  // Kiểm tra nếu cartItems là mảng trống hoặc có số lượng sản phẩm <= 0
  if (!cartItems || cartItems.length === 0) {
    try {
      // Xóa giỏ hàng của người dùng nếu cartItems là trống hoặc không có sản phẩm
      await Cart.findOneAndDelete({ user: userId });
      res.status(200).json({ message: "Cart deleted as cartItems is empty." });
    } catch (error) {
      console.error("Error deleting cart:", error.message);
      res
        .status(500)
        .json({ message: "Error deleting cart", error: error.message });
    }
  } else {
    try {
      // Tìm giỏ hàng của người dùng và cập nhật hoặc tạo mới nếu không có
      const filter = { user: userId };
      const update = {
        $set: {
          cartItems: cartItems,
          itemsPrice: itemsPrice,
          itemsShip: itemsShip,
          paymentMethod: paymentMethhod,
          totalPrice: totalPrice,
        },
      };
      const options = { new: true, upsert: true };

      const savedCart = await Cart.findOneAndUpdate(filter, update, options);
      res.status(200).json(savedCart);
    } catch (error) {
      console.error("Error updating or creating cart:", error.message);
      res
        .status(500)
        .json({
          message: "Error updating or creating cart",
          error: error.message,
        });
    }
  }
};

// @desc    Get cart by user ID
// @route   GET /api/cart/:userId
// @access  Private
const getCartByUser = async (req, res) => {
  const userId = req.user._id;

  // Find the cart for the user
  const cart = await Cart.findOne({ user: userId }).populate("cartItems"); // Assuming `cartItems` contains product references

  if (!cart) {
    res.status(200).json({}); // Return an empty object if the cart is not found
    return; // Prevent further execution
  }

  res.status(200).json(cart); // Return the found cart
};

export { addToCart, getCartByUser };