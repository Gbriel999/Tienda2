INSERT INTO juegos (id, nombre, precio, stock) VALUES
  (DEFAULT, 'Mario', 70000, 40 ),
  (DEFAULT, 'Call of duty', 80000, 50 ),
  (DEFAULT, 'Zelda', 50000, 10 );

INSERT INTO usuarios (id, email, pass) VALUES 
  (DEFAULT, 'admin@tienda.cl','123');

SELECT * FROM juegos;
select * from usuarios;