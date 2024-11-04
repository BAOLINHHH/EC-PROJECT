import ShippingAddress from "../models/shippingAddressModel.js";

// @desc    Lấy danh sách địa chỉ giao hàng của người dùng
// @route   GET /api/shippingAddress
// @access  Private
const getShippingAddressesByUser = async (req, res) => {
  const userId = req.user._id;

  try {
    // Tìm danh sách địa chỉ giao hàng của người dùng dựa vào userId
    const shippingAddresses = await ShippingAddress.findOne({ user: userId });

    // Nếu không tìm thấy, trả về danh sách rỗng
    if (!shippingAddresses) {
      return res.status(200).json({ message: "No Shipping Address found" });
    }

    // Nếu tìm thấy, trả về danh sách địa chỉ giao hàng
    res.status(200).json(shippingAddresses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shipping addresses", error });
  }
};

// @desc    Thêm địa chỉ giao hàng mới
// @route   POST /api/shippingAddress
// @access  Private
const addShippingAddress = async (req, res) => {
    const userId = req.user._id;
    const { recipientName, phoneNumber, country, city, district, ward, addressDetails } = req.body;
//    if(!userId)
//        res.status(500).json({ message: "You need to login first!", error });
    try {
        let shippingaddres = await ShippingAddress.findOne({ user: userId });
    
        if (!shippingaddres) {
          shippingaddres = new ShippingAddress({ user: userId, shippingAddress: [] });
        }
    
        shippingaddres.shippingAddress.push({ recipientName, phoneNumber, country, city, district, ward, addressDetails });
        await shippingaddres.save();
    
        res.status(200).json(shippingaddres);
      } catch (error) {
        res.status(500).json({ message: "Error adding to ShippingAddress list", error });
      }
};

// @desc    Xóa địa chỉ giao hàng
// @route   DELETE /api/shippingAddress/:addressId
// @access  Private
const deleteShippingAddress = async (req, res) => {
  const userId = req.user._id;
  const { shippingaddressID } = req.params;

  try {
      const shippingaddress = await ShippingAddress.findOne({ user: userId });

      if (!shippingaddress) {
          return res.status(404).json({ message: "Shipping address list not found" });
      }

      // Kiểm tra xem địa chỉ cần xóa có tồn tại trong mảng không
      const addressExists = shippingaddress.shippingAddress.some(
          (item) => item._id.toString() === shippingaddressID
      );
      
      if (!addressExists) {
          return res.status(404).json({ message: "This Shipping Address is no longer exits." });
      }

      // Lọc bỏ địa chỉ cần xóa và lưu lại thay đổi
      shippingaddress.shippingAddress = shippingaddress.shippingAddress.filter(
          (item) => item._id.toString() !== shippingaddressID
      );

      await shippingaddress.save();

      res.status(200).json({ message: "Shipping address deleted successfully", shippingaddress });
  } catch (error) {
      res.status(500).json({ message: "Error removing from wishlist", error });
      console.error(error);
  }
};


// @desc    Kiểm tra xem địa chỉ giao hàng có tồn tại không
// @route   GET /api/shippingAddress/:shippingaddressID
// @access  Private
const checkShippingAddress = async (req, res) => {
  const userId = req.user._id;
  const { shippingaddressID } = req.params;

  try {
    // Tìm danh sách địa chỉ giao hàng của người dùng
    const shippingaddresses = await ShippingAddress.findOne({ user: userId });

    // Nếu không có danh sách địa chỉ, trả về false
    if (!shippingaddresses) {
      return res.status(200).json({ message: "Error checking shipping address, no list found" });
      console.log(addressId);
    }

    // Kiểm tra xem địa chỉ có tồn tại trong danh sách không
    const addressExists = shippingaddresses.shippingAddress.some(
      (address) => address._id.toString() === shippingaddressID
    );
    //console.log("Checking address ID:", shippingaddressID);
    //console.log("Address exists:", addressExists);
    res.status(200).json({ isInList: addressExists });
  } catch (error) {
    res.status(500).json({ message: "Error checking shipping address", error });
    console.error(error);
  }
};

// @desc    Cập nhật một địa chỉ giao hàng cụ thể
// @route   PUT /api/shippingAddress/:shippingaddressID
// @access  Private
const updateShippingAddress = async (req, res) => {
  const userId = req.user._id;
  const { shippingaddressID } = req.params;
  const { recipientName, phoneNumber, country, city, district, ward, addressDetails } = req.body;

  try {
    // Tìm danh sách địa chỉ giao hàng của người dùng
    const shippingaddress = await ShippingAddress.findOne({ user: userId });

    // Nếu không có danh sách địa chỉ, trả về lỗi
    if (!shippingaddress) {
      return res.status(404).json({ message: "You need to login first!" });
    }

    // Tìm vị trí của địa chỉ cần cập nhật trong danh sách
    const addressIndex = shippingaddress.shippingAddress.findIndex(
      (address) => address._id.toString() === shippingaddressID
    );

    // Nếu không tìm thấy địa chỉ, trả về lỗi
    if (addressIndex === -1) {
      return res.status(404).json({ message: "Shipping address not found" });
    }

    // Cập nhật các trường của địa chỉ giao hàng
    shippingaddress.shippingAddress[addressIndex] = {
      ...shippingaddress.shippingAddress[addressIndex]._doc,
      recipientName,
      phoneNumber,
      country,
      city,
      district,
      ward,
      addressDetails,
    };

    // Lưu lại thay đổi vào cơ sở dữ liệu
    await shippingaddress.save();

    res.status(200).json(shippingaddress);
  } catch (error) {
    res.status(500).json({ message: "Error updating shipping address", error });
  }
};

export {
  getShippingAddressesByUser,
  addShippingAddress,
  deleteShippingAddress,
  checkShippingAddress,
  updateShippingAddress,
};