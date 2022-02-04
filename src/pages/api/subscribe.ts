import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { stripe } from "../../services/stripe";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'POST'){
    // Criar o usuário no Painel do Stripe
    // Pegando as informações da sessão do usuárui
    const session = await getSession({ req })

    const custumer = await stripe.customers.create({
      email: session.user.email
    })


    // Adicionar o registro de checkout no Stripe
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: custumer.id,
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