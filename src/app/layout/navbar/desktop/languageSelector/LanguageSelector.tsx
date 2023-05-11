import SelectList from "@/components/selectList/SelectList";
import { useState } from "react";

const languages = [
  {
    name: "English",
    value: "english",
  },
  {
    name: "Spanish",
    value: "spanish",
  },
];

function LanguageSelector() {
  const [language, setLanguage] = useState(languages[1]);
  const buttonClass =
    "relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm text-gray-300 hover:bg-gray-700 hover:text-white  font-small";

  return (
    <SelectList
      items={languages}
      selected={language}
      setSelected={setLanguage}
      buttonClass={buttonClass}
    />
  );
}

export default LanguageSelector;
