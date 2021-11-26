import axios from 'axios';
import store from '../store';

export const getLocation = async() =>{
  try {
   let location = await axios.get('https://ipapi.co/json/');
   store.methods.setCity(location.data.region);
   store.methods.setCountry(location.data.country);
   return Promise.resolve(location.data);          
  } catch (error) {
    Promise.reject(error);
  }
  
} 

const apiClient = axios.create({
  baseURL:'https://newsapi.org/v2',
  withCredentials:false,
  headers:{
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ import.meta.env.VITE_API_KEY
  }
})

export const fetchTopNews = async (params) =>{
  try {
    let news = await apiClient.get(`/top-headlines`,{params:params})
    return Promise.resolve(news.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const fetchTopSources = async (params) =>{
  try {
    let sources = await apiClient.get(`/top-headlines/sources`,{params:params})
    return Promise.resolve(sources.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

