// Run:   node seeders/userSeeder.js          -> adds the admin + user
//        node seeders/userSeeder.js --delete -> removes them
require('dotenv').config({ path: './config/.env' }) // if your file is named config.env, use './config/config.env'

const mongoose = require('mongoose')
const User = require('./models/user')

const users = [
    {
        name: 'Cartify Admin',
        email: 'admin@cartify.com',
        password: 'admin123',
        role: 'admin'
    },
    {
        name: 'Cartify User',
        email: 'user@cartify.com',
        password: 'user123',
        role: 'user'
    }
]

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.DB_LOCAL_URI)
        console.log('Database connected')

        const emails = users.map(u => u.email)
        await User.deleteMany({ email: { $in: emails } }) // avoids duplicate-email errors on re-run

        if (process.argv.includes('--delete')) {
            console.log('Seeded users deleted')
        } else {
            // create() (not insertMany) so the pre-save hook hashes the passwords
            await User.create(users)
            console.log('Users seeded:')
            users.forEach(u => console.log(`  ${u.role}: ${u.email} / ${u.password}`))
        }
    } catch (err) {
        console.error('Seeding failed:', err.message)
    } finally {
        await mongoose.disconnect()
        process.exit()
    }
}

seedUsers()