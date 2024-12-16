import React from "react";
import PlayCard from "./PlayCard";
const playCardsData = ["slack", "trello", "asana", "github", "jira", "gmail"];
const PlayCards = () => {
  return (
    <div className=' pt-6'>
      {playCardsData.map((card, index) => (
        <PlayCard name={card} key={index} className={card} />
      ))}
    </div>
  );
};

export default PlayCards;
