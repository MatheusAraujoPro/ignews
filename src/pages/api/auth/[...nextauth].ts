import { query as q } from 'faunadb'
import { Session } from 'inspector'
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
    async session({session}){ 
     try{
        const userActiveSubscription = await fauna.query(
          q.Get(
           q.Intersection([
            q.Match(
              q.Index('subscription_by_user_ref'),
              q.Select(
                'ref',
                q.Get(
                  q.Match(
                    q.Index('user_by_email'),q.Casefold(session.user.email)
                  )
                )
              )
            ),
            q.Match(
              q.Index('subscription_by_status'),
              'active'
            )
           ])
          )
        )  
        return {
          ...session,
          activeSubscription: userActiveSubscription.data.status
        }

     }
      catch{
        return{
          ...session,
          activeSubscription: null
        }
      }
    },

    async signIn({ user }) {  
      const { email } = user
      try {
        await fauna.query
        (
         q.If(
           q.Not(
             q.Exists(
               q.Match(
                 q.Index('user_by_email'),
                 q.Casefold(email)
               )
             )
           ),
           q.Create
           (
             q.Collection('users'), { data: { email } }
           ),
           q.Get(
            q.Match(
              q.Index('user_by_email'),
              q.Casefold(email)
            )
           )
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