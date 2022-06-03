const http = require("http");
// Paso 1
const { agregarUsuario, consultarUsuarios, editarUsuario, eliminarUsuario, realizarTransferencia, registroTransferencia } =

    require("./consultas");
const url = require("url");
// Paso 2
const fs = require("fs");
http
    .createServer(async (req, res) => {
        if (req.url == "/" && req.method === "GET") {
            // Paso 3
            fs.readFile("index.html", "utf8", (err, data) => {
                if (err) {
                    res.statusCode = 500;
                    res.end(html)
                } else {
                    res.setHeader("content-type", "text/html");
                    res.end(data);
                }
            });
        }
        if ((req.url == "/usuario" && req.method == "POST")) {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            req.on("end", async () => {
                // Paso 2
                const datosJson = JSON.parse(body)
                const datos = [
                    datosJson.nombre,
                    datosJson.balance,
                ]
                try {
                    // Paso 3
                    const respuesta = await agregarUsuario(datos);
                    res.statusCode = 201;
                    // Paso 4
                    res.end(JSON.stringify(respuesta));
                } catch (e) {
                    res.statusCode = 500;
                    res.end("Ocurrio un problema con el servidor" + e)
                }
            });
        }
        if (req.url == "/usuarios" && req.method === "GET") {
            try {
                console.log('index.usuarios')
                const usuarios = await consultarUsuarios();
                res.end(JSON.stringify(usuarios));
            } catch (e) {
                res.statusCode = 500;
                res.end("Ocurrio un problema con el servidor" + e)
            }
        }
        if (req.url.startsWith("/usuario") && req.method == "PUT") {
            let body = "";
            let { id } = url.parse(req.url, true).query; //desde aqui sale el id no funciona como el nombre y balance
            req.on("data", (chunk) => {
                body = chunk.toString();
            });
            req.on("end", async () => {
                const datosJson = JSON.parse(body)
                const datosUsuarios = [
                    id, //SIRVE PARA QUE CUANDO SE REALICE LA CONSULTA ESTE DEFINIDO EL ORDEN DE COMO SE ENTREGAN LOS PARAMETROS
                    datosJson.name, // se toma la propiedad segun el html
                    datosJson.balance,
                ]
                try {
                    const result = await editarUsuario(datosUsuarios);
                    res.end(JSON.stringify(result));
                } catch (e) {
                    res.statusCode = 500;
                    res.end("Ocurrio un problema con el servidor" + e)
                }
            });
        }

        if (req.url.startsWith("/usuario?id") && req.method == "DELETE") {
            try {
                let { id } = url.parse(req.url, true).query;
                const respuesta = await eliminarUsuario(id);
                res.end(JSON.stringify(respuesta));
            } catch (e) {
                res.statusCode = 500;
                res.end("Ocurrio un problema con el servidor" + e)
            }
        }

        if ((req.url == "/transferencia" && req.method == "POST")) {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk;
            });
            req.on("end", async () => {
                try {
                    const datosJson = JSON.parse(body) //tiene que concordar con el llamado de las propiedades mas abajo
                    const datos = [
                        datosJson.emisor,
                        datosJson.receptor,
                        datosJson.monto,
                        //new Date(), //al no colocarle nada en parentesis lo arroja solo
                    ]
                    const respuesta = await realizarTransferencia(datos);
                    res.statusCode = 201;
                    res.end(JSON.stringify(respuesta));
                } catch (e) {
                    res.statusCode = 500;
                    res.end("Ocurrio un problema con el servidor" + e)
                }
            });
        }

        if (req.url == "/transferencias" && req.method === "GET") {
            try {
                const registros = await registroTransferencia();
                res.end(JSON.stringify(registros));
            } catch (e) {
                res.statusCode = 500;
                res.end("Ocurrio un problema con el servidor" + e)
            }
        }

    })
    .listen(3000, () => console.log('servidor funcionando correctamente'));