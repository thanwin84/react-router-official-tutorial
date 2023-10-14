import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError()
    console.log(error)
  return (
    <div className="flex h-screen justify-center items-center bg-gray-200">
      <div className="text-center p-8 bg-white rounded shadow-lg">
        <h1 className="text-4xl font-bold text-red-500">Oops!</h1>
        <p className="text-gray-600 text-lg">Sorry, an unexpected error has occurred</p>
        <p>
          <i className="italic text-gray-500">{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}
