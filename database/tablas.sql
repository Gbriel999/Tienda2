CREATE table USUARIOS(
  id        SERIAL,
  email     VARCHAR(50)   NOT NULL UNIQUE,
  pass      VARCHAR(50)   NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE juegos (
  id        SERIAL,
  nombre    VARCHAR(50)   NOT NULL,
  precio    INT           NOT NULL,
  stock     INT           NOT NULL CHECK (stock >= 0)
);
