import axios from "axios";


export const updateApiToken = async () => {
axios.post('', {
    "email": "artempoznakov990@gmail.ru",
    "password": "10005008Aa"
  })
  .then((response) =>{
    process.env.API_TOKEN=response.data.token
    return response.status
  })
  .catch((error) => {
    throw new Error(error)
  })
}