import dotenv from "dotenv";
dotenv.config();
import querystring from "qs";
import crypto from "crypto";
import dateFormat from "dateformat";
import moment from "moment";

import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
// import { calcPrices } from '../utils/calcPrices.js';
// import { verifyPayPalPayment, checkIfNewTransaction } from '../utils/paypal.js';

// @desc     Create new order
// @route    POST /api/orders
// @access   Private
// const addOrderItems = asyncHandler (async (req, res)=> {
//     const {
//         orderItems,
//         shippingAddress,
//         paymentMethod,
//         itemsPrice,
//         shippingPrice,
//         totalPrice,
//     } = req.body;

//     if (orderItems && orderItems.length === 0){
//         res.status(400);
//         throw new Error('No order items');
//     } else {
//         // // get the ordered items from our database
//         // const itemsFromDB = await Product.find({
//         //     _id: { $in: orderItems.map((x) => x._id) },
//         // });

//         // // map over the order items and use the price from our items from database
//         // const dbOrderItems = orderItems.map((itemFromClient) => {
//         //     const matchingItemFromDB = itemsFromDB.find(
//         //         (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
//         //     );
//         //     return {
//         //     ...itemFromClient,
//         //     product: itemFromClient._id,
//         //     price: matchingItemFromDB.price,
//         //     _id: undefined,
//         //     };
//         // });

//         // calculate prices
//         // const { itemsPrice, shippingPrice, totalPrice } = calcPrices(dbOrderItems);

//         const order = new Order ({
//             orderItems: orderItems.map((x) => ({
//                 ...x,
//                 product: x._id,
//                 _id: undefined
//             })),
//             // orderItems: dbOrderItems,
//             user: req.user._id,
//             shippingAddress,
//             paymentMethod,
//             itemsPrice,
//             shippingPrice,
//             totalPrice,
//         });
//         const createdOrder = await order.save();

//         res.status(201).json(createdOrder);
//     }
// });

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    // Lấy sản phẩm từ database dựa trên orderItems
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    // Kiểm tra và cập nhật số lượng sản phẩm
    for (const itemFromClient of orderItems) {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );

      if (!matchingItemFromDB) {
        res.status(404);
        throw new Error(`Product with ID ${itemFromClient._id} not found`);
      }

      // Kiểm tra số lượng còn lại
      if (matchingItemFromDB.quantity < itemFromClient.qty) {
        res.status(400);
        throw new Error(
          `Insufficient quantity for product ${matchingItemFromDB.name}`
        );
      }

      // Trừ số lượng sản phẩm
      matchingItemFromDB.quantity -= itemFromClient.qty;
      await matchingItemFromDB.save();
    }

    // Tạo đối tượng đơn hàng mới
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    // Lưu đơn hàng để có `_id`
    const createdOrder = await order.save();

    // Tạo mã vận đơn: <Ngày thanh toán><Số lượng sản phẩm>_<ObjectID>
    const trackingCode = `${new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "")}${orderItems.length}_${createdOrder._id}`;
    createdOrder.trackingCode = trackingCode;

    await createdOrder.save();

    res.status(201).json(createdOrder);
  }
});

// @desc     Get logged in user orders
// @route    GET /api/orders/mine
// @access   Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc     Get order by ID
// @route    GET /api/orders/:id
// @access   Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc     Update Order to Paid
// @route    PUT /api/orders/:id/pay
// @access   Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  // // NOTE: here we need to verify the payment was made to PayPal before marking
  // // the order as paid
  // const { verified, value } = await verifyPayPalPayment(req.body.id);
  // if (!verified) throw new Error('Payment not verified');

  // // check if this transaction has been used before
  // const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
  // if (!isNewTransaction) throw new Error('Transaction has been used before');

  const order = await Order.findById(req.params.id);

  if (order) {
    // // check the correct amount was paid
    // const paidCorrectAmount = order.totalPrice.toString() === value;
    // if (!paidCorrectAmount) throw new Error('Incorrect amount paid');

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updateOrder = await order.save();

    res.status(200).json(updateOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc     Get all orders
// @route    GET /api/orders
// @access   Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.status(200).json(orders);
});

// @desc     Get tracking
// @route    GET /api/orders/tracking/:trackingCode
// @access   Public
const getOrderByTrackingCode = asyncHandler(async (req, res) => {
  const { trackingCode } = req.params;

  // Tìm kiếm đơn hàng dựa trên trackingCode
  const order = await Order.findOne({ trackingCode })
    .populate("user", "name email") // Lấy thông tin người dùng (nếu cần)
    .populate("orderItems.product", "name price"); // Lấy thêm thông tin sản phẩm (nếu cần)

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  res.json(order); // Trả về thông tin đơn hàng
});


// @desc     create payment url
// @route    POST /api/orders/create_payment_url
// @access   Privie
const createPaymentUrl = asyncHandler(async (req, res) => {
  // var ipAddr =
  //   req.headers["x-forwarded-for"] ||
  //   req.connection.remoteAddress ||
  //   req.socket.remoteAddress ||
  //   req.connection.socket.remoteAddress;

  // var date = new Date();
  // var createDate = dateFormat(date, "yyyymmddHHmmss");
  // var orderId = dateFormat(date, "HHmmss");
  // var amount = req.body.amount;
  // var bankCode = req.body.bankCode;

  // var orderInfo = req.body.orderDescription;
  // var orderType = req.body.orderType;
  // var locale = req.body.language || "vn";
  // var currCode = "VND";

  // var vnp_Params = {
  //   vnp_Version: "2.1.0",
  //   vnp_Command: "pay",
  //   vnp_TmnCode: process.env.VNP_TMNCODE,
  //   vnp_Locale: locale,
  //   vnp_CurrCode: currCode,
  //   vnp_TxnRef: orderId,
  //   vnp_OrderInfo: orderInfo,
  //   vnp_OrderType: orderType,
  //   vnp_Amount: amount * 100,
  //   vnp_ReturnUrl: process.env.VNP_RETURNURL,
  //   vnp_IpAddr: "127.0.0.1",
  //   vnp_CreateDate: createDate,
  // };

  // if (bankCode) {
  //   vnp_Params["vnp_BankCode"] = bankCode;
  // }

  // var signData = querystring.stringify(vnp_Params, { encode: false });
  // var hmac = crypto.createHmac("sha512", process.env.VNP_HASHSECRET);
  // var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  // vnp_Params["vnp_SecureHash"] = signed;
  // const paymentUrl =
  //   process.env.VNP_URL +
  //   "?" +
  //   querystring.stringify(vnp_Params, { encode: false });

  //   console.log("paymentUrl", paymentUrl)
  //   console.log("vnp_Params", vnp_Params)

  // res.redirect(paymentUrl);

  process.env.TZ = "Asia/Ho_Chi_Minh";

  let date = new Date();
  let createDate = moment(date).format("YYYYMMDDHHmmss");

  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  let tmnCode = process.env.VNP_TMNCODE;
  let secretKey = process.env.VNP_HASHSECRET;
  let vnpUrl = process.env.VNP_URL;
  let returnUrl = process.env.VNP_RETURNURL;
  let orderId = moment(date).format("DDHHmmss");
  let amount = req.body.amount;
  let bankCode = req.body.bankCode;

  let locale = req.body.language;
  if (locale === null || locale === "") {
    locale = "vn";
  }
  let currCode = "VND";
  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  let signData = querystring.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
  // console.log(vnpUrl); // Log URL cuối cùng
  // res.redirect(vnpUrl);
  res.status(200).json({ vnpUrl });
});

const sortObject = (obj) => {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
};

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  getOrderByTrackingCode,
  createPaymentUrl,
};
