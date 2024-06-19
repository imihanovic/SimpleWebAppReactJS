const Producer = require("../models/ProducerModel.js");

const Product = require("../models/ProductModel.js");

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    let producer = await Producer.findById(id);
    res.status(200).json(producer);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    let producers = await Producer.find().sort({ name: 1 });

    res.status(200).json(producers);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const create = async (req, res) => {
  try {
    let producer = new Producer(req.body);
    let added = await producer.save();

    res.status(200).json(added);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    let updated = await Producer.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const products = await Product.find({ producer: id });

    if (products.length > 0) {
      return res
        .status(400)
        .json({ error: "This producer has products and cannot be removed" });
    }
    let producer = await Producer.findOneAndDelete({ _id: id });
    res.status(200).json(producer);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getById,
  getAll,
  create,
  update,
  remove,
};
