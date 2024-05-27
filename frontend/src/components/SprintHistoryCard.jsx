import React from "react";
import DashboardButtons from "./buttons/DashboardButtons";
import DoughnutChart from "../charts/DoughnutChart";
import NeedleChart from "../charts/NeedleChart";

const SprintHistoryCard = ({ cardData }) => {
  const { title, image, wordcount, timespent, sprints, status } = cardData;
  return (
    <div className="border-2 border-blue p-4">
      <div className="top flex justify-between gap-5">
        <div className="left w-1/2">
          <img
            src={image}
            alt="Card Image"
            className="min-h-full  object-cover"
          />
        </div>
        <div className="right w-1/2">
          <div className="top relative">
            <h4 className="text-xl font-bold text-blue">{title}</h4>
            <h3>
              <span className="text-blue text-lg font-semibold">
                Word Count -
              </span>
              {wordcount}
            </h3>
            <h3>
              <span className="text-blue text-lg font-semibold">
                Time Spent -
              </span>
              {timespent}
            </h3>
            <div className="absolute top-0 right-0">
              <DashboardButtons type={status} text={status} />
            </div>
          </div>
          <div className="bottom mt-4">
            {sprints.map((item, index) => (
              <div
                key={index}
                className="sprint-details relative border-b border-blue pb-3 mb-2"
              >
                <h3 className="font-semibold text-blue text-md">
                  Sprint : {item.number}
                </h3>
                <h3>
                  <span className="font-semibold text-md text-blue">
                    Word Goal :
                  </span>{" "}
                  {item.words}
                </h3>
                <h3>
                  <span className="font-semibold text-md text-blue">
                    Time :
                  </span>{" "}
                  {item.time}
                </h3>
                <h3>
                  <span className="font-semibold text-md text-blue">
                    Status :{" "}
                  </span>
                  {item.status}
                </h3>
                <div
                  className={`absolute top-0 right-0 w-2 h-2 rounded-full ${
                    item.status == "completed"
                      ? "bg-blue"
                      : item.status == "onhold"
                      ? "bg-yellow"
                      : item.status == "fail"
                      ? "bg-red"
                      : "bg-green"
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl text-blue font-bold my-4">Metrics</h2>
        <div className="flex justify-between items-center">
          <div className="w-1/2">
            <DoughnutChart />
          </div>
          <div className="w-1/2">
            <DoughnutChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SprintHistoryCard;
