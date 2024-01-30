const mongoose = require("mongoose");

const chatmodel = mongoose.Schema({
  chatName: {
    typeof: { type: "string", trim: true },
    isgroupchat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestmessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupadmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
},
{
timeStamps:true
}
);

const chat = mongoose.model("chat",chatmodel)
module.exports = chat