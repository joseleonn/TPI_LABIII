import React from "react";

const Alerts = ({ message }) => {
  return (
    <div className="bg-red-100 rounded-md p-2 border border-red-400 text-red-700 text-center relative">
      <span>{message}</span>
    </div>
  );
};

export default Alerts;
