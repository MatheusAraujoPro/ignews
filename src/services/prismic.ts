import Prismic from '@prismicio/client'

export function getPrismicClient(reg?: unknown){
  const prismic = Prismic.client(
   process.env.PRISMIC_END_POINT,
   {
     accessToken: process.env.PISMIC_ACCESS_TOKEN
   }
  )
  return prismic
}