const express = require("express");
const app = express();

const Contenedor = require("./contenedor");
let archivo = new Contenedor("./src/productos.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("form.ejs", {});
});

app.listen(8080, () => console.log("Server started on 8080"));

app.post("/productos", async (req, res) => {
  const { body } = req;

  await archivo.saveNewProduct(body);

  res.redirect("/");
});

app.get("/productos", async (req, res) => {
  const productos = await archivo.getAll();

  res.render("productos.ejs", {
    productos,
  });
});
