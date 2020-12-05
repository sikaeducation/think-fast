function getWordFromStem(stem: string): string {
  const fileRegex = /.+(?=\.vue$)/;
  const variableRegex = /(?<=import\s).+(?=\sfrom)/;
  const componentRegex = /(?<=^<).+(?=\s\/>$)/;

  let word = '';
  [componentRegex, variableRegex, fileRegex].forEach((regex) => {
    word = regex.exec(stem)?.[0] ?? word;
  });

  return word;
}

export default getWordFromStem;
