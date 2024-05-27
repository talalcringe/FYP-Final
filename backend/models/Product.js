const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  eqpt_id: {
    type: Number,
    required: true,
    unique: true,
  },
  eqpt_category: {
    type: String,
    required: true,
  },
  eqpt_subcategory: {
    type: String,
    required: true,
  },
  serial_no: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  warranty: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  techspec: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
    required: true,
  },
  dop: {
    type: Date,
    required: true,
  },
  vendor: {
    type: String,
    required: true,
  },
  fund: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum:['normal','proc'],
    required: true,
  },
  creator_department: {
    type: String,
    required: true,
  },
  accessibleTo: {
    type: [{
      department: {
        type: String,
        required: true,
      },
      eqpt_id:{
        type:String,
        required:true
      },
      quantity: {
        type: Number,
        required: true,
      },
    }],
    default: [],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
