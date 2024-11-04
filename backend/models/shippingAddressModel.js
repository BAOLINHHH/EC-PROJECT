import mongoose from 'mongoose';

const shippingAddressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    shippingAddress: [
      {
        recipientName: {
          type: String,
        },
        phoneNumber: {
          type: String,
        },
        country: {
          type: String,
          default: 'Việt Nam',
        },
        city: {
          type: String,
        },
        district: {
          type: String,
        },
        ward: {
          type: String,
        },
        addressDetails: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields automatically
  }
);

const ShippingAddress = mongoose.model('ShippingAddress', shippingAddressSchema);

export default ShippingAddress;
