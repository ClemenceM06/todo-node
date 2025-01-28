const mongoose = require("Mongoose");

const TodoSchema = new mongoose.Schema({
    task:{
        type: String,
        required: true,
    },
});

module.exports = new mongoose.model("Todo", TodoSchema);