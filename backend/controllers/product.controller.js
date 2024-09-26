import Product from "../model/product.model.js";
import mongoose from "mongoose";
export const getallproducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(`error in get all product : ${error.message}`);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

export const updateproduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }
  try {
    const updatedproduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    if (!updatedproduct) {
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    }
    return res.status(200).json({ success: true, product: updatedproduct });
  } catch (error) {
    console.log(`error in update product : ${error.message}`);
    res.status(505).json({ success: false, message: "internal server error" });
  }
};

export const deleteproduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }
  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "products deleted successfuly" });
  } catch (error) {
    console.log(`error in delete product : ${error.message}`);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

export const createproduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all fields" });
  }
  const newProduct = new Product(product);
  console.log(product);

  try {
    await newProduct.save();
    res.status(202).json({ success: true, data: newProduct });
  } catch (error) {
    console.log(`error in create product : ${error.message}`);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};
