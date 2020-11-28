const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')
const users = require('./data/users')
const foods = require('./data/food.data')
const User = require('./models/userModel')
const Food = require('./models/foodModel')
const Order = require('./models/orderModel')
const connectDB = require('./config/db')

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Order.deleteMany()
        await Food.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id

        const sampleFoods = foods.map(food => {
            return {...food, user: adminUser}
        })

        await Food.insertMany(sampleFoods)

        console.log('Data Imported!!!'.green.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroytData = async () => {
    try {
        await Order.deleteMany()
        await Food.deleteMany()
        await User.deleteMany()

        console.log('Data Destroyed!!!'.red.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

if(process.argv[2] === '-d') {
    destroytData()
} else {
    importData()
}