import { Client } from 'faunadb'
/*
  Operações que que utilizam o FAUNA ou o STRIPE
  que usem esta chave secreta não devem ser feitas
  no lado do cliente. Ou seja, nenhum componente 
  da aplicação deverá fazê-las. 

  Essas operações deverão ser feitas apenas pelas chamadas
  NEXT(SSR OU SSG), pelas API-ROUTES
*/

export const fauna = new Client({
  secret: process.env.FAUNADB_KEY, 
  domain: "db.us.fauna.com"
})