import { SigniInButton } from "../SignInButton";
import styles from "./styles.module.scss";
export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="Logo" />
        <nav>
          <a className={styles.isActive} href="">
            Home
          </a>
          <a href="">Posts</a>
        </nav>

        <SigniInButton />
      </div>
    </header>
  );
}
