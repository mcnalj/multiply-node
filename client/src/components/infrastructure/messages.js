import { getRandomIntInclusive } from "../math-scripts/utilities-scripts";

export const correctMessages = [
    `Yes, that is correct!`,
    `Great answer.`,
    `Exactly!`,
    `Yup, that's right . . .`,
    `You got it!`,
    `Boom!!`,
    `Ka-ching!`,
    `Exacto!`,
    `Superb!`,
    `Right on!`,
    `Uh, huh, You got it.`,
    `That's it. Keep it up!`,
  ];

export const incorrectMessages = [
    `Sorry, that's not the answer: `,
    `That's not the answer we were looking for: `,
    `Not exactly: `,
    `That's not right, but you got this: `,
    `You'll get the next one: `,
    `Not exactly, but no sweat. You'll get it: `,
    `Sorry, that's not it. But no worries, your moment is coming: `,
  ];

export const streakMessages = [
    `You are on a roll!`,
    `Keep it going . . .`,
    `Smoking hot!`,
    `You. Are. On. Fire!`,
    `Too good!!`,
    `OK, seems like you got this.`,
  ]

  export function getRandomCorrectMessage() {
    const index = getRandomIntInclusive(0, correctMessages.length -1);
    return correctMessages[index];
  }

  export function getStreakMessage(streak) {
    const index = (streak - 4) % streakMessages.length;
    return streakMessages[index];
  }

  export function getRandomIncorrectMessage() {
    const index = getRandomIntInclusive(0, incorrectMessages.length -1);
    return incorrectMessages[index];
  }


