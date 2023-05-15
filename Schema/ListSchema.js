const mongoose = require("mongoose");

const ListSchema = mongoose.Schema({
    item: String,
    status: { type: String, default: "Pending"}
});

module.exports = mongoose.model("Item", ListSchema);