import Nav from "@/components/Nav";
import styles from "@/styles/RepositoryDetail.module.scss";
import { RepositoryType } from "@/Types/RepositoryType";
import { formatRepoName } from "@/utils/formatters";
import { GetStaticPaths, GetStaticProps } from "next";

interface IProps {
  repository: RepositoryType;
  date: string;
}

export default function Home(props: IProps) {
  const { repository } = props;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Nav />
      </header>

      <div className={styles["container-card"]}>
        <div>
          <h1>{repository.name}</h1>
          <span>{repository.visibility}</span>
          <span>{repository.language}</span>
        </div>

        <h2>Branch Principal: {repository.default_branch}</h2>

        <h1 className={styles.star}>{repository.stargazers_count} Stars</h1>

        <a href={repository.html_url} target="_blank">
          <button>Abrir Github</button>
        </a>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<{
  repository: RepositoryType;
}> = async ({ params }) => {
  let formattedRepository: any = [];

  if (params) {
    const response = await fetch(
      `https://api.github.com/repos/dev2dev-br/${params.name}`,
      {
        headers: {
          Authorization: "Bearer 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",
        },
      }
    );
    const repository: RepositoryType = await response.json();

    formattedRepository = formatRepoName([repository]);
  }

  return {
    props: {
      repository: formattedRepository[0],
      date: new Date().toLocaleDateString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    },
    revalidate: 5,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`https://api.github.com/orgs/dev2dev-br/repos`, {
    headers: {
      Authorization: "Bearer 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",
    },
  });
  const repositories: RepositoryType[] = await response.json();

  const paths = repositories.map((repository) => ({
    params: { name: repository.name.toString() },
  }));

  return { paths, fallback: false };
};
