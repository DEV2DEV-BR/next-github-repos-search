import Repositorycard from "@/components/RepositoryCard";
import styles from "@/styles/Home.module.scss";
import { RepositoryType } from "@/Types/RepositoryType";
import { capitalize } from "@/utils/formatters";
import Image from "next/image";

interface IProps {
  repositories: Array<RepositoryType>;
  date: string;
}

export default function Home(props: IProps) {
  const { repositories, date } = props;

  return (
    <div className={styles.container}>
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
        <span>Atualizado em: {date}</span>
      </header>
      <main className={styles.main}>
        {repositories.map((repository) => (
          <Repositorycard repository={repository} key={repository.id} />
        ))}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch(`https://api.github.com/orgs/dev2dev-br/repos`);
  const repositories: RepositoryType[] = await response.json();

  for (const repository of repositories) {
    const names = repository.name.split("-");

    let formattedName = "";

    for (const name of names) {
      formattedName += `${capitalize(name)} `;
    }

    repository.name = formattedName;
  }

  return {
    props: {
      repositories,
      date: new Date().toLocaleDateString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    },
    revalidate: 60,
  };
}
