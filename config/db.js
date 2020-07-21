const mongoose = require('mongoose');
require('dotenv').config({ debug: process.env.DEBUG });

//Conexion a mongoDB

const uri = "mongodb+srv://dbUsuario:dbContraseña@cluster0.lbazp.mongodb.net/ecommerce?retryWrites=true&w=majority"

const MONGOURI = uri;

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(MONGOURI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('DB Connected...');
    } catch (error) {
        console.log('DB connection failed: ', error);
        throw error;
    }
}

module.exports = InitiateMongoServer;