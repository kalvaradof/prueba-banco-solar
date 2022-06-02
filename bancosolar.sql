CREATE DATABASE bancosolar;
-- \c bancosolar

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY, 
    nombre VARCHAR(50),
    balance FLOAT CHECK (balance >= 0)
);

CREATE TABLE transferencias (
    id SERIAL PRIMARY KEY, 
    emisor INT, 
    receptor INT, 
    monto FLOAT, 
    fecha TIMESTAMP, 
    FOREIGN KEY (emisor) REFERENCES usuarios(id), 
    FOREIGN KEY (receptor) REFERENCES usuarios(id)
    );

INSERT INTO usuarios (nombre, balance) values ('Pedro Rivas', 20000);
INSERT INTO usuarios (nombre, balance) values ('Luis Vallejo', 40000)
INSERT INTO usuarios (nombre, balance) values ('Erwin Fierro', 50000)
INSERT INTO usuarios (nombre, balance) values ('C±emente Riesco', 80000)
INSERT INTO usuarios (nombre, balance) values ('Hermina Lopez', 70000)

SELECT * FROM usuarios;

BEGIN TRANSACTION;
INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES (2, 1, 60000, 25/01/2021 10:00);
UPDATE usuarios SET balance = balance - 60000 WHERE id = 2;
COMMIT
INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES (1, 2, 20000, 25/01/2021 13:15);
UPDATE usuarios SET balance = balance - 20000 WHERE id = 1;
COMMIT
INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES (2, 1, 30000, 25/01/2021 17:25);
UPDATE usuarios SET balance = balance - 30000 WHERE id = 2;
COMMIT
INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES (1, 2, 10000, 25/01/2021 21:04);
UPDATE usuarios SET balance = balance - 10000 WHERE id = 1;
COMMIT
INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES (3, 4, 20000, 25/04/2021 20:04);
UPDATE usuarios SET balance = balance - 20000 WHERE id = 3;
COMMIT
INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES (5, 4, 30000, 12/05/2021 10:09);
UPDATE usuarios SET balance = balance - 30000 WHERE id = 5;
COMMIT

SELECT * FROM transferencias;