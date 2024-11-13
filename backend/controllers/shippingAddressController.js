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
  const {
    recipientName,
    phoneNumber,
    ProvinceID,
    ProvinceName,
    DistrictID,
    DistrictName,
    WardCode,
    WardName,
    addressDetails,
  } = req.body;

  try {
    // Tìm kiếm địa chỉ giao hàng theo user ID
    let shippingAddress = await ShippingAddress.findOne({ user: userId });

    // Nếu chưa tồn tại, tạo mới
    if (!shippingAddress) {
      shippingAddress = new ShippingAddress({ user: userId, shippingAddress: [] });
    }

    // Thêm địa chỉ mới vào danh sách
    shippingAddress.shippingAddress.push({
      recipientName,
      phoneNumber,
      ProvinceID,
      ProvinceName,
      DistrictID,
      DistrictName,
      WardCode,
      WardName,
      addressDetails,
    });

    // Lưu vào cơ sở dữ liệu
    await shippingAddress.save();

    res.status(200).json(shippingAddress);
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
  const {
    recipientName,
    phoneNumber,
    ProvinceID,
    ProvinceName,
    DistrictID,
    DistrictName,
    WardCode,
    WardName,
    addressDetails,
  } = req.body;

  try {
    // Sử dụng findOneAndUpdate để tìm và cập nhật địa chỉ giao hàng
    const updatedShippingAddress = await ShippingAddress.findOneAndUpdate(
      { user: userId, "shippingAddress._id": shippingaddressID },
      {
        $set: {
          "shippingAddress.$.recipientName": recipientName,
          "shippingAddress.$.phoneNumber": phoneNumber,
          "shippingAddress.$.ProvinceID": ProvinceID,
          "shippingAddress.$.ProvinceName": ProvinceName,
          "shippingAddress.$.DistrictID": DistrictID,
          "shippingAddress.$.DistrictName": DistrictName,
          "shippingAddress.$.WardCode": WardCode,
          "shippingAddress.$.WardName": WardName,
          "shippingAddress.$.addressDetails": addressDetails,
        },
      },
      { new: true }
    );

    // Nếu không tìm thấy địa chỉ, trả về lỗi
    if (!updatedShippingAddress) {
      return res.status(404).json({ message: "Shipping address not found" });
    }

    // Trả về kết quả cập nhật
    res.status(200).json(updatedShippingAddress);
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