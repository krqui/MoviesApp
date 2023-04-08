import axios from "axios"
const movieDB = axios.create({
    baseURL: "https://api.themoviedb.org/3/movie",
    params: {
        api_key: "8a5536bed97e1ea17c66de994268d805",
        language: "es-ES"
    }
})

export default movieDB;
