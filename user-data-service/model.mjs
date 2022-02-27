import mongoose from "mongoose";

const ProfileModel = mongoose.model("Profile", new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    history: {type: Array, required: false}
}));

const getUserData = async (filter) => {
    const user = await ProfileModel.findOne(filter);
    if (!user) {
        throw({error : "Not Found"})
    } 
    return user;
}

const createUserData = async (name, email) => {

    const existing = await ProfileModel.findOne({email});
    if (existing) {
        throw({error: "User Exists"})
    }
    const data = []
    const user = await ProfileModel.create({
        name,
        email,
        data
    });
    return user;
}

const addUserHistory = async (email, data) => {
    const result = await ProfileModel.updateOne({email}, {"$addToSet" : {"history" : data}});
    console.log(result);
    if (result.modifiedCount  > 0) return true;
    throw({error: "User not found/or data allready exists."})
}

export {ProfileModel, getUserData, createUserData, addUserHistory};