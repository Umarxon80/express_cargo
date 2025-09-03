import { Admin } from "../models/admin.js";
import { Order } from "../models/order.js";

export const GetAllAdmins = async (req, res) => {
  try {
    const Admins = await Admin.findAll({include:[{model:Order, through:{attributes:[]}}]});

    res.status(200).send({
      message: "All Admins",
      data: Admins,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting Admins" });
  }
};

export const GetOneAdmin = async (req, res) => {
  try {
    let { id } = req.params;
    const Admins = await Admin.findByPk(id);

    res.status(200).send({
      message: "Admin",
      data: Admins,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting Admin" });
  }
};

export const AddAdmin = async (req, res) => {
  try {
    const {full_name,user_name,password,phone_number,email,tg_link,is_creator,is_active,description} = req.body;
    const check = await Admin.findOne({ where: { email } });
    if (check) {
      return res.status(403).send({ message: "Such Admin already exists" });
    }
    const NewAdmin = await Admin.create({
      full_name,
      user_name,
      password,
      phone_number,
      email,
      tg_link,
      is_creator,
      is_active,
      description,
    });
    res.status(201).send({
      message: "New Admin is added",
      data: NewAdmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error adding Admin" });
  }
};

export const PatchAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Admin.findOne({ where: { id } });
    if (!check) {
      return res.status(403).send({ message: "Such Admin doesn't exists" });
    }
    const fAdmin = await Admin.update(req.body, {
      where: { id },
      returning: true,
    });
    res.status(201).send({
      message: "Admin is updated",
      data: fAdmin[1][0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error updating Admin" });
  }
};

export const DeleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Admin.findOne({ where: { id } });
    if (!check) {
      return res.status(403).send({ message: "Such Admin doesn't exists" });
    }
    const fAdmin = await Admin.destroy({
      where: { id },
    });
    res.status(201).send({
      message: "Admin is deleted",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error deleted Admin" });
  }
};

