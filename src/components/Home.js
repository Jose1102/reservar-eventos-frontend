import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
const Home = () => {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [redirect, setRedirect] = useState(false);
  return (
    <div>
      <FormControl>
        
        <div>
          <div>
            <Button variant="contained" type="submit" color="success">
                Success
            </Button>
          </div>
          <div>
            <a href="register">Soy nuevo quiero registrarme</a>
          </div>
        </div>
      </FormControl>
    </div>
  );
};

export default Home;
