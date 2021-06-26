const { createError, savePhoto } = require("../helpers");

const deleteItem = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();
    const { id } = req.params;

    //verificar si existe. En caso de ser así se devuelve un error
    const [search] = await connection.query(
      `
    SELECT id, name FROM items WHERE id= ?
    `,
      [id]
    );
    console.log(search);
    if (search.length === 0) {
      throw createError("Este item NO está siendo trackeado", 400);
    }
    // se eliminan todas las actualizacines de ese item

    await connection.query(
      `
    DELETE FROM status WHERE itemId=?`,
      [id]
    );

    //se elimina de la BBDD

    await connection.query(
      `
    DELETE FROM items WHERE id=?`,
      [id]
    );

    res.send({
      status: "ok",
      data: { ...search[0] },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = deleteItem;
