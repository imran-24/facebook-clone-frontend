import axios from "axios";

const baseURL = process.env.REACT_APP_API_URl


export const API = axios.create({ baseURL: baseURL});

