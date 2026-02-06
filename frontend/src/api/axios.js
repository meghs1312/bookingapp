import axios from "axios";

const instance = axios.create({
  baseURL: "https://bookingapp-iah9.onrender.com/api"
});

export default instance;
