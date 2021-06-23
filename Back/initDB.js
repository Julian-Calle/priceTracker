require("dotenv").config();
const getDB = require("./db.js");
const fs = require("fs").promises;

if (process.env.NODE_ENV !== "development") process.exit();

let connection;

async function main() {
  try {
    connection = await getDB();

    // borrar tablas si existen
    console.log("****************************");
    console.log("* Borrando tablas antiguas *");
    console.log("****************************");
    await connection.query(`DROP TABLE IF EXISTS items`);
    console.log("Tabla de items eliminada");
    await connection.query(`DROP TABLE IF EXISTS status`);
    console.log("Tabla de status eliminada");

    //leer script sql
    console.log("Leyendo BBDD");
    const sqlScript = await (
      await fs.readFile("./BBDD/scriptBBDD.sql")
    ).toString();
    await connection.query(sqlScript);

    console.log("**********************************************************");
    console.log("* BBDD cargado, iniciando creación de datos... *");
    console.log("**********************************************************");

    await connection.query(`
INSERT INTO users (name,email,password,verified)
VALUES 
    ("Juliano","jcallecristancho@gmail.com",SHA2("1234",512),1),
    ("Vira","ubeiram@gmail.com",SHA2("1234",512),1),
    ("Raulinux","raulzc3@gmail.com",SHA2("1234",512),1)
    `);

    await connection.query(`
INSERT INTO tasks (task, checked, userId, color,type)
VALUES 
("ir a morfar", 0, 1, "blue","Urgente"),
("ir a cambiarme la napia", 0, 3, "red","Bromas")
`);

    await connection.query(`
INSERT INTO tasks (task, checked, userId)
VALUES 
("ir a dar clase", 0, 2)
`);

    await connection.query(`
INSERT INTO membersList (taskId, userId)
VALUES (1,1),(2,2),(3,3)
`);

    //añadir valores a tablas
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

main();
