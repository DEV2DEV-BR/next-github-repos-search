import { RepositoryType } from "@/Types/RepositoryType";
import styles from "./styles.module.scss";

interface IProps {
  repository: RepositoryType;
}

export default function Repositorycard({ repository }: IProps) {
  return (
    <div className={styles.container}>
      <div>
        <h2>{repository.name}</h2>
        <span>{repository.visibility}</span>
        <span>{repository.language}</span>
      </div>

      <strong>{repository.stargazers_count} Stars</strong>
    </div>
  );
}
