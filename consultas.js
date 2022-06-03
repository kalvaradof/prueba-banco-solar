const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "holahola",
    port: 5432,
    // Paso 1
    database: "bancosolar",
});

const agregarUsuario = async (datos) => {
    // Paso 3
    const insertar = {
        text: "INSERT INTO usuarios (nombre, balance) values  ($1, $2)", //sacarle el $ al balance?
        values: datos,
    };
    try {
        const resultado = await pool.query(insertar);
        return resultado;
    } catch (error) {
        // Paso 4
        console.log(error.code);
        return error;
    }
};
const consultarUsuarios = async () => {
    // Paso 2
    console.log('consultas.consultarUsuarios')
    try {
        const result = await pool.query("SELECT * FROM usuarios")
        return result.rows
    } catch (error) {
        // Paso 3
        console.log(error.code)
        return error
    }
}
const editarUsuario = async (datos) => {
    // Paso 2
    const consulta = {
        text: `UPDATE usuarios SET nombre = $2, balance = $3 WHERE id = $1 RETURNING *`,
        values: datos,
    };
    // Paso 3
    try {
        const result = await pool.query(consulta);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}
const eliminarUsuario = async (id) => {
    try {
        const result = await pool.query(
            `DELETE FROM usuarios WHERE id = ${id}`
        );
        return result;
    } catch (error) {
        console.log(error.code);
        return error;
    }
};
const realizarTransferencia = async (datos) => {
    const transferir = {
        text: `INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3, NOW()) RETURNING *`,
        values: datos
    };

    const datoEmisor = {
        text: `UPDATE usuarios SET balance = balance - $1 WHERE id = $2 RETURNING * `,//los dolares van en funcion con el orden del values
        values: [Number(datos[2]), (datos[0])],// monto=2 id emisor=0
    };
    const datoReceptor = {
        text: `UPDATE usuarios SET balance = balance + $1 WHERE id = $2 RETURNING * `,//la numeracion es concordante con el 1er elemento de la pp values
        values: [Number(datos[2]), (datos[1])],// 2=monto y 1= id receptor
    }
    try {
        await pool.query("BEGIN");
        await pool.query(transferir)
        await pool.query(datoEmisor);
        await pool.query(datoReceptor);
        await pool.query("COMMIT")
    } catch (e) {
        await pool.query("ROLLBACK");
        trhow(e);
    };
};

const registroTransferencia = async () => {
    const consulta = {
        text: `SELECT * FROM transferencias`,
        rowMode: "array",
    }
    try {
        const result = await pool.query(consulta)
        return result.rows
    } catch (error) {
        console.log(error.code)
        return error
    };
};
module.exports = { agregarUsuario, consultarUsuarios, editarUsuario, eliminarUsuario, realizarTransferencia, registroTransferencia }


//Rutas :
//● / GET: Devuelve la aplicación cliente disponible en el apoyo de la prueba.
//● /usuario POST: Recibe los datos de un nuevo usuario y los almacena en PostgreSQL.
//● /usuarios GET: Devuelve todos los usuarios registrados con sus balances.
//● /usuario PUT: Recibe los datos modificados de un usuario registrado y los actualiza.
//● /usuario DELETE: Recibe el id de un usuario registrado y lo elimina .
//● /transferencia POST: Recibe los datos para realizar una nueva transferencia. Se debe
//ocupar una transacción SQL en la consulta a la base de datos.
//● /transferencias GET: Devuelve todas las transferencias almacenadas en la base de datos en formato de arreglo (rowMode: 'array')

//Requerimientos
//1. Utilizar el paquete pg para conectarse a PostgreSQL y realizar consultas DML para la gestión y persistencia de datos.

//2. Usar transacciones SQL para realizar el registro de las transferencias.

//3. Servir una API RESTful en el servidor con los datos de los usuarios almacenados en PostgreSQL.***

//4. Capturar los posibles errores que puedan ocurrir a través de bloques catch o parámetros de funciones
//callbacks para condicionar las funciones del servidor.

//5. Devolver correctamente los códigos de estado según las diferentes situaciones.***
