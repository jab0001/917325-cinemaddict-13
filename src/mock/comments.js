import {getRandomItem, generateYear} from "../utils";


const EMOJI = [`angry.png`, `puke.png`, `sleeping.png`, `smile.png`];
const AUTHOR = [`Bill`, `Maximilian`, `Vladilen`, `Lex`];
const TEXT = [`hello`, `good`, `bad`, `good day`];


const generateComment = () => {
  return {
    emoji: getRandomItem(EMOJI),
    commentDate: generateYear(30, 12, 5, `YYYY/MM/DD HH:MM`),
    author: getRandomItem(AUTHOR),
    text: getRandomItem(TEXT),
  };
};

export const generateComments = (count) => {
  return Array.from({length: count}, generateComment);
};
