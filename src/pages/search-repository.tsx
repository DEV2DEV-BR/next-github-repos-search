import Repositorycard from "@/components/RepositoryCard";
import styles from "@/styles/SearchRepository.module.scss";
import { CompanyType } from "@/Types/CompanyType";
import { RepositoryType } from "@/Types/RepositoryType";
import { capitalize, formatRepoName } from "@/utils/formatters";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SearchRepository() {
  const [respositories, setRepositories] = useState<Array<RepositoryType>>([]);
  const [currentCompany, setCurrentCompany] = useState<CompanyType | null>();
  const [inputSearch, setInputSearch] = useState("");
  const [searchDate, setSearchDate] = useState("");

  async function searchCompanyAndRepos() {
    if (!inputSearch) {
      return;
    }

    setRepositories([]);

    const companyResponse = await fetch(
      `https://api.github.com/users/${inputSearch}`
    );

    const { login, avatar_url }: CompanyType = await companyResponse.json();

    if (!login) {
      setCurrentCompany(null);
    }

    setCurrentCompany({ login, avatar_url });
  }

  useEffect(() => {
    if (!currentCompany) {
      return;
    }

    async function loadRepos() {
      const reposResponse = await fetch(
        `https://api.github.com/orgs/${currentCompany?.login}/repos`
      );

      setSearchDate(
        new Date().toLocaleDateString("pt-br", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );

      if (reposResponse.status !== 200) {
        return;
      }

      const reposData: Array<RepositoryType> = await reposResponse.json();

      const formattedRepositories = formatRepoName(reposData);

      setRepositories([...formattedRepositories]);

      setInputSearch("");
    }

    loadRepos();
  }, [currentCompany]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <input
          type="text"
          placeholder="Digite o nome da organização"
          onChange={(event) => setInputSearch(event.target.value)}
          onKeyDown={(event) =>
            event.key === "Enter" && searchCompanyAndRepos()
          }
        />
        <button onClick={searchCompanyAndRepos}>Buscar</button>
      </header>
      <main className={styles.main}>
        {currentCompany && (
          <div className={styles["company-information"]}>
            <Image
              src={currentCompany.avatar_url}
              alt="DEV2DEV LOGO"
              className={styles.logo}
              width={84}
              height={84}
              priority
            />
            <div>
              <h1>{currentCompany.login}</h1>
              <span>Buscado em: {searchDate}</span>
            </div>
          </div>
        )}

        {currentCompany ? (
          <div className={styles["repo-container"]}>
            {respositories.length ? (
              respositories.map((repository) => (
                <Repositorycard repository={repository} key={repository.id} />
              ))
            ) : (
              <h1>Não foi possível listar os respositórios!</h1>
            )}
          </div>
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
