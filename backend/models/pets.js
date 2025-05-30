import mongoose from "mongoose";

const petsSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true
    },
    breed : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    image : {
        type : String,
        required : true
    },
}, {
    timestamps : true
});

const Pets = mongoose.model('Pet', petsSchema);
export default Pets;