import { API_URL } from '../constants/constants'
import axios from 'axios'


export const getJokes = () => axios.get(`${API_URL}/jokes/search?query=all`)
export const getCategories = () => axios.get(`${API_URL}/jokes/categories`)
export const searchJokes = (data) => axios.get(`${API_URL}/jokes/search?query=${data}`)
export const getJokesByCategory = (data) => axios.get( `${API_URL}/jokes/random?category=${data}`)