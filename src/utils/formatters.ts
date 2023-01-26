import { RepositoryType } from "@/Types/RepositoryType";

export function formatRepoName(
  repositories: Array<RepositoryType>
): Array<RepositoryType> {
  for (const repository of repositories) {
    const names = repository.name.split("-");

    let formattedName = "";

    for (const name of names) {
      if (!name) {
        continue;
      }
      formattedName += `${capitalize(name)} `;
    }

    repository.name = formattedName;
  }

  return repositories;
}

export function capitalize(word: string) {
  const firstLetter = word[0].toUpperCase();
  const restOfWord = word.slice(1, word.length);

  return `${firstLetter}${restOfWord.toLowerCase()}`;
}
