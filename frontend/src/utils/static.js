import CardImage from "../assets/histroy_image.png";

export const cardDataArray = [
  {
    title: "Tiger Karate",
    image: CardImage,
    wordcount: 5000,
    timespent: "5 hours",
    status: "completed",
    sprints: [
      { number: 1, words: 1500, time: "1 hour", status: "completed" },
      { number: 2, words: 1200, time: "1.5 hours", status: "onhold" },
      { number: 3, words: 2300, time: "2.5 hours", status: "fail" },
    ],
  },
  {
    title: "Tiger Karate",
    image: CardImage,
    wordcount: 7500,
    timespent: "8 hours",
    status: "onhold",
    sprints: [
      { number: 1, words: 2000, time: "2 hours", status: "completed" },
      { number: 2, words: 1800, time: "2 hours", status: "onhold" },
      { number: 3, words: 2500, time: "3 hours", status: "completed" },
    ],
  },
];
