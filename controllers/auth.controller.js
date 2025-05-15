import * as sql from '../models/userModel.js'; // funciones DB
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'test123';

export const registrar = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Datos incompletos' });
  }

  try {
    const usuarioExistente = await sql.buscarUsuarioPoremail(email);
    if (usuarioExistente) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    // Hashear password antes de guardar
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Guardar usuario con contraseña hasheada
    const nuevoUsuario = await sql.crearUsuario(email, hashedPassword);

    // Generar token
    const token = jwt.sign(
      { id: nuevoUsuario.id, email: nuevoUsuario.email },
      JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'Usuario creado con éxito',
      user: { id: nuevoUsuario.id, email: nuevoUsuario.email },
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Datos incompletos' });
  }

  try {
    const usuario = await sql.buscarUsuarioPoremail(email);

    console.log('Usuario:', usuario);             // <-- aquí
    console.log('Password ingresado:', password); // <-- aquí
    console.log('Password hash:', usuario?.password); // <-- aquí (por si usuario es null)

    if (!usuario) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const passwordIsValid = bcrypt.compareSync(password, usuario.password);

    console.log('Password válido:', passwordIsValid); // <-- aquí para ver si coincide

    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};
