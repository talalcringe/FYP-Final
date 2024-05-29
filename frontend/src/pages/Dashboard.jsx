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

const ProjectsData = [
  {
    id: 1,
    image:
      "https://pixabay.com/get/gc0b11d755fa0da676e3fa54c4abcf4db3ae38ce5bab13f773d3f0c106bbd6ab090ac866a06afe4083da4c8fc9366ffa7e690a7340dd89af6c16386abfa4153c157ee9439c6705bdd47a8442c71061416_640.jpg",
    title: "Some Random Title",
    wordcount: 4343,
    timespent: "12 hours 5 minutes",
    status: "active",
  },
  {
    id: 2,
    image:
      "https://pixabay.com/get/gc0b11d755fa0da676e3fa54c4abcf4db3ae38ce5bab13f773d3f0c106bbd6ab090ac866a06afe4083da4c8fc9366ffa7e690a7340dd89af6c16386abfa4153c157ee9439c6705bdd47a8442c71061416_640.jpg",
    title: "Some Random Title",
    wordcount: 12122,
    timespent: "12 hours 5 minutes",
    status: "onhold",
  },
  {
    id: 3,
    image:
      "https://pixabay.com/get/gc0b11d755fa0da676e3fa54c4abcf4db3ae38ce5bab13f773d3f0c106bbd6ab090ac866a06afe4083da4c8fc9366ffa7e690a7340dd89af6c16386abfa4153c157ee9439c6705bdd47a8442c71061416_640.jpg",
    title: "Some Random Title",
    wordcount: 5456,
    timespent: "12 hours 5 minutes",
    status: "completed",
  },
  {
    id: 4,
    image:
      "https://pixabay.com/get/gc0b11d755fa0da676e3fa54c4abcf4db3ae38ce5bab13f773d3f0c106bbd6ab090ac866a06afe4083da4c8fc9366ffa7e690a7340dd89af6c16386abfa4153c157ee9439c6705bdd47a8442c71061416_640.jpg",
    title: "Some Random Title",
    wordcount: 6565,
    timespent: "12 hours 5 minutes",
    status: "cancelled",
  },
];

const Options = [
  { id: 1, option: "Edit" },
  { id: 2, option: "Export" },
  { id: 3, option: "Delete" },
];

const Dashboard = () => {
  const [menuStates, setMenuStates] = useState(ProjectsData.map(() => false));
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

  // useEffect(() => {
  //   const fetchProjectsData = async () => {
  //     try {
  //       let response = await fetch(getAllProjects, {
  //         method: "GET",
  //         headers,
  //         credentials: "include",
  //       });

  //       response = await response.json();

  //       if (response.success == true) {
  //         console.log(response);
  //         ClearForm();
  //       } else {
  //         throw new Error(response.message || fallbackErrorMessage);
  //       }
  //     } catch (error) {
  //       setError(error.message);
  //       errorToast(error.message);
  //     }
  //   };
  //   fetchProjectsData();
  // }, []);

  useEffect(() => {
    const getUserData = async () => {
      try {
        let response = await fetch(getUserInformation, {
          method: "GET",
          headers,
          credentials: "include",
        });

        response = await response.json();

        if (response.success == true) {
          setUser(response.data);
          dispatch(loginAction(response.data));
        } else {
          throw new Error(response.message || fallbackErrorMessage);
        }
      } catch (error) {
        setError(error.message);
        errorToast(error.message);
      }
    };
    getUserData();
  }, []);

  return (
    <section className="bg-gray-200">
      <div className="p-4 max-w-7xl mx-auto mt-[90px]">
        <div className="top max-w-xl mx-auto mt-3 flex justify-center items-center gap:8  md:gap-10 bg-white py-8 rounded-md flex-col md:flex-row">
          <div className="left-side w-16 h-16 rounded-full bg-yellow grid place-items-center overflow-hidden">
            <img src={user?.profileImage} alt={user?.fullName} />
          </div>
          <div className="right-side mt-4 md:mt-0">
            <h4 className="font-bold text-center md:text-left text-lg">{}</h4>
            <div className="flex justify-center items-center gap-2">
              <p>Age 6</p>
              <span>.</span>
              <p>Student</p>
              <span>.</span>
              <p>Melbourne,Australia</p>
            </div>
          </div>
        </div>
        <div className="middle flex flex-col sm:flex-row justify-center items-center gap-3 my-7">
          <p className="flex justify-between items-center gap-1 bg-white rounded-full py-1 px-3 text-sm">
            {DateIcon} <span>Joined: March 12,2024</span>
          </p>
          <p className="flex justify-between items-center gap-1 bg-white rounded-full py-1 px-3 text-sm">
            {PersonIcon} <span>Last Active: 1d ago</span>
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
          <div className="flex flex-wrap justify-between items-center gap-2 md:justify-between rounded-md">
            {ProjectsData.map((item, index) => (
              <div
                key={item.id}
                className="w-full md:w-auto min-w-[290px] md:min-w-[250px] border border-blue text-center"
              >
                <div className="item-image flex justify-center">
                  <img src={cover} alt={item.title} />
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
              </div>
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
              {/* <BarChart /> */}
              <DoughnutChart />
            </div>
            <div className="right w-full md:w-1/2">
              <NeedleChart />
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
