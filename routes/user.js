const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const randToken = require('rand-token');
const router = express.Router();

const User = require("../models/User");


/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
    "/signup",
    async (req, res) => {
        const serverurl = req.protocol + '://' + req.get('host');


        console.log('signup route...', req.body)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {


            return res.status(400).json({

                errors: errors.array()
            });
        }

        const { username, email, password, typeuser } = req.body;
        try {
            let user = await User.findOne({
                email
            });
            if (user) {
                //Usuario ya existe
                return res.redirect(serverurl + "/register?error=already_exists");
            }

            user = new User({
                username,
                email,
                password,
                typeuser
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            // Aca se guarda a la base de datos
            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "secret", {
                expiresIn: 36000
            },
                (err, token) => {
                    if (err) throw err;

                    // Cookie token


                    res.cookie("token", token);
                    
                    return res.redirect(serverurl + "/login?new_user="+email);

                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

router.post(
    "/login",
    async (req, res) => {
        
        const serverurl = req.protocol + '://' + req.get('host');

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({
                email
            });
            if (!user)
            //Usuario no existe
            
            return res.redirect(serverurl + "/login?error_login=not_existing_user");

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch){
                //Contraseña incorrecta
                return res.redirect(serverurl + "/login?error_login=wrong_pass");
            }
            
            var dateNow = new Date();

            var tiempoReg = (dateNow - user.createdAt)/1000 // segundos
            var tiempoRegMinutes = Math.floor(tiempoReg / 60) // minutos 

            
            console.log("El usuario se registro hace " +  tiempoRegMinutes + " minutos")

            const payload = {
                user: {
                    id: user.id
                }
            };


            jwt.sign(
                payload,
                "secret",
                {
                    expiresIn: 36000
                },
                (err, token) => {
                    if (err) throw err;

                    //Usuario entró correctamente
                    

                    res.cookie("token", token);
                    res.cookie("id", user.id);
                    res.cookie("username", user.username);
                    res.cookie("email", user.email);
                    res.cookie("role", user.role);
                    
                    if (tiempoRegMinutes < 15){
                
                        res.redirect("/seller")
                    }
                    else{

                        res.redirect("/")
                    }

                }
            );
        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: "Server Error"
            });
        }
    }
);

module.exports = router;
