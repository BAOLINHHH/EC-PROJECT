import express from "express";
const router = express.Router();
import {
  getShippingAddressesByUser,
  addShippingAddress,
  deleteShippingAddress,
  checkShippingAddress,
  updateShippingAddress,
} from "../controllers/shippingAddressController.js";
import { protect } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(protect, getShippingAddressesByUser) // Get all shipping addresses
  .post(protect, addShippingAddress) // Add a new shipping address

router.route("/:shippingaddressID").delete(protect, deleteShippingAddress); // Remove from list

router.route("/:shippingaddressID").put(protect, updateShippingAddress); // Update address

router.get("/:shippingaddressID", protect, checkShippingAddress); // Check if a specific shipping address exists

export default router;
