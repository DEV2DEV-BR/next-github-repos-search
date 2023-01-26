import styles from "./styles.module.scss";

export default function Repositorycard() {
  return (
    <div className={styles.container}>
      <div>
        <h2>Internet History</h2>
        <span>Public</span>
        <span>Javascript</span>
      </div>

      <strong>1 Stars</strong>
    </div>
  );
}
