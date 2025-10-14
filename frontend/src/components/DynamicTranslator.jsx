import React, { useState } from "react";
import { translateText } from "../utils/translate";

const DynamicTranslator = () => {
  const [input, setInput] = useState("");
  const [translated, setTranslated] = useState("");

  const handleTranslate = async () => {
    const result = await translateText(input, "kn"); // Kannada
    setTranslated(result);
  };

  return (
    <div className="p-6 text-center">
      <input
        type="text"
        placeholder="Type any English text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 rounded w-1/2"
      />
      <button
        onClick={handleTranslate}
        className="ml-2 px-4 py-2 bg-green-500 text-white rounded"
      >
        Translate
      </button>

      {translated && (
        <p className="mt-4 text-xl font-semibold text-gray-700">
          Kannada: {translated}
        </p>
      )}
    </div>
  );
};

export default DynamicTranslator;
