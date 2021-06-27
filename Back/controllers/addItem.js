const { createError, savePhoto } = require("../helpers");

const nightmare = require("nightmare")();
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const request = require("request");
const uuid = require("uuid");
const fs = require("fs");

const addItem = async (req, res, next) => {
  let connection;
  let itemPrice;
  let itemName;
  let itemPhotoUrl;
  const savedImageName = `${uuid.v4()}.jpg`;
  try {
    connection = await req.app.locals.getDB();
    const { url, email } = req.body;

    // console.log(req.body);

    // Si ya existe devolver error
    const [result] = await connection.query(
      `
    SELECT id FROM items WHERE url= ?
    `,
      [url]
    );

    if (result.length > 0) {
      throw createError("Este item ya está siendo trackeado", 400);
    }
    //hacemos web scrapping buscando al precio, el nombre y la foto del item de la url
    request(url, async (err, resp, body) => {
      if (!err && resp.statusCode === 200) {
        const $ = cheerio.load(body);
        $("meta[itemprop ='price']", ".price-and-availability").each(
          function () {
            itemPrice = $(this).attr("content");
            console.log(itemPrice);
          }
        );

        $("h1[itemprop ='name']", ".rs-prod-headline").each(function () {
          itemName = $(this).html();
          console.log(itemName);
        });

        $("img", ".prod-media-spot-container").each(function () {
          itemPhotoUrl = $(this).attr("src");
          console.log(itemPhotoUrl);

          request(itemPhotoUrl).pipe(
            fs.createWriteStream(`./uploads/${savedImageName}`)
          );
        });
      }
      //añadir el item a la lista de items

      const [feedBackInput] = await connection.query(
        `
      INSERT INTO items (name,url,email) VALUES(?,?,?)`,
        [itemName, url, email]
      );

      const newItemId = feedBackInput.insertId;

      // // si hay foto se guarda
      // if (req.files && Object.keys(req.files).length === 1) {
      //   // Guardar la imagen y conseguir el nombre del fichero
      //   const photoName = await savePhoto(req.files.photo);
      //   await connection.query(
      //     `
      //        UPDATE items SET photo=? WHERE id=?`,
      //     [savedImageName, newItemId]
      //   );
      // }

      // añadir la primera actualización

      await connection.query(
        `
      INSERT INTO status (price,date,itemId) VALUES(?,CURDATE(),?)`,
        [Number(itemPrice), newItemId]
      );
      res.send({
        status: "ok",
        data: { name: itemName, price: itemPrice, email, url: itemPhotoUrl },
      });
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = addItem;
