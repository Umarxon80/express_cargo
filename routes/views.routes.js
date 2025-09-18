import { Router } from "express";
import { createViewPage } from "../helpers/create.view.page.js";

const router = Router();

router.get("/", (req, res) => {
  res.render(createViewPage("index"), 
  { 
    title: "Asosiy sahifa",
    isHome: true, //meny activation
    });
});

router.get("/admin", (req, res) => {
    res.render(createViewPage("admin"), 
    { 
      title: "Admin sahifa",
      isAdmin: true, //meny activation
      });
  });

  router.get("/order", (req, res) => {
    res.render(createViewPage("order"), 
    { 
      title: "Order sahifa",
      isOrder: true, //meny activation
      });
  });
  router.get("/oper", (req, res) => {
    res.render(createViewPage("oper"), 
    { 
      title: "Operation sahifa",
      isOper: true, //meny activation
      });
  });
  router.get("/login", (req, res) => {
    res.render(createViewPage("login"), 
    { 
      title: "Login sahifa",
      isLogin: true, //meny activation
      });
  });
export default router;
