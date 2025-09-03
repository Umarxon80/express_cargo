import { Admin } from "../models/admin.js";
import { Operation } from "../models/operation.js";
import { Order } from "../models/order.js";

export const GetAllOperations = async (req, res) => {
  try {
    const Operations = await Operation.findAll({
      include: [
        {
          model: Admin,
          required: true, // false outer join , true left join
        },
        {
          model: Order,
          required: true, // false outer join , true left join
        },
      ],
    });
    res.status(200).send({
      message: "All Operations",
      data: Operations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting Operations" });
  }
};

export const GetOneOperation = async (req, res) => {
  try {
    let { id } = req.params;
    const Operations = await Operation.findByPk(id);
    res.status(200).send({
      message: "Operation",
      data: Operations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting Operation" });
  }
};

export const AddOperation = async (req, res) => {
  try {
    const { operation_date, desc, adminId, orderId } = req.body;
    const NewOperation = await Operation.create({
      operation_date,
      desc,
      adminId,
      orderId,
    });
    res.status(201).send({
      message: "New Operation is added",
      data: NewOperation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error adding Operation" });
  }
};

export const PatchOperation = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Operation.findOne({ where: { id } });
    if (!check) {
      return res.status(403).send({ message: "Such Operation doesn't exists" });
    }
    const fOperation = await Operation.update(req.body, {
      where: { id },
      returning: true,
    });
    res.status(201).send({
      message: "Operation is updated",
      data: fOperation[1][0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error updating Operation" });
  }
};

export const DeleteOperation = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Operation.findOne({ where: { id } });
    if (!check) {
      return res.status(403).send({ message: "Such Operation doesn't exists" });
    }
    const fOperation = await Operation.destroy({
      where: { id },
    });
    res.status(201).send({
      message: "Operation is deleted",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error deleted Operation" });
  }
};
