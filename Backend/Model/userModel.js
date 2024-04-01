const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        email: { type: "String", unique: true, required: true },
        name: { type: "String", unique: true, required: true },
        descriptor: { type: [Number], required: true },
    },
    { timestaps: true }
);


const User = mongoose.model("User", userSchema);

module.exports = User;