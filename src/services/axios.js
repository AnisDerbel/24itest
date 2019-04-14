
import axios from 'axios'
import Config from './config'

// axios.defaults.params[ 'api_key' ] = Config.API_KEY

export default axios.create({
  baseURL: Config.BASE_URL,
  params:{
    api_key: Config.API_KEY,
    language: 'en-US'
  }
})