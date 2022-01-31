import Stripe from 'stripe'
import { version } from '../../package.json'

export const stripe = new Stripe(
  // Passar a chave da API
  process.env.STRIPE_API_KEY,
  {
    apiVersion: '2020-08-27',
    appInfo:{
      name: 'Ig.news',
      version
    }
  }
)

