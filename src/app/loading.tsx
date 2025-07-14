import React from "react";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-2">
      {[1, 2, 3].map((rack) => (
        <div
          key={rack}
          className="flex w-24 h-6 bg-gray-800 rounded justify-between px-2 items-center"
        >
          {[1, 2, 3].map((led) => (
            <span
              key={led}
              className={`w-2 h-2 rounded-full ${
                led % 2 === 0 ? "bg-green-400" : "bg-green-200"
              } animate-pulse`}
              style={{
                animationDelay: `${(rack + led) * 200}ms`,
                animationDuration: "1.5s",
              }}
            ></span>
          ))}
        </div>
      ))}
    </div>
  );
}
