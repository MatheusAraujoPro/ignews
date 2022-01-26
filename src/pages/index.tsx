import Head from "next/head";

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
      <h1>Hello World</h1>
    </>
  );
}
