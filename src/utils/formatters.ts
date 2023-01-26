export function capitalize(word: string) {
  const firstLetter = word[0].toUpperCase();
  const restOfWord = word.slice(1, word.length);

  return `${firstLetter}${restOfWord.toLowerCase()}`;
}
