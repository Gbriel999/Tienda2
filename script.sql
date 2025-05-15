CREATE TABLE usuarios (id SERIAL, email VARCHAR(50) NOT NULL, password VARCHAR(60) NOT NULL);

CREATE TABLE juegos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  precio INT NOT NULL,
  stock INT NOT NULL
);
