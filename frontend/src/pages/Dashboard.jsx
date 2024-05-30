import React, { useState, useEffect } from "react";
import { PencilIcon, DateIcon, PersonIcon } from "../utils/icons";
import { Link } from "react-router-dom";
import cover from "../assets/cover.png";
import DashboardButtons from "../components/buttons/DashboardButtons";
import NeedleChart from "../charts/NeedleChart";
import DoughnutChart from "../charts/DoughnutChart";
import { headers, getAllProjects, getUserInformation } from "../utils/urls";
import { errorToast } from "../utils/notifications";
import { useDispatch } from "react-redux";
import { Login as loginAction } from "../store/userSlice";

const Options = [
  { id: 1, option: "Edit" },
  { id: 2, option: "Export" },
  { id: 3, option: "Delete" },
];

const Dashboard = () => {
  const [menuStates, setMenuStates] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  const toggleMenu = (index) => {
    setMenuStates((prev) => {
      const updatedStates = [...prev];
      updatedStates[index] = !updatedStates[index];
      return updatedStates;
    });
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        let response = await fetch(getUserInformation, {
          method: "GET",
          headers,
          credentials: "include",
        });

        response = await response.json();

        if (response.success === true) {
          setUser(response.data);
          dispatch(loginAction(response.data));
        } else {
          throw new Error(response.message || "Failed to fetch user data");
        }
      } catch (error) {
        setError(error.message);
        errorToast(error.message);
      }
    };
    getUserData();
  }, [dispatch]);

  useEffect(() => {
    const getProjectsData = async () => {
      try {
        let response = await fetch(getAllProjects, {
          method: "GET",
          headers,
          credentials: "include",
        });

        response = await response.json();
        console.log(response);
        if (response.success === true) {
          setData(response.data);
          setMenuStates(new Array(response.data.length).fill(false));
        } else {
          throw new Error(response.message || "Failed to fetch projects data");
        }
      } catch (error) {
        setError(error.message);
        errorToast(error.message);
      } finally {
        setLoading(false);
      }
    };
    getProjectsData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="bg-gray-200">
      <div className="p-4 max-w-7xl mx-auto mt-[90px]">
        <div className="top max-w-xl mx-auto mt-3 flex justify-center items-center gap-8 md:gap-10 bg-white py-8 rounded-md flex-col md:flex-row">
          <div className="left-side w-16 h-16 rounded-full bg-yellow grid place-items-center overflow-hidden">
            <img src={user?.profileImage} alt={user?.fullname} />
          </div>
          <div className="right-side mt-4 md:mt-0">
            <h4 className="font-bold text-center md:text-left text-lg">
              {user?.fullname}
            </h4>
            <div className="flex justify-center items-center gap-2">
              <p>Age {user?.age}</p>
              <span>.</span>
              <p>{user?.occupation}</p>
              <span>.</span>
              <p>{user?.location}</p>
            </div>
          </div>
        </div>
        <div className="middle flex flex-col sm:flex-row justify-center items-center gap-3 my-7">
          <p className="flex justify-between items-center gap-1 bg-white rounded-full py-1 px-3 text-sm">
            {DateIcon} <span>Joined: {user?.joinDate}</span>
          </p>
          <p className="flex justify-between items-center gap-1 bg-white rounded-full py-1 px-3 text-sm">
            {PersonIcon} <span>Last Active: {user?.lastActive}</span>
          </p>
        </div>
        <div className="bottom bg-white p-4 rounded-md">
          <div className="top flex justify-between items-center mb-5">
            <h2 className="text-2xl text-blue font-bold">Projects</h2>
            <Link
              to="/dashboard/create-new-project"
              className="flex justify-center items-center gap-2 text-sm bg-yellow rounded-full px-3 py-1"
            >
              {PencilIcon}Create New Project
            </Link>
          </div>
          <div className="flex justify-between flex-wrap items-center gap-2 md:justify-between rounded-md">
            {data.map((item, index) => (
              <Link
                key={item.id}
                to={`/dashboard/editor/${item.id}`}
                className="w-full  min-w-[250px] md:w-[300px] border border-blue text-center"
              >
                <div className="item-image flex justify-center">
                  <img src={item.image || cover} alt={item.title} />
                </div>
                <div className="textual-content max-w-[75%] mx-auto p-2">
                  <h3 className="text-blue text-xl font-bold">{item.title}</h3>
                  <p className="text-purple-400">
                    <span className="text-blue font-semibold">
                      Word Count -{" "}
                    </span>{" "}
                    {item.wordcount}
                  </p>
                  <p className="text-yellow">
                    <span className="font-semibold">Time Spent - </span>
                    {item.timespent}
                  </p>
                  <div className="flex justify-between items-center my-2 mx-auto">
                    <DashboardButtons type={item.status} text={item.status} />
                    <div className="relative">
                      <div
                        className="font-bold cursor-pointer"
                        onClick={() => toggleMenu(index)}
                      >
                        ...
                      </div>
                      {menuStates[index] && (
                        <div className="absolute -top-36 right-0 w-32 bg-white border rounded-md py-3 drop-shadow-md">
                          <ul>
                            {Options.map((opt) => (
                              <li
                                key={opt.id}
                                className="text-navyblue mb-1 text-center p-2 hover:bg-gray-100 cursor-pointer"
                              >
                                {opt.option}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bottom bg-white p-4 rounded-md mt-5">
          <div className="top mb-5">
            <h2 className="text-2xl text-blue font-bold text-center lg:text-left">
              Overall Statistics
            </h2>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-5 md:gap-2 md:justify-between rounded-md">
            <div className="left w-full md:w-1/2 flex justify-center">
              <DoughnutChart />
            </div>
            <div className="right w-full md:w-1/2">
              <NeedleChart />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
