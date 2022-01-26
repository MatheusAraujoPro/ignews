import { AppProps } from "next/app";
import "../../styles/global.scss";

/*
  É O COMPONENTE MAIS EXTERNO DA APLICAÇÃO.
  TODA VEZ QUE O USUÁRIO TROCAR DE PÁGINA, 
  ELE VAI SER RECARREGADO.
  NÃO É ROTEADO PELO NEXT
*/

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
