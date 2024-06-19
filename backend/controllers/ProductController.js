const Product = require("../models/ProductModel.js");
const Producer = require("../models/ProducerModel.js");

const getAllProducts = async (req, res) => {
  try {
    let products = await Product.find({}).populate({
      path: "producer",
      model: Producer,
      select: "name",
    });

    products = products.sort((a, b) =>
      a.producer.name.localeCompare(b.producer.name)
    );

    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    let product = await Product.findById(id).populate("producer");
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    let product = await Product.findOneAndDelete({ _id: id });
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    let updated = await Product.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    let product = new Product(req.body);
    let added = await product.save();
    res.status(200).json(added);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getById,
  remove,
  update,
  create,
};
