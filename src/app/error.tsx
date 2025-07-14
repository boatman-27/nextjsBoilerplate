"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-red-900 px-6">
      <h1 className="text-4xl font-bold mb-4">
        😞 Oops! Something went wrong.
      </h1>
      <p className="text-lg max-w-md text-center mb-8">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-red-900 text-white rounded-md font-semibold hover:bg-red-800 transition"
      >
        Try Again
      </button>
    </div>
  );
}
