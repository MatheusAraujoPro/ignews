import { query as q } from "faunadb";
import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction: boolean
){
  // Buscando o usuário no banco do FaunaDB com o ID {customerID}
  const userRef = await fauna.query(
    q.Select(
      'ref',
      q.Get(
        q.Match(
          q.Index('user_by_stripe_costumer_id'),
          customerId
        )
      )
    )
  ) 
  
  // Buscando as informações da Subscriptiono no stripe
  const subscription = await stripe.subscriptions.retrieve(subscriptionId) 

  //Criando um objeto com as infos mais importantes da Subscription
  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  }

  if(createAction){
    // Salvar os dados da subscription no FaunaDB
    await fauna.query(
      q.Create(q.Collection('subscriptions'),{ data: subscriptionData})
    )

  }else{
    // Atualizar a Subscription usando o método Replace.
    await fauna.query(
      // Substitui o registro inteiro
      q.Replace(
        q.Select(
          'ref',
          q.Get(
            q.Match(
              q.Index('subscriptions_by_id'),
              subscription.id
            )
          )
        ),
        {data: subscriptionData}
      )
    )
  }
}