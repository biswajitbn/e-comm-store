const express = require ("express");
const { registerUser, loginUser } = require("../handlers/auth-handler");
const router = express.Router();


router.post("/register", async(req,res) => {
    let model =  req.body;
    if(model.name && model.email && model.password){
        // todo register
        await registerUser(model);
        res.send({
            message: "user registered",
        })
    }
    else{
        res.status(400).json({
            error: "please provide name, email and password",
        });
    }
});


router.post("/login", async(req,res) => {
    let model =  req.body;
    if(model.email && model.password){
        // todo login

        const result = await loginUser(model);
        if(result){
            res.send(result);
        }
        else{
            res.status(400).json({
                error: "email or password are incorrect",
            })
        }
    }
    else{
        res.status(400).json({
            error: "please provide email and password",
        });
    }
});

module.exports = router;

