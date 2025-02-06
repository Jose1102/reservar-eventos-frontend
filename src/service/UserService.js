import axios from "axios";

const USERS = 'http://localhost:8080/api/v1/userAll';
const LOGIN_URL = 'http://localhost:8080/api/v1/token';

class UserService {
  // Obtener los usuarios
  getUsers() {
    const token = localStorage.getItem('authToken');  // Recuperar el token del almacenamiento local
    return axios.get(USERS, {
      headers: {
        'Authorization': `Bearer ${token}`  // Incluir el token en los encabezados
      }
    });
  }

  // Generar el token
  async generateToken(email) {
    try {
      const response = await axios.post(LOGIN_URL, null, {
        params: { email },  // Enviar el parámetro en la consulta
      });

      console.log("Encabezados de la respuesta:", response.headers);

      // Verificar si la respuesta es 200 (éxito)
      if (response.status === 200) {
        const token = response.headers['authorization'].replace('Bearer ', '');
        localStorage.setItem('authToken', token); // Guardar el token en el almacenamiento local
        return token;
      }
    } catch (error) {
      console.error('Error al generar el token', error);
    }
  }
}

export default new UserService();
