//srsc/services/axios.config.js
import axios from "axios";

const instancia = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json"
    }
});

export default instancia;