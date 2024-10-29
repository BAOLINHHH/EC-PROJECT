import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    bookName: {
      type: String,
      required: true,
      default: 'Sample name',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Author',
    },
    publicCompany: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'PublicCompany',
    },
    language: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Language',
    },
    form: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Form',
    },
    pageNumber: {
      type: Number,
      required: true,
      default: 0,
    },
    bookPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    bookDetail: {
      type: String,
      required: true,
      default: 'Sample description',
    },
    bookImage: {
      type: String,
      required: true,
      default: '/imageshome/tieuthuyet.jpg',
    },
    bookQuaranty: {
      type: Number,
      required: true,
      default: 0,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    pdfUrl: {
      type: String,
      required: false,
    },
    audioUrl: {
      type: String,
      required: false,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;