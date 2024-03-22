const express = require('express');
const router=express.Router();
const blogmodel= require('../models/BlogModel');
const moment = require('moment'); 

router.get('/all', async (req,res) => {
   try{

    const blog =await blogmodel.find()
    res.json(blog);
   }
   catch(err){
    res.send("Error: " + err);
   }
});

router.get('/find:title', async (req,res) => {
    try{
     const blogone =await blogmodel.findOne({title: req.params.title});
     res.json(blogone);
    }
    catch(err){
     res.send("Error: " + err);
    }
 });

 router.get('/allBlog', async (req, res) => {
    try {
        let query = blogmodel.find();
        
        // Sorting
        if (req.query.sortBy) {
            query = query.sort(req.query.sortBy);
        }

        // Filtering
        if (req.query.author) {
            query = query.where('author').equals(req.query.author);
        }

        const posts = await query.exec();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/find/:author', async (req,res) => {
    try{
     const blogone =await blogmodel.find({author: req.params.author});
     res.json(blogone);
    }
    catch(err){
     res.send("Error: " + err);
    }
 });


router.post('/add', async (req, res) => {
    const parsedDate = moment(req.body.pdate, 'DD-MM-YY').toDate(); 
    const pblog = new blogmodel({
        title: req.body.title,
        content: req.body.content,
        pdate: parsedDate,
        author: req.body.author,
    })
    try{
        const s1= await pblog.save();
        res.json(s1);
    }
    catch(err){
        res.send("Error: " + err);
    }
});

router.put('/update/:title', async (req, res) => {
    try {
        var title = req.body.title;
        var content = req.body.content;
        var author = req.body.author;

        const updatedBlog = await blogmodel.findOneAndUpdate(
            { title: req.params.title },
            { title: title, content: content, author: author },
            { new: true }
        );

        if (updatedBlog) {
            console.log("Updated");
            res.json("Updated");
        } else {
            console.log("Blog not found");
            res.status(404).json({ error: "Blog not found" });
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



router.delete('/delete:title', async(req,res)=>{
    try{

        const delBlog= await blogmodel.deleteOne({title: req.params.title}) 
        res.json(delBlog);
    }catch(err){
        res.send("Error");
    }
});


module.exports =router