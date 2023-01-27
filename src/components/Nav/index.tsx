import Link from "next/link";
import styles from "./styles.module.scss";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <Link href="/">Home</Link>
      <Link href="/search-repository">Buscar repositórios</Link>
    </nav>
  );
}
