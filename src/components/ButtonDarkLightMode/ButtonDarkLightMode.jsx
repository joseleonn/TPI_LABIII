import { useContext } from "react";
import { ModeContext } from "../../context/DarkLightModeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
const ButtonDarkLightMode = () => {
  const { mode, modeHandler } = useContext(ModeContext);

  return (
    <div className="mt-2">
      <button
        className={`bg-transparent focus:outline-none border-none ${
          mode === "light" ? "text-gray-800" : "text-white"
        }`}
        onClick={modeHandler}
      >
        {mode === "dark" ? (
          <SunIcon className="h-6 w-6" />
        ) : (
          <MoonIcon className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};

export default ButtonDarkLightMode;
