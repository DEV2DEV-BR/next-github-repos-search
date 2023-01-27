import Repositorycard from "@/components/RepositoryCard";
import styles from "@/styles/Home.module.scss";
import { CompanyType } from "@/Types/CompanyType";
import { RepositoryType } from "@/Types/RepositoryType";
import { capitalize, formatRepoName } from "@/utils/formatters";
import { GetServerSideProps, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  repositories: Array<RepositoryType>;
  company: CompanyType;
  date: string;
}

export default function Home(props: IProps) {
  const { repositories, date, company } = props;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image
          src={company.avatar_url}
          alt={company.login}
          className={styles.logo}
          width={130}
          height={130}
          priority
        />
        <h1>{company.login}</h1>
        <span>Atualizado em: {date}</span>
      </header>
      <main className={styles.main}>
        {company ? (
          <>
            {repositories.length ? (
              repositories.map((repository) => (
                <Repositorycard repository={repository} key={repository.id} />
              ))
            ) : (
              <h1>Não foi possível listar os respositórios!</h1>
            )}
          </>
        ) : (
          <div className={styles["not-found"]}>
            <Image
              src="/avatar.svg"
              alt="company not found"
              width={289}
              height={289}
              priority
            />
            <h1>Organização não encontrada!</h1>
          </div>
        )}
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.params?.org) {
    const companyResponse = await fetch(
      `https://api.github.com/users/${context.params.org}`,
      {
        headers: {
          Authorization: "Bearer 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",
        },
      }
    );

    const { login, avatar_url }: CompanyType = await companyResponse.json();

    const response = await fetch(
      `https://api.github.com/orgs/${context.params.org}/repos`,
      {
        headers: {
          Authorization: "Bearer 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",
        },
      }
    );

    let formattedRepositories: RepositoryType[] = [];

    if (response.status === 200) {
      const repositories: RepositoryType[] = await response.json();

      formattedRepositories = formatRepoName(repositories);
    }

    return {
      props: {
        repositories: formattedRepositories,
        company: { login, avatar_url },
        date: new Date().toLocaleDateString("pt-br", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      },
    };
  }

  return {
    props: {
      repositories: [],
      date: new Date().toLocaleDateString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    },
  };
};
