import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import UserService from "../service/UserService";
const Home = () => {
  const [rows, setRows] = useState([]);  // Estado para las filas de la tabla
  const [loading, setLoading] = useState(true);  // Estado para el cargado de datos
  const [error, setError] = useState(null);  // Estado para manejar errores

  // Definir las columnas de la tabla
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nombreReserva', headerName: 'Nombre de reserva', width: 160 },
    { field: 'estadoReserva', headerName: 'Estado de la reserva', width: 160 },
  ];

  // Obtener reservas desde el servicio
  const fetchReservas = async () => {
    try {
      const response = await UserService.getReservas();  // Llamada al servicio que ya tienes
      const reservas = response.data;

      // Formatear los datos según lo que espera el DataGrid
      const formattedRows = reservas.map((reserva) => ({
        id: reserva.id,
        nombreReserva: reserva.nombre,
        estadoReserva: reserva.estado ? 'True' : 'False',
      }));

      setRows(formattedRows);  // Actualizar las filas con los datos de la API
      setLoading(false);  // Cambiar el estado de carga
    } catch (error) {
      console.error("Error al obtener las reservas:", error);
      setError("Hubo un error al cargar las reservas.");
      setLoading(false);  // Cambiar el estado de carga incluso si hubo error
    }
  };

  // Llamar a fetchReservas cuando el componente se monta
  useEffect(() => {
    fetchReservas();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default Home;
