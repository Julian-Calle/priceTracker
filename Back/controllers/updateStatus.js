const updateStatus = async (req, res, next) => {
  let connection;
  try {
    connection = await req.app.locals.getDB();
    const { user_id } = req.params;
    const { price, id } = req.query;
    //se compara el nuevo precio con los anteriores
    // en caso de que el nuevo precio sea el menor de todos s eenvia un corre notificandolo

    //se actualiza el status del item segun el id enviado
    const [result] = await connection.query(
      `
      INSERT INTO status (price, date,itemId) VALUES (?,CURDATE(),?)
      `,
      [price, id]
    );
    res.send({
      status: "ok",
      data: "test",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = updateStatus;
