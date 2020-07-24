const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const randToken = require('rand-token');
const router = express.Router();

const Services = require("../models/Services");




router.post(
    "/add_service",
    async (req, res) => {
        console.log("POST Recibido")
        const serverurl = req.protocol + '://' + req.get('host');


        console.log('signup route...', req.body)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {


            return res.status(400).json({

                errors: errors.array()
            });
        }

        const { title, description, category, miniumPrice } = req.body;
        
        newService = new Services({
            title,
            description,
            category,
            miniumPrice
        });

        try {


            // Aca se guarda a la base de datos
            await newService.save();
            
            res.redirect("/")
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

module.exports = router;
