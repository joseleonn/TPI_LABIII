import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoadingSpinner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center text-black bg-white bg-opacity-50 z-50">
      <FontAwesomeIcon className="h-24 w-24" icon={faSpinner} spin />
    </div>
  );
};

export default LoadingSpinner;
