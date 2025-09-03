import { Op } from "sequelize";
import { Admin } from "../models/admin.js";
import { Client } from "../models/client.js";
import { Order } from "../models/order.js";

export const GetAllOrders = async (req, res) => {
  try {
    const Orders = await Order.findAll(
    { include: [
            {
                model:Client,
                required:true,// false outer join , true left join
                attributes:["full_name"]
            },
            {
                model:Admin,
                through:{attributes:[]}
            }
        ],
    });
    res.status(200).send({
      message: "All Orders",
      data: Orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting Orders" });
  }
};

export const GetOneOrder = async (req, res) => {
  try {
    let { id } = req.params;
    const Orders = await Order.findByPk(id,{include:Client});

    res.status(200).send({
      message: "Order",
      data: Orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting Order" });
  }
};

export const AddOrder = async (req, res) => {
  try {
    const { product_link, quantity, sum, truck, desc, clientId } = req.body;
    const check = await Order.findOne({ where: { clientId } });
    if (check) {
      return res.status(403).send({ message: "Such Order already exists" });
    }
    const NewOrder = await Order.create({
      product_link,
      quantity,
      sum,
      truck,
      desc,
      clientId,
    });
    res.status(201).send({
      message: "New Order is added",
      data: NewOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error adding Order" });
  }
};

export const PatchOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Order.findOne({ where: { id } });
    if (!check) {
      return res.status(403).send({ message: "Such Order doesn't exists" });
    }
    const fOrder = await Order.update(req.body, {
      where: { id },
      returning: true,
    });
    res.status(201).send({
      message: "Order is updated",
      data: fOrder[1][0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error updating Order" });
  }
};

export const DeleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Order.findOne({ where: { id } });
    if (!check) {
      return res.status(403).send({ message: "Such Order doesn't exists" });
    }
    const fOrder = await Order.destroy({
      where: { id },
    });
    res.status(201).send({
      message: "Order is deleted",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error deleted Order" });
  }
};

