import React, { useState } from "react";
import { cardDataArray } from "../utils/static";
import SprintHistoryCard from "../components/SprintHistoryCard";

const SprintHistory = () => {
  const [data, setData] = useState(cardDataArray);
  return (
    <section className=" mt-32 max-w-7xl  mx-auto">
      <h1 className="text-4xl font-bold text-blue mb-4">Sprint History</h1>
      <div className="flex justify-between items-center  gap-5">
        {data.map((item, index) => (
          <div key={index} className="w-full md:w-1/2">
            <SprintHistoryCard cardData={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SprintHistory;
