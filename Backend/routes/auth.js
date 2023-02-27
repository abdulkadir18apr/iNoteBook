const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const User = require('../models/User');
const { Schema } = mongoose;
var bcrypt = require('bcryptjs')

const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser');

const JWT_SECRET="AbdulkadirIsAGood$boy";

//ROUTE-1:  Create a user using POST request "/api/createuser/". No Login Required

router.post('/createuser', [
    body('name', "Enter a Valid Name").isLength({ min: 3 }),
    body('email', "Enter a Valid email").isEmail(),
    body('password', "Small Password").isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    //if error return Bad request and errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //check if user already Exist
    try {
        let user = await User.findOne({ email: req.body.email })
        // console.log(user)
        if (user) {
            return res.status(404).json({ error: "email is already registered" })
        }
        //create a new user

        const salt=await bcrypt.genSaltSync(10);
        let secpass = await bcrypt.hashSync(req.body.password, salt);


        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpass
        })
        const data={
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET)
        res.send({authToken});
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json("internal Serval error")
    }

    //check whether email exist already

})
// ROUTE-2: for  login of a user....................
//No login Required
router.post('/login',[body('email', "Enter a Valid email").isEmail(),body('password','password cannot bhi blank').exists()],async (req,res)=>{
    const errors = validationResult(req);
    //if error return Bad request and errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email:email});
        if(!user){
            return res.status(400).json({error:"try login with correct credential"});
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({error:"try login with correct credential"});
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET);
        res.json({authToken});

    }
    catch (error) {
        console.log(error.message)
        res.status(500).json("internal Serval error")
    }

})

//ROUTE-3 Get Login User Details.............
// Login Reurired
router.post('/getuser',fetchuser,async (req,res)=>{

    try{
        userId=req.user.id;
        const user=await User.findById(userId).select("-password");
        res.json(user);
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json("internal Serval error")
    }
})

module.exports = router