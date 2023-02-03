import { useQuery } from "react-query";
import axios from "axios";

function getProductos() {
  return axios.get("http://localhost:3000/api/v1/products");
}
export function Producto() {
  const {
    data: productos,
    isLoading,
    isError,
  } = useQuery(["productos"], getProductos);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        {productos.data.data.map((producto) => (
          <tr key={producto.id}>
            <td>{producto.id}</td>
            <td>{producto.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
