import React, { useState, useEffect } from "react";
import { cardDataArray } from "../utils/static";
import SprintHistoryCard from "../components/SprintHistoryCard";
import { headers, getAllProjectsWithSprints } from "../utils/urls";

const SprintHistory = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchProjectSprints = async () => {
      try {
        let response = await fetch(getAllProjectsWithSprints, {
          method: "GET",
          headers,
          credentials: "include",
        });

        response = await response.json();

        console.log(response);

        if (response.success === true) {
          console.log(response);
          // Handle success case
          setData(response.data);
        } else {
          throw new Error(response.message || "Failed to update sprint status");
        }
      } catch (error) {
        console.error("Error updating sprint status:", error.message);
      }
    };
    fetchProjectSprints();
  }, []);
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
