const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Por favor coloque o nome do produto!"],
  },
  description: {
    type: String,
    required: [true, "Por favor coloque a descrição do produto!"],
  },
  category: {
    type: String,
    required: [true, "Por favor coloque a categoria do produto!"],
  },
  operation:{
    type: String,
    required: [true, "Por favor coloque a operaçao do produto!"],
  },
  tags: {
    type: String,
  },
  tradeFor: {
    type: String,
  },
  originalPrice: {
    type: Number,
  }, 
  author: {
    type: String,
  },
  publisher: {
    type: String,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);