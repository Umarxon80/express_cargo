import { Op, Sequelize } from "sequelize";
import { Client } from "../models/client.js";
import { Order } from "../models/order.js";
import { Operation } from "../models/operation.js";
import { Status } from "../models/status.js";

export const Search1 =async(req,res)=>{
    try {
        const Clients = await Client.findAll({
            include: [{
              model: Order,
            }],
            where: {
              full_name: {[Op.like]: 'B%'}
            },
          });
        let narr=[]
        Clients.forEach(e => {
            if (e.orders.length>10) {
                narr.push(e)
            }
        });
        res.status(200).send({
          message: "All Clients",
          data: narr,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Error getting Clients" });
      }
}

export const Search2 =async(req,res)=>{
    try {
        const Operations = await Operation.findAll({
            include: [{
              model: Status,
              where:{
                name:"Mijozga yetkazildi"
              }
            }],
          });
        res.status(200).send({
          message: "All Operations",
          data: Operations,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Error getting Clients" });
      }
}


export const Search3 =async(req,res)=>{
    try {
        const Clients = await Client.findAll({
            include: [{
              model: Order,
            }],
            include: [{
                model: Order,
                attributes: []
            }],
            group: ['Client.id'],
            order: [[Sequelize.literal('orderCount'), 'DESC']], 
            limit: 5
          });
        res.status(200).send({
          message: "All Clients",
          data: Clients,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Error getting Clients" });
      }
}