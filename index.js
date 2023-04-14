const express = require("express");
const app = express();
const cookieSession = require("cookie-session");


app.set("view engine", "pug");
app.set("views", "views");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(cookieSession({
  name: 'session',
  secret: "llave-secreta",
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

//MUESTRA LA LISTA DE NOTAS
app.get("/", (req, res) => {
  const notes = req.session.notes || [];
  res.render("index", { notes });
});

//MUESTRA EL FORMULARIO PARA CREAR UNA NOTA
app.get("/notes/new", (req, res) => {
  res.render("new");
});

//GUARDA-CREA UNA NOTA
app.post("/notes", (req, res) => {
  req.session.id = (req.session.id || 0) + 1;
  let id = req.session.id;
  req.session.notes = req.session.notes || [];
  req.session.notes.push({ id: id, title: req.body.title, body: req.body.body});
  res.redirect("/");

});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salio mal");
});

app.listen(3000, () => console.log("Listening on port 3000"));
