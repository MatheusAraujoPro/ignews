import {  NextApiRequest ,NextApiResponse } from 'next'

export default (request:NextApiRequest, response:NextApiResponse )=>{
  const data = [
    {id: 1, name:'Matheus'},
    {id: 2, name:'Aldenir'},
    {id: 3, name:'Cícero'}
  ]
  return response.json(data)
}
