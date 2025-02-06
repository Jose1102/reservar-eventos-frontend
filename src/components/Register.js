import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Navigate } from "react-router-dom";

import UserService from "../service/UserService";

const Register = () => {
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [redirect, setRedirect] = useState(false); // Estado para manejar la redirección

  // Función manejarClick
  const manejarClick = async (e) => {
    e.preventDefault(); // Prevenir que el formulario se recargue automáticamente

    console.log("Has hecho clic en el botón Cancelar");
    console.log(correo);
    console.log(nombre);

    const user = {
      nombre,
      correo
    };

    try {
      await UserService.addUser(user); // Esperar a que la promesa se resuelva
      console.log("Usuario registrado con éxito");
      setRedirect(true); // Cambiar el estado para redirigir
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  };

  const exit = () =>{
    window.location = "/";

  }

  if (redirect) {
    return <Navigate to="/" />; // Redirigir si el estado 'redirect' es verdadero
  }

  return (
    <div>
      <form onSubmit={manejarClick}>
        <FormControl>
          <div>
            <div>
              <label>Email</label>
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="Email"
                value={correo}
                onChange={({ target }) => setCorreo(target.value)}
                variant="outlined"
              />
            </div>

            <div>
              <label>Nombre</label>
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="Nombre"
                value={nombre}
                onChange={({ target }) => setNombre(target.value)}
                required
              />
            </div>
          </div>

          <div>
            <div>
              <Button variant="contained" color="success" onClick={manejarClick}>
                Registrar
              </Button>
            </div>

            <div>
              <Button variant="contained" color="error" onClick={exit}>
                Registrar
              </Button>
            </div>

            <div>
              <div>
                <a href="register">Soy nuevo, quiero registrarme</a>
              </div>
            </div>
          </div>
        </FormControl>
      </form>
    </div>
  );
};

export default Register;
