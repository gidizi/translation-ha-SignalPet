import { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSelectionSection = () => {
  //todo consider getting value from context or local storage (although might not be on same format)
  const [langInput, setLangInput] = useState("");
  const { i18n } = useTranslation();

  return (
    <div>
      <span>Select Language: </span>
      <input
        type="text"
        value={langInput}
        onChange={(e) => setLangInput(e.target.value)}
      />
      <button type="button" onClick={() => i18n.changeLanguage(langInput)}>
        Apply
      </button>
    </div>
  );
};

export default LanguageSelectionSection;
