import React, { useState } from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import UserService from "../service/UserService";


const Login = () => {
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();  // Prevenir el comportamiento por defecto

    if (!email) {
      setError("Por favor ingrese un email.");
      return;
    }

    // Generar el token
    const token = await UserService.generateToken(email);

    if (token) {
      console.log("Token recibido:", token);

      try {
        const response = await UserService.getUsers();
        setUsers(response.data);
        console.log("Usuarios recibidos:", response.data);
        window.location = "/Home";
      } catch (error) {
        setError("Error al obtener el listado de usuarios");
        console.error("Error al obtener usuarios:", error);
      }
    } else {
      console.log("Error al obtener el token");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}> 
        <FormControl fullWidth>
          <div>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
            />
          </div>
          <div>
            <Button variant="contained" type="submit" color="success">
              Iniciar Sesion
            </Button>
          </div>
          <div>
            <a href="register">Soy nuevo quiero registrarme</a>
          </div>
        </FormControl>
      </form>
      
      {users.length > 0 && (
        <div>
          <h3>Lista de Usuarios</h3>
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.nombre}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Si hay un error, lo mostramos */}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
