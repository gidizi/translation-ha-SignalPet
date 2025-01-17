import { useState } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "../api/axiosInstance";
import axios from "axios";

const LanguageSelectionSection = () => {
  //todo consider getting value from context or local storage (although might not be on same format)
  const [langInput, setLangInput] = useState("");
  const { i18n } = useTranslation();

  //notes:
  //this function makes preliminary request which reduces performance.
  //I decided to use this solution for now in order to avoid multiple failing requests from different components + having a central place for the notification logic for the user
  //This solution will surely has to be refactored for production
  async function verifyLanugageAvailablity(lang: string) {
    try {
      //todo: should be replaced with dedicated lightweight api at the backend
      const findings = await axiosInstance.get(
        `/findings/normal/1?lang=${lang}`
      );
    } catch (error) {
      //production note: checking errors based on text isn't best practice
      //work with key, and try to sync keys between frontend and backend (by shared library or workspace for example)
      if (
        axios.isAxiosError(error) &&
        error?.response?.status === 400 &&
        error.response.data?.message?.includes("is not supported")
      ) {
        alert(`${langInput} is not supported`);
      }
      throw error;
    }
  }

  async function handleLanguageUpdate() {
    try {
      await verifyLanugageAvailablity(langInput);
      i18n.changeLanguage(langInput);
    } catch (error) {
      console.log("could not change to the detecte language");
    }
  }

  return (
    <div>
      <span>Select Language: </span>
      <input
        type="text"
        value={langInput}
        onChange={(e) => setLangInput(e.target.value)}
      />
      <button type="button" onClick={handleLanguageUpdate}>
        Apply
      </button>
    </div>
  );
};

export default LanguageSelectionSection;
