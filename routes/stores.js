var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const { ensureUserLoggedIn } = require("../middleware/guards");

// join to JSON
function joinToJson(results) {
  // Get first row
  let row0 = results.data[0];

  // Create array of product objs
  let products = [];
  if (row0.productsID) {
    products = results.data.map((p) => ({
      id: p.productsID,
      productName: p.productName,
      price: p.price,
      quantity: p.quantity,
      quantityUnits: p.quantityUnits,
      productImage: p.productImage,
      productPrice: p.productPrice,
    }));
  }

  // Create store obj returning all the product each store has
  let stores = {
    id: row0.storesID,
    storeName: row0.storeName,
    storeAddress: row0.storeAddress,
    storeCity: row0.storeCity,
    storeCountry: row0.storeCountry,
    storePostalCode: row0.storePostalCode,
    storeImage: row0.storeImage,
    products,
  };

  return stores;
}

// GET store list
router.get("/", async function (req, res, next) {
  try {
    const results = await db("SELECT * FROM stores;");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET one store
// contains the joins to show products that are found at a given store
router.get("/:id", async function (req, res, next) {
  let { id } = req.params;

  try {
    // DO NOT USE THE ID
    let results = await db(`
    SELECT stores.ID as storesID, products.ID as productsID, stores.*, products.*, products_stores.productPrice
    FROM stores
    LEFT JOIN products_stores ON stores.ID = products_stores.FK_storesID
    LEFT JOIN products ON products_stores.FK_productsID = products.ID
    WHERE stores.ID = ${id}
    `);
    // res.status(201).send(results.data);
    let stores = await results;
    stores = joinToJson(stores);
    if (stores.length === 0) {
      res.status(404).send({ error: "This store does not exist" });
    } else {
      res.send(stores);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// INSERT a new store into the DB
router.post("/", async function (req, res) {
  let {
    storeName,
    storeAddress,
    storeCity,
    storeCountry,
    storePostalCode,
    storeImage,
    blackOwned,
    localOwned,
  } = req.body;
  try {
    await db(`INSERT INTO stores (storeName, storeAddress, storeCity, storeCountry, storePostalCode, storeImage, blackOwned, localOwned) VALUES
  ('${storeName}', '${storeAddress}', '${storeCity}', '${storeCountry}', '${storePostalCode}', '${storeImage}', ${blackOwned}, ${localOwned});`);
    // then return the list of stores
    const results = await db(`SELECT * FROM stores`);
    // message number 201 means 'new resource created'
    res.status(201).send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
module.exports = router;
