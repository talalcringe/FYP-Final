import React from "react";
import audiogif from "../assets/audiogif.gif";
import chatbotgif from "../assets/chatbotgif.gif";
import editorgif from "../assets/editorgif.gif";
import backupicon from "../assets/backup-icon.png";
import chatboticon from "../assets/chatbot-icon.png";
import exportingicon from "../assets/exporting-icon.png";
import texteditoricon from "../assets/testeditor-icon.png";
import timericon from "../assets/timer-icon.png";

const Home = () => {
  return (
    <>
      <section className="relative h-[90vh] mt-[90px] text-white bgimage">
        <div className="relative flex justify-around items-start ">
          <div className="w-1/2 text-left m-20 h-full flex flex-col items-between z-[898]">
            <div>
              <h1 className="text-6xl font-londrina">
                Write your incredible stories,
                <br /> one word at a time
              </h1>
              <p className="mt-6 font-londrina font-light">
                Set Goals - Eliminate Distractions - Inspire Momentum
              </p>
            </div>
            <div className="flex items-center mt-10">
              <a
                href="#features"
                className="mt-6 bg-white text-cerulean py-3 px-6 rounded-full text-lg font-bold"
              >
                Learn More
              </a>
              <p className="mt-4 p-2 font-londrina">
                The first step is always the hardest
              </p>
            </div>
          </div>
          <div className="w-1/2"></div>
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)] transition-all h-[90vh]"></div>
        </div>
      </section>

      <section id="features" className="m-8 ml-12 font-londrina text-cerulean">
        <h2 className="text-3xl text-left ml-6 ">Features</h2>
        <div className="flex mt-6">
          <div className="bg-white p-6 w-1/5">
            <img
              src={backupicon}
              alt="Seamless Backup Icon"
              className="mx-auto mb-4"
            />
            <h3 className="font-bold text-lg ">Seamless Backup-</h3>
            <p className="font-light">
              Your data will never be lost with our multi-step data backup
              strategies
            </p>
          </div>
          <div className="bg-white p-6 w-1/5">
            <img
              src={chatboticon}
              alt="AI Assistant Icon"
              className="mx-auto mb-4"
            />
            <h3 className="font-bold text-lg ">AI Assistant-</h3>
            <p className="font-light">
              You will never be lost with our chatbot assisting you
            </p>
          </div>
          <div className="bg-white p-6 w-1/5">
            <img
              src={exportingicon}
              alt="EPUB Exporting Icon"
              className="mx-auto mb-4"
            />
            <h3 className="font-bold text-lg ">EPUB Exporting-</h3>
            <p className="font-light">
              Export your project ready to be published as soon as you are
            </p>
          </div>
          <div className="bg-white p-6 w-1/5">
            <img
              src={texteditoricon}
              alt="Text Editor Icon"
              className="mx-auto mb-4"
            />
            <h3 className="font-bold text-lg ">Text Editor-</h3>
            <p className="font-light">
              With our state-of-the-art text editor, have full control over what
              how you choose to write
            </p>
          </div>
          <div className="bg-white p-6 w-1/5">
            <img
              src={timericon}
              alt="Sprinting Icon"
              className="mx-auto mb-4"
            />
            <h3 className="font-bold text-lg ">Sprinting-</h3>
            <p className="font-light">
              Be on top of your productivity with the ability to initiate, track
              and improve your sprints through time
            </p>
          </div>
        </div>
      </section>
      <section className="flex items-center bg-cerulean justify-center mx-20 p-12 rounded-lg my-8 font-londrina">
        <div className="w-1/2 h-full mx-5 p-5">
          <img className="h-full w-full" src={chatbotgif} alt="img here" />
        </div>
        <div className="w-1/2 mx-5">
          <h2 className="text-3xl font-bold text-white text-right">
            Be equipped with tools that{" "}
            <span className="text-emerald">motivate</span> you to keep writing
          </h2>
          <ul className="list-disc list-inside mt-4 text-white font-light">
            <li>
              Time and length based sprinting for simulating pressure and
              getting work done efficiently.
            </li>
            <li>
              Never get stuck with our AI Assistant ready to help you through
              your problems.
            </li>
          </ul>
        </div>
      </section>
      <section className="flex items-center bg-cerulean justify-center mx-20 p-12 rounded-lg my-8 font-londrina">
        <div className="w-1/2 mx-5">
          <h2 className="text-3xl font-bold text-white text-left">
            Have full <span className="text-emerald">control</span> over
            workflow
          </h2>
          <ul className="list-disc list-inside mt-4 text-white font-light">
            <li>
              Block-style text editor for full control over your documents
              formatting.
            </li>
            <li>
              Upload your custom images and use them in your content as you
              please.
            </li>
          </ul>
        </div>
        <div className="w-1/2 h-full mx-5 p-5">
          <img className="h-full w-full" src={editorgif} alt="img here" />
        </div>
      </section>
      <section className="flex items-center bg-cerulean mx-20 p-12 rounded-lg justify-center my-8 font-londrina">
        <div className="w-1/2 h-full mx-5 p-5">
          <img className="h-full w-full" src={audiogif} alt="img here" />
        </div>
        <div className="w-1/2 mx-5">
          <h2 className="text-3xl font-bold text-white text-right">
            You will never lose <span className="text-emerald">focus</span>{" "}
            while working again
          </h2>
          <ul className="list-disc list-inside mt-4 text-white font-light">
            <li>
              Ambient noise to keep you in the zone and free from distractions
              when you work.
            </li>
            <li>
              Never be concerned about losing data as we will automatically be
              backing it up locally and via cloud automatically.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Home;
