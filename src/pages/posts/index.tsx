import Head from "next/Head";
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
