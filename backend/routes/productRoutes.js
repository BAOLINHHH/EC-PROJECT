import express from "express";
const router = express.Router();
import {
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
  getSimilarProducts
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/getProducts1").get(protect, admin, getProducts1);
router.route("/:id/reviews").post(protect, checkObjectId, createProductReview);
router.get("/toprated", getTopRatedProducts);

router.get("/latest", getLatestProducts); // Sản phẩm mới
router.get('/featured', getFeaturedProducts);   // Sản phẩm nổi bật trong tuần
router.get('/recommended', getRecommendedProducts);
router.get("/discounted", getDiscountedProducts); // Sản phẩm khuyến mãi
router.get("/topsellers", getTopSellerProducts); // Sản phẩm bán chạy
router.get('/:id/similar', getSimilarProducts); // Thêm route cho sản phẩm tương tự

router
  .route("/:id")
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);


export default router;