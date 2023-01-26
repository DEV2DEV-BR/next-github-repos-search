import styles from "@/styles/Home.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <Image
          src="/logo.jpeg"
          alt="DEV2DEV LOGO"
          className={styles.logo}
          width={130}
          height={130}
          priority
        />
        <h1>DEV2DEV</h1>
      </header>
      <main className={styles.main}></main>
    </>
  );
}
