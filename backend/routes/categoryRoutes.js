
import express from 'express';
import uploadCloud from '../config/cloudinaryConfig.js';
import {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} from '../controllers/categoryController.js';

const router = express.Router();

router.post('/', uploadCloud.single('image') , createCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.put('/:id',  uploadCloud.single('image'),updateCategory);
router.delete('/:id', deleteCategory);

export default router;