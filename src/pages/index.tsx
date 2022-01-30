import Head from "next/head";

import styles from "./home.module.scss";

export default function Home() {
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
            <span>for $9.90 month</span>
          </p>
        </section>
        <img src="/images/avatar.svg" alt="Girl Coding" />
      </main>
    </>
  );
}
