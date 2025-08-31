import {Status} from "../models/status.js";

export const GetAllstatuses = async (req, res) => {
  try {
    const statuss = await Status.findAll();

    res.status(200).send({
      message: "All statuses",
      data: statuss,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting statuses" });
  }
};

export const GetOnestatus = async (req, res) => {
  try {
    let { id } = req.params;
    const statuss = await Status.findByPk(id);

    res.status(200).send({
      message: "status",
      data: statuss,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting status" });
  }
};

export const Addstatus = async (req, res) => {
  try {
    const { name, description } = req.body;
    const check = await Status.findOne({ where: { name } });
    if (check) {
      return res.status(403).send({ message: "Such status already exists" });
    }
    const Newstatus = await Status.create({
      name,
      description,
    });
    res.status(201).send({
      message: "New status is added",
      data: Newstatus,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error adding status" });
  }
};

export const Patchstatus = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Status.findOne({ where: { id } });
    if (!check) {
      return res.status(403).send({ message: "Such status doesn't exists" });
    }
    const fstatus = await Status.update(req.body, {
      where: { id },
      returning: true,
    });
    res.status(201).send({
      message: "status is updated",
      data: fstatus[1][0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error updating status" });
  }
};

export const Deletestatus = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Status.findOne({ where: { id } });
    if (!check) {
      return res.status(403).send({ message: "Such status doesn't exists" });
    }
    const fstatus = await Status.destroy({
      where: { id },
    });
    res.status(201).send({
      message: "status is deleted",
      data: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error deleted status" });
  }
};
