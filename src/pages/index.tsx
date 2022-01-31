import { GetServerSideProps, GetStaticProps } from "next";
import Head from "next/head";

import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";

import styles from "./home.module.scss";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      {/* 
        Cabeçalho dinâmico 
        Em qualque lugar da Aplicação é possível setar
        propriedades como a tag title dentro do Head.

        A página home ou página principal só pode ficar 
        dentro da pagina pages.
      */}

      <Head>
        <title>Ig.News | Inicio</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>Hey, Welcome 👏</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Girl Coding" />
      </main>
    </>
  );
}

/*
  CLIENT SIDE RENDERING - É UMA RENDERIZAÇÃO VIA BROWSER.
  NORMALMENTE É UM USEEFECT DENTRO DE UM COMPONENTE.
  FUNCINA EM PÁGINA E COMPONENT

  SERVER SIDE RENDERING - É UMA RENDEREIZAÇÃO NO NEXT, CAMADA QUE
  FICA ENTRE O FRONT END E O SERVIDOR. TODA A PÁGINA É DEVOLVIDA AO 
  BROWSER JÁ CARREGADA.
  SÓ FUNCIONA EM PÁGINA.
*/

// export const getServerSideProps: GetServerSideProps = async () => {
//   const price = await stripe.prices.retrieve("price_1KNhaXJFfeRRNYB1Ab6S7umT", {
//     expand: ["product"],
//   });

//   const product = {
//     priceId: price.id,
//     // Sempre que trabalhar com preço no BD é interessante salvar em centávos
//     amount: new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(price.unit_amount / 100),
//   };

//   return {
//     props: {
//       product,
//     },
//   };
// };

// Gera o HTML referente ao processamento dessa função de forma estática
// SSG - Static Site Generation(SÓ PODE SER USADO EM PÁGINAS GERAIS)
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1KNhaXJFfeRRNYB1Ab6S7umT", {
    expand: ["product"],
  });

  const product = {
    priceId: price.id,
    // Sempre que trabalhar com preço no BD é interessante salvar em centávos
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, //24 hours
  };
};
