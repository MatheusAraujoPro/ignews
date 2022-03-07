import { SigniInButton } from "../SignInButton";
import styles from "./styles.module.scss";

import { ActiveLink } from "../ActiveLink";
export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="Logo" />
        <nav>
          <ActiveLink href="/" activeClassname={styles.isActive}>
            <a className={styles.isActive}>Home</a>
          </ActiveLink>
          <ActiveLink href="/posts" activeClassname={styles.isActive} prefetch>
            <a>Posts</a>
          </ActiveLink>
        </nav>

        <SigniInButton />
      </div>
    </header>
  );
}
