const functions = require("firebase-functions");
const admin = require("firebase-admin");
// const axios = require("axios");
const cors = require("cors")({
  origin: ["https://tpi-labiii.vercel.app"],
  methods: ["POST"],
  credentials: true,
});

const mercadopago = require("mercadopago");
const {default: axios} = require("axios");
mercadopago.configure({
  access_token:
    "TEST-8818611751962040-052220-d850d59dfe25089b716ca824a79b84b5-1380596361",
});

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://tpilab33.firebaseio.com",
});
const db = admin.firestore();

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
        success: "https://tpi-labiii.vercel.app/confirmacion",
        failure: "https://tpi-labiii.vercel.app/error",
        pending: "https://tpi-labiii.vercel.app",
      },
      auto_return: "approved",
    };

    mercadopago.preferences
        .create(preference)
        .then((response) => {
          console.log("REDIRECT BACKEND: ", response.body);
          res.set("Access-Control-Allow-Origin", "https://tpi-labiii.vercel.app");
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

exports.crearPagoMP = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const paymentIDFront = req.body.payment_id;
    const statusFront = req.body.status;
    axios
        .get(
            `https://api.mercadopago.com/v1/payments/${paymentIDFront}?access_token=TEST-8818611751962040-052220-d850d59dfe25089b716ca824a79b84b5-1380596361`,
        )
        .then((response) => {
          console.log(paymentIDFront, "====", response.data.id);
          console.log(statusFront, "===", response.data.status);

          if (
            paymentIDFront === response.data.id.toString() &&
          statusFront === response.data.status
          ) {
            console.log("son iguales");
            const coleccion = "Usuarios";
            const subColeccion = "Pedidos";
            const cartDB = req.body.cartDB;
            const idClient = cartDB[0].idClient;
            console.log("ID CLIENTE");
            console.log(cartDB);
            console.log(idClient);
            console.log(" FIN ID CLIENTE");
            return db
                .collection(coleccion)
                .doc(idClient)
                .collection(subColeccion)
                .add({
                  Total: cartDB[0].cartTotal,
                  Products: cartDB[0].items,
                  // Adress: cartDB.adress,
                  Date: new Date(),
                  idClient: idClient,
                  // Name: cartDB.name,
                  // subname: cartDB.subname,
                  // email: cartDB.email,
                  // tel: cartDB.tel,
                  status: "pedido",
                  OrderNum: "00" + Date.now(),
                })
                .then(() => {
                  return db
                      .collection(coleccion)
                      .doc(idClient)
                      .collection("Carrito")
                      .doc(idClient)
                      .delete()
                      .then(() => {
                        res.set(
                            "Access-Control-Allow-Origin",
                            "https://tpi-labiii.vercel.app",
                        );

                        res.set("Access-Control-Allow-Methods", "POST");
                        res.set("Access-Control-Allow-Headers", "Content-Type");
                        res.set("Access-Control-Max-Age", "3600");
                        res.set("Access-Control-Allow-Credentials", true);
                        return res.status(200).send({
                          data: true,
                        });
                      })
                      .catch((error) => {
                        console.log("Error al agregar el pedido", error);
                        res.status(500).send("Error al agregar el pedido");
                      });
                })
                .catch((error) => {
                  console.log("Error al agregar el pedido", error);
                  res.status(500).send("Error al agregar el pedido");
                });
          } else {
            console.log("Los datos no coinciden");
            res.status(400).send("Los datos no coinciden");
          }
        })
        .catch((error) => {
          console.log("Error al obtener el pago de MercadoPago", error);
          res.status(500).send("Error al obtener el pago de MercadoPago");
        });
  });
});
