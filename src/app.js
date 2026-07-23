const express = require("express");
const noteModel = require("./models/note.model");


const app=express(); //server ka instance create kiya hai
app.use(express.json());

app.post("/notes", async (req, res)=>{
    const data= req.body;

    await noteModel.create({
        title: data.title,
        description: data.description
    })
    res.status(201).json({
        message: "note created succesfully"
    })
})

app.get("/notes", async (req, res)=>{
    //findone return a the first matching object
    //find return the array of matching objets
    const data= await noteModel.find({
        title: "test_note3"
    });

    res.status(200).json({
        message: "notes fetched from Database",
        notes: data
    })
})

app.delete("/notes/:id", async (req, res)=>{
    const id = req.params.id;

    await noteModel.findOneAndDelete({
        _id: id
    })
    res.status(200).json({
        meassage: "note deleted succesfully"
    })
})

app.patch("/notes/:id", async(req, res)=>{
    const id = req.params.id;

    const description = req.body.description;

    await noteModel.findOneAndUpdate({ _id: id }, { description: description})

    res.status(200).json({
        message: "note updated succesfully"
    })

})


module.exports = app;







