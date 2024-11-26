import Coupon from '../models/couponModel.js';

// @desc     Create a new coupon
// @route    POST api/coupons/create
// @access   Public
const createCoupon = async (req, res) => {
    try {
        const { code, discount, maxDiscount, minOrderValue, expirationDate } = req.body;
        const newCoupon = new Coupon({
            code,
            discount,
            maxDiscount,
            minOrderValue,
            expirationDate
        });

        await newCoupon.save();
        res.status(201).json({
            message: 'Coupon created successfully!',
            coupon: newCoupon
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating coupon', error });
    }
};

// @desc     Get all coupons
// @route    GET api/coupons
// @access   Public
const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching coupons', error });
    }
};

// @desc     Get a coupon by code
// @route    GET api/coupons/:code
// @access   Public
const getCouponByCode = async (req, res) => {
    try {
        const coupon = await Coupon.findOne({ code: req.params.code });
        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }
        res.status(200).json(coupon);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching coupon', error });
    }
};

// @desc     Update coupon by code
// @route    PUT api/coupons/:code
// @access   Public
const updateCoupon = async (req, res) => {
    try {
        const { code } = req.params;
        const { discount, maxDiscount, minOrderValue, expirationDate, status } = req.body;
        
        const updatedCoupon = await Coupon.findOneAndUpdate(
            { code },
            { discount, maxDiscount, minOrderValue, expirationDate, status },
            { new: true }
        );

        if (!updatedCoupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        res.status(200).json({
            message: 'Coupon updated successfully!',
            coupon: updatedCoupon
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating coupon', error });
    }
};

// @desc     Delete coupon by code
// @route    DELETE api/coupons/:code
// @access   Public
const deleteCoupon = async (req, res) => {
    try {
        const { code } = req.params;

        const deletedCoupon = await Coupon.findOneAndDelete({ code });

        if (!deletedCoupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        res.status(200).json({
            message: 'Coupon deleted successfully!',
            coupon: deletedCoupon
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting coupon', error });
    }
};

// @desc     Apply coupon
// @route    POST api/coupons/apply
// @access   Public
const applyCoupon = async (req, res) => {
    try {
        const { code, orderValue } = req.body;
        const coupon = await Coupon.findOne({ code });

        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        if (coupon.status === 'inactive' || coupon.expirationDate < new Date()) {
            return res.status(400).json({ message: 'Coupon is expired or inactive' });
        }

        if (orderValue < coupon.minOrderValue) {
            return res.status(400).json({
                message: `Order value must be at least ${coupon.minOrderValue} VND to apply this coupon`
            });
        }

        let discountAmount = (orderValue * coupon.discount) / 100;
        if (discountAmount > coupon.maxDiscount) {
            discountAmount = coupon.maxDiscount;
        }

        res.status(200).json({
            message: 'Coupon applied successfully',
            discountAmount: discountAmount
        });
    } catch (error) {
        res.status(500).json({ message: 'Error applying coupon', error });
    }
};


export {createCoupon, getCoupons, getCouponByCode, updateCoupon, deleteCoupon, applyCoupon};