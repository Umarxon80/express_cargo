import {Currency_type} from "../models/currency_type.js";

export const GetAllCurrency_types = async (req, res) => {
  try {
    const Currency_types = await Currency_type.findAll();

    res.status(200).send({
      message: "All Currency_types",
      data: Currency_types,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting Currency_types" });
  }
};

export const GetOneCurrency_type = async (req, res) => {
  try {
    let { id } = req.params;
    const Currency_types = await Currency_type.findByPk(id);

    res.status(200).send({
      message: "Currency_type",
      data: Currency_types,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting Currency_type" });
  }
};

export const AddCurrency_type = async (req, res) => {
  try {
    const { name, description } = req.body;
    const check = await Currency_type.findOne({ where: { name } });
    if (check) {
      return res.status(403).send({ message: "Such Currency_type already exists" });
    }
    const NewCurrency_type = await Currency_type.create({
      name,
      description,
    });
    res.status(201).send({
      message: "New Currency_type is added",
      data: NewCurrency_type,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error adding Currency_type" });
  }
};

export const PatchCurrency_type = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Currency_type.findOne({ where: { id } });
    if (!check) {
      return res.status(403).send({ message: "Such Currency_type doesn't exists" });
    }
    const fCurrency_type = await Currency_type.update(req.body, {
      where: { id },
      returning: true,
    });
    res.status(201).send({
      message: "Currency_type is updated",
      data: fCurrency_type[1][0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error updating Currency_type" });
  }
};

export const DeleteCurrency_type = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Currency_type.findOne({ where: { id } });
    if (!check) {
      return res.status(403).send({ message: "Such Currency_type doesn't exists" });
    }
    const fCurrency_type = await Currency_type.destroy({
      where: { id },
    });
    res.status(201).send({
      message: "Currency_type is deleted",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error deleted Currency_type" });
  }
};
