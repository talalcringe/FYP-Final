import React, { useState } from "react";
import ExtraButtons from "../buttons/ExtraButtons";

const CharacterOutline = ({ action }) => {
  const [name, setName] = useState("");
  const [skin, setSkin] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [build, setBuild] = useState("");
  const [gender, setGender] = useState("");
  const [hairColor, setHairColor] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [distinctiveFeatures, setDistinctiveFeatures] = useState("");
  const [familyBackground, setFamilyBackground] = useState("");
  const [education, setEducation] = useState("");
  const [career, setCareer] = useState("");
  const [traumas, setTraumas] = useState("");
  const [achievements, setAchievements] = useState("");
  const [secrets, setSecrets] = useState("");
  const [personalityTraits, setPersonalityTraits] = useState("");
  const [motivation, setMotivation] = useState("");
  const [beliefs, setBeliefs] = useState("");
  const [strengths, setStrengths] = useState("");
  const [weaknesses, setWeaknesses] = useState("");
  const [arc, setArc] = useState("");
  const [dialogue, setDialogue] = useState("");
  const [likes, setLikes] = useState("");
  const [dislikes, setDislikes] = useState("");
  const [relationships, setRelationships] = useState("");
  const [internalConflicts, setInternalConflicts] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "skin":
        setSkin(value);
        break;
      case "height":
        setHeight(value);
        break;
      case "age":
        setAge(value);
        break;
      case "build":
        setBuild(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "hairColor":
        setHairColor(value);
        break;
      case "eyeColor":
        setEyeColor(value);
        break;
      case "distinctiveFeatures":
        setDistinctiveFeatures(value);
        break;
      case "familyBackground":
        setFamilyBackground(value);
        break;
      case "education":
        setEducation(value);
        break;
      case "career":
        setCareer(value);
        break;
      case "traumas":
        setTraumas(value);
        break;
      case "achievements":
        setAchievements(value);
        break;
      case "secrets":
        setSecrets(value);
        break;
      case "personalityTraits":
        setPersonalityTraits(value);
        break;
      case "motivation":
        setMotivation(value);
        break;
      case "beliefs":
        setBeliefs(value);
        break;
      case "strengths":
        setStrengths(value);
        break;
      case "weaknesses":
        setWeaknesses(value);
        break;
      case "arc":
        setArc(value);
        break;
      case "dialogue":
        setDialogue(value);
        break;
      case "likes":
        setLikes(value);
        break;
      case "dislikes":
        setDislikes(value);
        break;
      case "relationships":
        setRelationships(value);
        break;
      case "internalConflicts":
        setInternalConflicts(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Character profile:", {
      name,
      skin,
      height,
      age,
      build,
      gender,
      hairColor,
      eyeColor,
      distinctiveFeatures,
      familyBackground,
      education,
      career,
      traumas,
      achievements,
      secrets,
      personalityTraits,
      motivation,
      beliefs,
      strengths,
      weaknesses,
      arc,
      dialogue,
      likes,
      dislikes,
      relationships,
      internalConflicts,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="px-4">
      <div className="flex justify-center items-center mb-5 gap-4">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          className="w-[50%] border p-1 border-blue"
        />
      </div>
      <div className="flex justify-between gap-5">
        <div className="w-1/2 border border-black mb-1 p-2">
          <h4 className="text-xl font-semibold mb-2 text-center">
            The “Skin” - Outer Appearance
          </h4>
          <div className="flex justify-between items-center gap-2 mb-1">
            <label className="w-2/6 text-sm">Skin:</label>
            <input
              type="text"
              name="skin"
              value={skin}
              onChange={handleChange}
              className="w-5/6 border p-1 border-blue"
            />
          </div>
          <div className="flex justify-between items-center gap-2 mb-1">
            <label className="w-2/6 text-sm">Height:</label>
            <input
              type="text"
              name="height"
              value={height}
              onChange={handleChange}
              className="w-5/6 border p-1 border-blue"
            />
          </div>
          <div className="flex justify-between items-center gap-2 mb-1">
            <label className="w-2/6 text-sm">Age:</label>
            <input
              type="text"
              name="age"
              value={age}
              onChange={handleChange}
              className="w-5/6 border p-1 border-blue"
            />
          </div>
          <div className="flex justify-between items-center gap-2 mb-1">
            <label className="w-2/6 text-sm">Build:</label>
            <input
              type="text"
              name="build"
              value={build}
              onChange={handleChange}
              className="w-5/6 border p-1 border-blue"
            />
          </div>
          <div className="flex justify-between items-center gap-2 mb-1">
            <label className="w-2/6 text-sm">Gender:</label>
            <input
              type="text"
              name="gender"
              value={gender}
              onChange={handleChange}
              className="w-5/6 border p-1 border-blue"
            />
          </div>
          <div className="flex justify-between items-center gap-2 mb-1">
            <label className="w-2/6 text-sm">Hair Color:</label>
            <input
              type="text"
              name="hairColor"
              value={hairColor}
              onChange={handleChange}
              className="w-5/6 border p-1 border-blue"
            />
          </div>
          <div className="flex justify-between items-center gap-2 mb-1">
            <label className="w-2/6 text-sm">Eye Color:</label>
            <input
              type="text"
              name="eyeColor"
              value={eyeColor}
              onChange={handleChange}
              className="w-5/6 border p-1 border-blue"
            />
          </div>
          <div className="flex justify-between items-center gap-2 mb-1">
            <label className="w-2/6 text-sm">Distinctive Features:</label>
            <input
              type="text"
              name="distinctiveFeatures"
              value={distinctiveFeatures}
              onChange={handleChange}
              className="w-5/6 border p-1 border-blue"
            />
          </div>
        </div>

        <div className="w-1/2 border border-black p-2 mb-1 ">
          <h4 className="text-xl font-semibold mb-2 text-center">
            The “Flesh” - Backstory
          </h4>

          <div className="flex justify-between items-center gap-2 mb-1">
            <label className="w-2/6 text-sm">Family Background:</label>
            <input
              type="text"
              name="familyBackground"
              value={familyBackground}
              onChange={handleChange}
              className="w-5/6 border p-1 border-blue"
            />
          </div>
          <div className="flex justify-between items-center gap-2 mb-1">
            <label className="w-2/6 text-sm">Education:</label>
            <input
              type="text"
              name="education"
              value={education}
              onChange={handleChange}
              className="w-5/6 border p-1 border-blue"
            />
          </div>
          <div className="flex justify-between items-center gap-2 mb-1">
            <label className="w-2/6 text-sm">Career:</label>
            <input
              type="text"
              name="career"
              value={career}
              onChange={handleChange}
              className="w-5/6 border p-1 border-blue"
            />
          </div>
          <div className="flex justify-between items-center gap-2 mb-1">
            <label className="w-2/6 text-sm">Traumas:</label>
            <input
              type="text"
              name="traumas"
              value={traumas}
              onChange={handleChange}
              className="w-5/6 border p-1 border-blue"
            />
          </div>
          <div className="flex justify-between items-center gap-2 mb-1">
            <label className="w-2/6 text-sm">Achievements:</label>
            <input
              type="text"
              name="achievements"
              value={achievements}
              onChange={handleChange}
              className="w-5/6 border p-1 border-blue"
            />
          </div>
          <div className="flex justify-between items-center gap-2 mb-1">
            <label className="w-2/6 text-sm">Secrets:</label>
            <input
              type="text"
              name="secrets"
              value={secrets}
              onChange={handleChange}
              className="w-5/6 border p-1 border-blue"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-5">
        <div className="w-1/2 border border-black p-2 mb-1 ">
          <h4 className="text-xl font-semibold mb-2 text-center">
            The “Core” - Psychology
          </h4>
          <div className="flex justify-between items-center gap-2 mb-1">
            <label className="w-2/6 text-sm">Personality Traits:</label>
            <input
              type="text"
              name="personalityTraits"
              value={personalityTraits}
              onChange={handleChange}
              className="w-5/6 border p-1 border-blue"
            />
          </div>
          <div className="flex justify-between items-center gap-2 mb-1">
            <label className="w-2/6 text-sm">Motivation:</label>
            <input
              type="text"
              name="motivation"
              value={motivation}
              onChange={handleChange}
              className="w-5/6 border p-1 border-blue"
            />
          </div>
          <div className="flex justify-between items-center gap-2 mb-1">
            <label className="w-2/6 text-sm">Beliefs:</label>
            <input
              type="text"
              name="beliefs"
              value={beliefs}
              onChange={handleChange}
              className="w-5/6 border p-1 border-blue"
            />
          </div>
          <div className="flex justify-between items-center gap-2 mb-1">
            <label className="w-2/6 text-sm">Strengths:</label>
            <input
              type="text"
              name="strengths"
              value={strengths}
              onChange={handleChange}
              className="w-5/6 border p-1 border-blue"
            />
          </div>
          <div className="flex justify-between items-center gap-2 mb-1">
            <label className="w-2/6 text-sm">Weaknesses:</label>
            <input
              type="text"
              name="weaknesses"
              value={weaknesses}
              onChange={handleChange}
              className="w-5/6 border p-1 border-blue"
            />
          </div>
          <div className="flex justify-between items-center gap-2 mb-1">
            <label className="w-2/6 text-sm">Arc:</label>
            <input
              type="text"
              name="arc"
              value={arc}
              onChange={handleChange}
              className="w-5/6 border p-1 border-blue"
            />
          </div>
        </div>

        <div className="w-1/2 border border-black p-2 mb-1 ">
          <h4 className="text-xl font-semibold mb-2 text-center">
            Additional Information
          </h4>
          <div className="flex justify-between items-center gap-2 mb-1">
            <label className="w-2/6 text-sm">Dialogue:</label>
            <input
              type="text"
              name="dialogue"
              value={dialogue}
              onChange={handleChange}
              className="w-5/6 border p-1 border-blue"
            />
          </div>
          <div className="flex justify-between items-center gap-2 mb-1">
            <label className="w-2/6 text-sm">Likes:</label>
            <input
              type="text"
              name="likes"
              value={likes}
              onChange={handleChange}
              className="w-5/6 border p-1 border-blue"
            />
          </div>
          <div className="flex justify-between items-center gap-2 mb-1">
            <label className="w-2/6 text-sm">Dislikes:</label>
            <input
              type="text"
              name="dislikes"
              value={dislikes}
              onChange={handleChange}
              className="w-5/6 border p-1 border-blue"
            />
          </div>
          <div className="flex justify-between items-center gap-2 mb-1">
            <label className="w-2/6 text-sm">Relationships:</label>
            <input
              type="text"
              name="relationships"
              value={relationships}
              className="w-5/6 border p-1 border-blue"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between items-center gap-2 mb-1">
            <label className="w-2/6 text-sm">Internal Conflicts:</label>
            <input
              type="text"
              name="internalConflicts"
              value={internalConflicts}
              onChange={handleChange}
              className="w-5/6 border p-1 border-blue"
            />
          </div>
        </div>
      </div>
      <div className="controls flex justify-between items-center gap-10 max-w-sm mx-auto mt-4">
        <ExtraButtons type="green" text="Submit" />
        <ExtraButtons type="red" text="Cancel" action={action} />
      </div>
    </form>
  );
};

export default CharacterOutline;
