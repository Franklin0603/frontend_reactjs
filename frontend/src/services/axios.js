import axios from "axios"

const ApiService = axios.create({
  baseURL: "http://localhost:8000/",
})

export default ApiService
