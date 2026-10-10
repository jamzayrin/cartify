const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    brand: {
        type: String,
        required: [true, 'Please enter product brand'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        max: [99999, 'Product price cannot exceed 99999'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    shades: [String],
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    category: {
        type: String,
        required: [true, 'Please select category for this product'],
        enum: {
            values: [
                'Foundation',
                'Concealer',
                'Powder',
                'Blush & Highlighter',
                'Eyeshadow',
                'Eyeliner & Mascara',
                'Lipstick & Lip Tint',
                'Brows'
            ],
            message: 'Please select correct category for product'
        }
    },
    seller: {
        type: String,
        default: 'Cartify'
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        max: [99999, 'Product stock cannot exceed 99999'],
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);