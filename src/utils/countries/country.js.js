const RestCountries = require('rest-countries-node');
const restCountries = new RestCountries();  
const _ = require('lodash');
const { default: axios } = require('axios');
// let isRegion = ''

const getRegions = () => {
   let availableRegions = []
   restCountries.getAllGroupedByRegion()
   .then(response => {
      let reg,RegionValue = []
      Object.keys(response).map((r) => {
         return RegionValue.push(r)
      })
      reg = _.reject(RegionValue, (v) => _.isUndefined(v) || _.isNull(v) || v === '')
      console.log(reg)
      availableRegions.push({...reg})
   })
   return availableRegions;
}

const getCountries = (isRegion) => {
   let RegCountries = []
   restCountries.findByRegion(isRegion)
   .then(response => {
      // console.log(response)
      response.map((reg,i) => {
         return RegCountries.push({
            key: i,
            name:reg.name,
            region:reg.region,
            code:reg.alpha3Code,
            capital:reg.capital,
            nationality:reg.demonym
         })
      })
   })
   return RegCountries
}
const getCountryStates  = (country) => {
   const obtStates=[]
   if(!country){
      alert('Please select the country');
   }
   else {
      axios.post("https://countriesnow.space/api/v0.1/countries/states",
      {"country": country})
      .then(response => {
         const receivedData = response.data.data.states
         return receivedData
      })
      .then(data => {
         console.log(data)
         obtStates.push(data)        
         return obtStates
      })
   }
}

export const CountryData = {
   getCountries,
   getRegions,
   getCountryStates
}