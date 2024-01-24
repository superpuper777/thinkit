export const shuffleArray = (array: Array<string>) =>
  [...array].sort(() => Math.random() - 0.5);
