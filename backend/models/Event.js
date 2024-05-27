const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    parent: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    unresolvedCRequests: {
      type: [
        {
          uid: {
            type: String,
            required: true,
          },
          eqpt_id: {
            type: String,
            required: true,
          },
          department:{
            type:String,
            required:true
          },
          quantity: {
            type: String,
            required: true,
          },
          date: {
            type: Date,
            required: true,
          },
        }
      ],
      default: []
    },
    resolvedCRequests: {
      type: [
        {
          uid: {
            type: String,
            required: true,
          },
          eqpt_id: {
            type: String,
            required: true,
          },
          quantity: {
            type: String,
            required: true,
          },
          department:{
            type:String,
            required:true
          },
          date: {
            type: Date,
            required: true,
          },
          comments: {
            type: String,
            required: true,
          }
        }
      ],
      default: []
    },
    unresolvedRRequests: {
      type: [
        {
          uid: {
            type: String,
            required: true,
          },
          eqpt_id: {
            type: String,
            required: true,
          },
          quantity: {
            type: String,
            required: true,
          },
          department:{
            type:String,
            required:true
          },
          date: {
            type: Date,
            required: true,
          },
        }
      ],
      default: []
    },
    resolvedRRequests: {
      type: [
        {
          uid: {
            type: String,
            required: true,
          },
          eqpt_id: {
            type: String,
            required: true,
          },
          quantity: {
            type: String,
            required: true,
          },
          department:{
            type:String,
            required:true
          },
          date: {
            type: Date,
            required: true,
          },
          comments: {
            type: String,
            required: true,
          }
        }
      ],
      default: []
    },
    unresolvedDRequests: {
      type: [
        {
          uid: {
            type: String,
            required: true,
          },
          eqpt_name: {
            type: String,
            required: true,
          },
          quantity: {
            type: String,
            required: true,
          },
          department:{
            type:String,
            required:true
          },
          date: {
            type: Date,
            required: true,
          },
        }
      ],
      default: []
    },
    resolvedDRequests: {
      type: [
        {
          uid: {
            type: String,
            required: true,
          },
          eqpt_name:{
            type:String,
            required:true,
          },
          eqpt_id: {
            type: String,
            required: true,
          },
          quantity: {
            type: String,
            required: true,
          },
          date: {
            type: Date,
            required: true,
          },
          department:{
            type:String,
            required:true
          },
          comments: {
            type: String,
            required: true,
          }
        }
      ],
      default: []
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", EventSchema);
