const express = require("express");
const app = express();
const handlebars = require("express-handlebars");

const Contenedor = require("./contenedor");
let archivo = new Contenedor("./src/productos.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    // eslint-disable-next-line no-undef
    layoutsDir: __dirname + "/views",
    // eslint-disable-next-line no-undef
    partialsDir: __dirname + "/views",
  })
);

app.use(express.static("public"));

app.set("views", "./src/views");
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("form", { layout: "index" });
});

app.listen(8082, () => console.log("Server started on 8082"));

app.post("/productos", async (req, res) => {
  const { body } = req;

  await archivo.saveNewProduct(body);

  res.redirect("/");
});

app.get("/productos", async (req, res) => {
  const productos = await archivo.getAll();

  res.render("productos", {
    layout: "index",
    productos,
  });
});
