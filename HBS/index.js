app.post("/productos", async (req, res) => {
  const { body } = req;

  await contenedor.saveNewProduct(body);

  res.redirect("/");
});

const handlebars = require("express-handlebars");

app.set("view engine", "hbs");

app.engine(
  "hbs",

  handlebars({
    layoutsDir: __dirname + "/views",
    extname: "hbs",

    defaultLayout: "layoutFrame",
  })
);

app.get("/", (req, res) => {
  res.render("bodyForm", { layout: "layoutFrame" });
});

app.get("/productos", async (req, res) => {
  const productos = await contenedor.getAll();

  res.render("bodyProducts", {
    layout: "layoutFrame",
    productos,
  });
});
