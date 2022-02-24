import { GetStaticProps } from "next";
import Head from "next/Head";
import { getPrismicClient } from "../../services/prismic";
import Prismic from "@prismicio/client";
import styles from "./styles.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="">
            <time>12 de março de 2021</time>
            <strong>Título do Post</strong>
            <p>Parágrafo do Post</p>
          </a>

          <a href="">
            <time>12 de março de 2021</time>
            <strong>Título do Post</strong>
            <p>Parágrafo do Post</p>
          </a>

          <a href="">
            <time>12 de março de 2021</time>
            <strong>Título do Post</strong>
            <p>Parágrafo do Post</p>
          </a>

          <a href="">
            <time>12 de março de 2021</time>
            <strong>Título do Post</strong>
            <p>Parágrafo do Post</p>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.Predicates.at("document.type", "publication")],
    {
      fetch: ["publication.title", "publication.content"],
      pageSize: 100,
    }
  );
  console.log(JSON.stringify(response, null, 2));

  return {
    props: {},
  };
};
