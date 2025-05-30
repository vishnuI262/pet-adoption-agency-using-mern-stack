import Pet from "../models/pets.js";
import mongoose from "mongoose";

//Print all the pets
export const getPets = async (req, res) => {
    try {
        //get all the pets and returns success message
        const pets = await Pet.find({});
        res.status(200).json({success : true, data : pets});
    }
    catch (error) {
        //if theres something wrong, it returns an error
        console.error("Error in fetching pets", error.message);
        res.status(500).json({success : false, message : "Server Error"});
    }
};

//Add a pet
export const createPet = async (req, res) => {
    const pet = req.body; //user will send this data
    //check if all the fields are filled, if not ask them to fill
    if(!pet.name || !pet.type || !pet.breed || !pet.age || !pet.image){
        return res.status(400).json( {success : false, message : "Please enter all the fields"});
    }

    //create a new pet
    const newPet = new Pet(pet);
    try {
        //save it in mongodb, then returns success message
        await newPet.save();
        res.status(201).json({success : true, data : newPet, message : "Pet added successfully"});
    }
    catch (error) {
        //if theres something wrong, it returns an error
        console.error("Error in adding pet", error.message);
        res.status(500).json({success : false, message : "Server Error"});
    }
};

//Update a pet
export const updatePet = async(req,res) => {
    //get the id of the pet
    const {id} = req.params;
    const pet = req.body;
    //check if the id is valid, if not return an error
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success : false, message : "Invalid ID"});
    }
    try {
        //try to update the pet, then returns a success message
        const updatedPet = await Pet.findByIdAndUpdate(id, pet, {new : true});
        res.status(200).json({success : true, data : updatedPet, message : "Pet updated successfully"});
    }
    catch (error) {
        //if theres something wrong, it returns an error
        console.error("Error in updating pet", error.message);
        res.status(404).json({success : false, message : "Pet Not Found"});
    } 
};

//Delete A Pet
export const deletePet = async(req,res) => {
    const {id} = req.params;
    
//check if the id is valid
if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({success : false, message : "Invalid ID"});
}

    try {
        await Pet.findByIdAndDelete(id);
        res.status(200).json({success : true, message : "Pet deleted successfully"});
    }
    catch (error) {
        console.error("Error in deleting pet", error.message);
        res.status(500).json({success : false, message : "Server Error"});
    }
};