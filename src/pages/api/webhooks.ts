import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream'
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import { saveSubscription } from "./_lib/managerSubscription";

async function buffer(readable: Readable){
  const chunks = []

  for await (const chunck of readable){
    chunks.push(
      typeof chunck === 'string' ? Buffer.from(chunck) : chunck
    )
  }

  return Buffer.concat(chunks)
}

/*
  Next tem uma configuração padrão que entende toda requisição
  como um JSON ou um Objeto, porém como nesse caso a requisição
  é um Readable, é preciso desabilitar essa configuração
*/

export const config = {
  api:{
    bodyParser: false
  }
}

const relevantEvents = new Set([
  'checkout.session.completed' 
])

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'POST'){
    const buf = await buffer(req)

    // Identificando se a requisição veio mesmo do Stripe
    // Seguindo a recomendação do Próprio stripe
    const secret = req.headers['stripe-signature']

    let event: Stripe.Event

    try{
      event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET)
    }catch(err){
      return res.status(400).send(`Webhook erro: ${err.message}`)
    }

    const { type }  = event

    if(relevantEvents.has(type)){
     try {
      switch(type){
        case 'checkout.session.completed':

          const checkoutSession = event.data.object as Stripe.Checkout.Session
          // Salvar essa subscrição.
          await saveSubscription(
            checkoutSession.subscription.toString(),
            checkoutSession.customer.toString()
          )
          break;
        default:
          throw new Error('Unhandled event')
      }
     }catch(err){
      /* Esse retorno será feito para o Stripe(Que é quem fez a requisição)
         Para o Desenvolvedor seria interessante o uso de alguma ferramenta
         de observação como: Sentry, bugsnag
      */
       return res.json({error: 'Webhook handler filed'})
     }
    }

    
    res.status(200).json({received: true})
  }else{
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
  }
}