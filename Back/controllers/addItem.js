const { createError, savePhoto } = require("../helpers");

const addItem = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();
    const { name, url, price, email } = req.body;

    // console.log(req.body);

    //Si ya existe devolver error
    const [result] = await connection.query(
      `
    SELECT id FROM items WHERE url= ?
    `,
      [url]
    );

    if (result.length > 0) {
      throw createError("Este item ya está siendo trackeado", 400);
    }

    //añadir el item a la lista de items

    const [feedBackInput] = await connection.query(
      `
    INSERT INTO items (name,url,email) VALUES(?,?,?)`,
      [name, url, email]
    );

    const newItemId = feedBackInput.insertId;

    // si hay foto se guarda
    if (req.files && Object.keys(req.files).length === 1) {
      // Guardar la imagen y conseguir el nombre del fichero
      const photoName = await savePhoto(req.files.photo);
      await connection.query(
        `
           UPDATE items SET photo=? WHERE id=?`,
        [photoName, newItemId]
      );
    }

    //añadir la primera actualización

    await connection.query(
      `
    INSERT INTO status (price,date,itemId) VALUES(?,CURDATE(),?)`,
      [Number(price), newItemId]
    );
    res.send({
      status: "ok",
      data: { name, url, initialPrice: price, email },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = addItem;
