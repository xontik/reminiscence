import axios from 'axios'
import qs from 'querystring'
import dotenv from 'dotenv'

dotenv.config()

const urlToAdd = process.argv[2]

const main = async () => {
  try {
    const tokenResponse = await axios.post(
      'https://reminiscence.xontik.com/restapi/login/',
      { username: process.env.USERNAME, password: process.env.PASSWORD }
    )

    const { token } = tokenResponse.data

    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    const response = await axios.post(
      'https://reminiscence.xontik.com/restapi/add-url/',
      qs.stringify({ url: urlToAdd, directory: '/dir' })
    )

    const status = response?.data?.status
    if (status === 'added') {
      return
    }
    console.log(`error statut ${status}`)
  } catch (e) {
    console.error(`error: ${e}`)
  }
}

main()
