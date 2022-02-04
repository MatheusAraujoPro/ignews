import { query as q } from 'faunadb'
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { fauna } from '../../../services/fauna'

export default NextAuth({
  // Configurando a integração com o Provider do Github
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENTE_ID,
      clientSecret: process.env.GITHUB_CLIENTE_SECRET, 
      authorization:{
        params:{
          scope:'read:user'
        }        
      },
          
    },)   
    // ...add more providers here    
  ],
  callbacks:{
    async signIn({ user }) {  
      const { email } = user
      try {
        await fauna.query
        (
          q.Create
          (
            q.Collection('users'), { data: { email } }
          )
        )
        return true

      } catch (err) {        
        console.log(err)
        
        return false
      }
    }
  }
})