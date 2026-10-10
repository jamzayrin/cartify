const mongoose = require('mongoose')
const Product = require('./models/product')
require('dotenv').config({ path: './config/.env' })

const products = [
    {
        name: "Wireless Headphones",
        price: 49.99,
        description: "Bluetooth over-ear headphones with noise cancellation.",
        category: "Headphones",
        seller: "Harbor & Field",
        stock: 25,
        images: [{ public_id: "sample/headphones", url: "https://via.placeholder.com/300" }]
    },
    {
        name: "Running Shoes",
        price: 79.99,
        description: "Lightweight running shoes for daily training.",
        category: "Clothes/Shoes",
        seller: "Harbor & Field",
        stock: 40,
        images: [{ public_id: "sample/shoes", url: "https://via.placeholder.com/300" }]
    },
    {
        name: "Mechanical Keyboard",
        price: 89.99,
        description: "Tactile mechanical keyboard with RGB backlighting.",
        category: "Accessories",
        seller: "Harbor & Field",
        stock: 15,
        images: [{ public_id: "sample/keyboard", url: "https://via.placeholder.com/300" }]
    }
]

const run = async () => {
    try {
        console.log('Connecting...')
        const con = await mongoose.connect(process.env.DB_LOCAL_URI, {
            serverSelectionTimeoutMS: 20000
        })
        console.log(`Connected to: ${con.connection.host}`)

        await Product.deleteMany()
        console.log('Products deleted')

        await Product.insertMany(products)
        console.log('Products inserted')

        process.exit(0)
    } catch (error) {
        console.log('FAILED:', error.message)
        process.exit(1)
    }
}

run()