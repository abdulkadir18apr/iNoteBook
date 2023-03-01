const express = require('express');
const router=express.Router();
const fetchuser=require('../middleware/fetchuser');
const Note=require('../models/Notes');
const { body, validationResult } = require('express-validator');
const { findById } = require('../models/User');

//ROUTE-1:get all the Notes //login Required
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    const notes=await Note.find({user:req.user.id})
    res.json({notes})
})

//ROUTE-2:add a new note using Post //login Required

router.post('/addnote',fetchuser,[
    body('title','title must be of 3 character').isLength({min:3}),
    body('description','description must be of 5 character').isLength({min:5})

],async(req,res)=>{
    const{title,description,tag}=req.body;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({error:errors.array()});
    }
    try{
        const note=new Note({title,description,tag,user:req.user.id});
        const savednote= await note.save();
        res.json(savednote);
    }
    catch(error){
        console.log(error.message)
        res.status(500).json("internal Serval error")
    }

})

//ROUTE-3:add a new note using Post //login Required

router.put('/updatenote/:id',fetchuser,async(req,res)=>{
        try{
            const{title,description,tag}=req.body;
            const newNote={};
            if(title){newNote.title=title}
            if(description){newNote.description=description}
            if(tag){newNote.tag=tag}
            //find the node to be updated
            let note=await Note.findById(req.params.id);
            if(!note){
                return  res.status(404).send("Not Found")
            }
            //notes belog to a user
            if(note.user.toString() !== req.user.id){
                return res.status(401).send("Access denied")
            }
            note =await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
            res.json({note})
        }
        catch(error){
            console.log(error.message)
            res.status(500).json("internal Serval error")
        }
        
    

})

//ROUTE-3:add a new note using Post //login Required
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    try{
    //find the node to be deleted 
        let note=await Note.findById(req.params.id);
        if(!note){
            return  res.status(404).send("Not Found")
        }
        //allow if note belong to user
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Access denied")
        }
        note=await Note.findByIdAndDelete(req.params.id);
        res.json({"success":"Note has been deleted",note:note});
    }
    catch(error){
        console.log(error.message)
        res.status(500).json("internal Serval error")
    }     
})
module.exports=router