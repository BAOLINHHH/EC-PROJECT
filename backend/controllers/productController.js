import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import moment from "moment";

// @desc     Fetch all products
// @route    Get api/products
// @access   Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  const checkValue = (value) => {
    return !value || (!!value && typeof value === "string" && value === "null");
  };
  const keyword = !checkValue(req.query.keyword)
    ? { bookName: { $regex: req.query.keyword, $options: "i" } }
    : {};
  // console.log('requestKeyword',requestKeyword, !!requestKeyword , typeof requestKeyword, typeof requestKeyword=== 'string',requestKeyword ===null,requestKeyword==='null')
  const category = !checkValue(req.query.category)
    ? { category: { $regex: req.query.category, $options: "i" } }
    : {};

  //filter Price
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;

  // Kiểm tra xem minPrice và maxPrice có phải là số hợp lệ không
  // if (isNaN(minPrice) || isNaN(maxPrice)) {
  //   res.status(400);
  //   throw new Error('Invalid minPrice or maxPrice, minPrice and maxPrice must to be a number.');
  // }
  // console.log('minPrice', minPrice)
  // console.log('maxPrice',maxPrice)

  const price =
    !checkValue(minPrice) && !checkValue(maxPrice)
      ? { bookPrice: { $gte: minPrice, $lte: maxPrice } }
      : {};
  //Public Company filter
  const publicCompany = !checkValue(req.query.publicCompany)
    ? { publicCompany: { $regex: req.query.publicCompany, $options: "i" } }
    : {};
  //Author filter
  const form = !checkValue(req.query.form)
    ? { form: { $regex: req.query.form, $options: "i" } }
    : {};

  ///filter language
  const language = !checkValue(req.query.language)
    ? { language: { $regex: req.query.language, $options: "i" } }
    : {};
  // filter rate
  const rate = !checkValue(req.query.rate)
    ? { rating: { $lte: req.query.rate } }
    : {};

  // sort
  const sortOption = req.query.sort || ""; // Lấy giá trị sắp xếp từ request
  let sortCriteria = {}; // Tiêu chí sắp xếp mặc định

  switch (sortOption) {
    case "price_asc":
      sortCriteria = { bookPrice: 1 }; // Sắp xếp giá tăng dần
      break;
    case "price_desc":
      sortCriteria = { bookPrice: -1 }; // Sắp xếp giá giảm dần
      break;
    case "rating_asc":
      sortCriteria = { rating: 1 }; // Sắp xếp rating tăng dần
      break;
    case "rating_desc":
      sortCriteria = { rating: -1 }; // Sắp xếp rating giảm dần
      break;
    case "name_asc":
      sortCriteria = { bookName: 1 }; // Sắp xếp tên theo alphabet tăng dần
      break;
    case "name_desc":
      sortCriteria = { bookName: -1 }; // Sắp xếp tên theo alphabet giảm dần
      break;
    default:
      sortCriteria = { _id: -1 }; // Mặc định: sắp xếp theo ID mới nhất
  }

  const count = await Product.countDocuments({
    ...keyword,
    ...category,
    ...price,
    ...publicCompany,
    ...form,
    ...language,
    ...rate,
  });
  const products = await Product.find({
    ...keyword,
    ...category,
    ...price,
    ...publicCompany,
    ...form,
    ...language,
    ...rate,
  })
    .sort(sortCriteria)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc     Fetch a product
// @route    Get /api/products/:id
// @access   Public

const getProductById = asyncHandler(async (req, res) => {
  const products = await Product.findById(req.params.id);

  if (products) {
    return res.json(products);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc     Create a product
// @route    POST /api/products
// @access   Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    bookName: "Sample name",
    user: req.user._id,
    category: "Sample category",
    author: "Sample author",
    publicCompany: "Sample public company",
    language: "Sample language",
    form: "Sample form",
    pageNumber: 0,
    bookPrice: 0,
    bookDetail: "Sample description",
    bookImage: "/images/sample.jpg",
    bookQuaranty: 0,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc     Update a product
// @route    PUT /api/products/:id
// @access   Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    bookName,
    bookPrice,
    bookDetail,
    bookImage,
    author,
    category,
    publicCompany,
    bookQuaranty,
    language,
    form,
    pageNumber,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.bookName = bookName;
    product.bookPrice = bookPrice;
    product.bookDetail = bookDetail;
    product.bookImage = bookImage;
    product.author = author;
    product.category = category;
    product.publicCompany = publicCompany;
    product.bookQuaranty = bookQuaranty;
    product.language = language;
    product.form = form;
    product.pageNumber = pageNumber;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc     Delete a product
// @route    DELETE /api/products/:id
// @access   Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Get top rated products
// @route   GET /api/products/toprated
// @access  Public
const getTopRatedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(10);
  res.status(200).json(products);
});

// @desc     Fetch all products
// @route    Get api/products
// @access   Public
const getProducts1 = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Get latest products (Sản phẩm mới)
// @route   GET /api/products/latest
// @access  Public
const getLatestProducts = asyncHandler(async (req, res) => {
  // Kiểm tra xem query có truyền 'category' hay không, nếu có thì tạo điều kiện lọc
  const category = req.query.category
    ? { category: { $regex: req.query.category, $options: "i" } } // Lọc theo category (không phân biệt hoa/thường)
    : {}; // Nếu không có category thì không áp dụng điều kiện lọc

  // Tìm sản phẩm mới nhất và lọc theo category (nếu có)
  const products = await Product.find(category).sort({ createdAt: -1 }).limit(10);

  res.status(200).json(products);
});

// @desc    Get discounted products (Sản phẩm khuyến mãi)
// @route   GET /api/products/discounted
// @access  Public
const getDiscountedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ bookQuaranty: { $gt: 0 } }).limit(5);
  res.status(200).json(products);
});

// @desc    Get featured products of the week (Sản phẩm nổi bật trong tuần)
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const oneWeekAgo = moment().subtract(7, "days").toDate();

  // Lấy các sản phẩm được tạo trong tuần qua hoặc có đánh giá trong tuần qua
  const products = await Product.find({
    createdAt: { $gte: oneWeekAgo }, // Sản phẩm được tạo trong tuần qua
  })
    .sort({ rating: -1 }) // Sắp xếp theo đánh giá cao nhất
    .limit(5); // Giới hạn kết quả trả về

  res.status(200).json(products);
});

// @desc    Get personalized products for the user (Sản phẩm dành cho bạn)
// @route   GET /api/products/recommended
// @access  Private (dành cho người dùng đã đăng nhập)
const getRecommendedProducts = asyncHandler(async (req, res) => {
  const user = req.user; // Giả định user đã đăng nhập và middleware xác thực đã được thực hiện trước đó

  if (!user) {
    res.status(401);
    throw new Error("User not authenticated");
  }

  // Lấy danh sách sản phẩm từ wishlist và cart
  const wishlistProductIds = user.wishlist.map((product) => product._id);
  const cartProductIds = user.cart.map((item) => item.product._id);

  // Tổng hợp các danh mục sản phẩm dựa trên wishlist và cart
  const wishlistProducts = await Product.find({
    _id: { $in: wishlistProductIds },
  });
  const cartProducts = await Product.find({ _id: { $in: cartProductIds } });

  // Lấy danh mục từ các sản phẩm trong wishlist và cart
  const categoriesFromWishlist = wishlistProducts.map(
    (product) => product.category
  );
  const categoriesFromCart = cartProducts.map((product) => product.category);

  // Tập hợp tất cả các danh mục yêu thích
  const userPreferences = [
    ...new Set([
      ...categoriesFromWishlist,
      ...categoriesFromCart,
      ...(user.preferences || []),
    ]),
  ];

  // Gợi ý các sản phẩm dựa trên danh mục yêu thích
  const recommendedProducts = await Product.find({
    category: { $in: userPreferences },
    _id: { $nin: [...wishlistProductIds, ...cartProductIds] }, // Loại bỏ các sản phẩm đã có trong wishlist hoặc cart
  }).limit(5); // Giới hạn số sản phẩm gợi ý

  res.status(200).json(recommendedProducts);
});

// @desc    Get top-selling products (Sản phẩm bán chạy)
// @route   GET /api/products/topsellers
// @access  Public
const getTopSellerProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ numReviews: -1 }).limit(10);
  res.status(200).json(products);
});

// @desc    Get similar products (Sản phẩm tương tự)
// @route   GET /api/products/:id/similar
// @access  Public
const getSimilarProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Tìm các sản phẩm có cùng category với sản phẩm hiện tại, ngoại trừ sản phẩm hiện tại
  const similarProducts = await Product.find({
    category: product.category,
    _id: { $ne: product._id }, // Loại bỏ sản phẩm hiện tại ra khỏi danh sách
  }).limit(5); // Giới hạn số sản phẩm trả về

  res.status(200).json(similarProducts);
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopRatedProducts,
  getProducts1,
  getLatestProducts,
  getFeaturedProducts,
  getRecommendedProducts,
  getDiscountedProducts,
  getTopSellerProducts,
  getSimilarProducts,
};
