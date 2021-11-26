import { reactive } from "vue";

const state = reactive({
  city:'',
  country:''
});

const methods = {
  setCity(city){
    state.city = city;
  },
  
  setCountry(country){
    state.country = country;
  },
  
}

export default{
  state, methods
}