//Rutas en el index.js:
//● / GET: Devuelve la aplicación cliente disponible en el apoyo de la prueba.
//● /usuario POST: Recibe los datos de un nuevo usuario y los almacena en PostgreSQL.
//● /usuarios GET: Devuelve todos los usuarios registrados con sus balances.
//● /usuario PUT: Recibe los datos modificados de un usuario registrado y los actualiza.
//● /usuario DELETE: Recibe el id de un usuario registrado y lo elimina .
//● /transferencia POST: Recibe los datos para realizar una nueva transferencia. Se debe
//ocupar una transacción SQL en la consulta a la base de datos.
//● /transferencias GET: Devuelve todas las transferencias almacenadas en la base de datos en formato de arreglo (rowMode: 'array')

//Requerimientos para consultas
//1. Utilizar el paquete pg para conectarse a PostgreSQL y realizar consultas DML para la gestión y persistencia de datos.

//2. Usar transacciones SQL para realizar el registro de las transferencias.

//3. Servir una API RESTful en el servidor con los datos de los usuarios almacenados en PostgreSQL.***

//4. Capturar los posibles errores que puedan ocurrir a través de bloques catch o parámetros de funciones
//callbacks para condicionar las funciones del servidor.

//5. Devolver correctamente los códigos de estado según las diferentes situaciones.***