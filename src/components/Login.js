import React, { useState } from "react";
import Button from "@mui/material/Button";
import UserService from "../service/UserService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);  
  const [error, setError] = useState("");  

  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); 

    // Generar el token
    const token = await UserService.generateToken(email);

    if (token) {
      console.log("Token recibido:", token);  
      
      try {
        const response = await UserService.getUsers(); 
        setUsers(response.data);
        console.log("Salida: ", response.data);
        console.log("Usuarios recibidos:", token); 
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
        <div>
          <label htmlFor="fname" className="subtitle0A">Email</label>
          <input
            id="userInput0A"
            name="usuario"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>

        <Button type="submit" variant="contained">
          Iniciar sesión
        </Button>
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
