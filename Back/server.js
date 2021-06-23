require("dotenv").config();
const express = require("express");
const morgan = require("morgan"); // Solo modo developer
// const bodyParser = require("body-parser"); Obsoleto
const fileUpload = require("express-fileupload");
const { PORT } = process.env;
const getDB = require("./db");
const cors = require("cors");
const path = require("path");

// #################################################################
// #             Importamos controllers y middlewares              #
// #################################################################
const {
  createTask,
  deleteTask,
  deleteAllCheckedTasks,
  editTask,
  filterTasks,
  listTypesByUSer,
  sendTask,
  shareTask,
  kickOut,
} = require("./controllers/tasks");

const {
  createUser,
  loginUser,
  validateUser,
  editUser,
  validateEmail,
  editPassword,
  getMemberList,
} = require("./controllers/users");
const {
  isAuthorized,
  ifTaskExists,
  isUser,
  isMember,
  ifInvitedUserExist,
  isCreator,
} = require("./middlewares");

// #################################################################
// #                      Configuramos express                     #
// #################################################################

// Creamos la app de express
const app = express();
// Guardamos db en el local de express
app.locals.getDB = getDB;
// Body parser (body en JSON)
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// app.use(bodyParser.json());
// Cors (permite peticiones externas)
app.use(cors());

//Archivos estaticos (habilitar carpeta uploads)
app.use(express.static(path.join(__dirname, "uploads")));
// Body parser (multipart form data <- subida de imágenes)
app.use(fileUpload());
// Logger (solo se empleará durante el desarrollo)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// #############################################################
// #                     Endpoints de task                     #
// #############################################################
//GET - Petición para añadir una
//URL ejemplo: http://localhost:3000/tasks
app.post("/tasks", isAuthorized, createTask);

// #################################################################
// #                 Endpoints not found y error                   #
// #################################################################

// Middleware de error
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

// Middleware de 404
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not found",
  });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT} 🚀`);
});
