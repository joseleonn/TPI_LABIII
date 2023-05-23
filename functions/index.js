const functions = require("firebase-functions");
const admin = require("firebase-admin");
// const axios = require("axios");
const cors = require("cors")({
  origin: ["https://localhost:5001", "http://localhost:5173"],
  methods: ["POST"],
  credentials: true,
});

const mercadopago = require("mercadopago");
mercadopago.configure({
  access_token:
    "TEST-8818611751962040-052220-d850d59dfe25089b716ca824a79b84b5-1380596361",
});

admin.initializeApp();
// const db = admin.firestore();

exports.crearIdMdPp = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const listItems = req.body;
    const productosEnviar = listItems.map((item) => {
      return {
        title: item.nombre,
        unit_price: parseFloat(item.precio),
        quantity: item.quanty,
      };
    });

    const preference = {
      items: productosEnviar,
      back_urls: {
        success: "http://localhost:5173/confirmacion",
        failure: "http://localhost:5173/error",
        pending: "http://localhost:5173/",
      },
      auto_return: "approved",
    };

    mercadopago.preferences
      .create(preference)
      .then((response) => {
        console.log("REDIRECT BACKEND: ", response.body);
        res.set("Access-Control-Allow-Origin", "http://localhost:5173");
        res.set("Access-Control-Allow-Methods", "POST");
        res.set("Access-Control-Allow-Headers", "Content-Type");
        res.set("Access-Control-Max-Age", "3600");
        res.set("Access-Control-Allow-Credentials", true);
        console.log("URL: ", response.body.init_point);
        return res.status(200).send({
          id: response.body.id,
          url: response.body.init_point,
          urlSandbox: response.body.sandbox_init_point,
        });
      })
      .catch((error) => {
        console.log("error");
        return res.status(500).send(error);
      });
  });
});
