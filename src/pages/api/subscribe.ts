import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { fauna } from "../../services/fauna";
import { query as q } from 'faunadb'
import { stripe } from "../../services/stripe";

type User = {
  ref:{
    id: string
  },
  data:{
    stripe_costumer_id: string
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'POST'){

  

    // Criar o usuário no Painel do Stripe
    // Pegando as informações da sessão do usuário.

    const session = await getSession({ req })

      //Pegando o Uusário do Fauna DB
      const user = await fauna.query<User>(
        q.Get(
          q.Match(
            q.Index('user_by_email'),
            q.Casefold(session.user.email)
          )
        )
      )

    let customerId = user.data.stripe_costumer_id

    if(!customerId){
      const custumer = await stripe.customers.create({
        email: session.user.email
      })
      
      //Atualizando o usuário com Customer ID no Fauna DB
      await fauna.query(
        q.Update(
          q.Ref(q.Collection('users'), user.ref.id),
          {
            data:{
              stripe_costumer_id: custumer.id
            }
          }
        )
      )

      customerId = custumer.id
    }  


    // Adicionar o registro de checkout no Stripe
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        {price: 'price_1KNhaXJFfeRRNYB1Ab6S7umT', quantity: 1}
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL
    })

    return res.status(200).json({sessionId: checkoutSession.id})

  }else{
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
  }
}