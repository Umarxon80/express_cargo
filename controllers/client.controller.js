import { Client } from "../models/client.js";

export const GetAllClients = async (req, res) => {
  try {
    const Clients = await Client.findAll();

    res.status(200).send({
      message: "All Clients",
      data: Clients,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting Clients" });
  }
};

export const GetOneClient = async (req, res) => {
  try {
    let { id } = req.params;
    const Clients = await Client.findByPk(id);

    res.status(200).send({
      message: "Client",
      data: Clients,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error getting Client" });
  }
};

export const AddClient = async (req, res) => {
  try {
    const { full_name, phone_number, email, address, location } = req.body;
    const check = await Client.findOne({ where: { email } });
    if (check) {
      return res.status(403).send({ message: "Such Client already exists" });
    }
    const NewClient = await Client.create({
      full_name,
      phone_number,
      email,
      address,
      location,
    });
    res.status(201).send({
      message: "New Client is added",
      data: NewClient,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error adding Client" });
  }
};

export const PatchClient = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await Client.findOne({ where: { id } });
    if (!check) {
      return res.status(403).send({ message: "Such Client doesn't exists" });
    }
    const fClient = await Client.update(req.body, {
      where: { id },
      returning: true,
    });
    res.status(201).send({
      message: "Client is updated",
      data: fClient[1][0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error updating Client" });
  }
};


export const DeleteClient = async (req, res) => {
    try {
      const { id } = req.params;
      const check = await Client.findOne({ where: { id } });
      if (!check) {
        return res.status(403).send({ message: "Such Client doesn't exists" });
      }
      const fClient = await Client.destroy( {
        where: { id },
      });
      res.status(201).send({
        message: "Client is deleted",
        data: id,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Error deleted Client" });
    }
  };