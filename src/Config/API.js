import axios from "axios";

export default axios.create({
  baseURL: " http://localhost:5000/api/v1",
});

export const server_url = ` http://localhost:5000/api/v1`;
