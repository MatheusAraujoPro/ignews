import Head from "next/head";
import styles from "../../styles/home.module.scss";

export default function Home() {
  return (
    <>
      {/* 
        Cabeçalho dinâmico 
        Em qualque lugar da Aplicação é possível setar
        propriedades como a tag title dentro do Head.
      */}
      <Head>
        <title>Ig.News | Inicio</title>
      </Head>
      <h1 className={styles.title}>Hello World</h1>
    </>
  );
}
