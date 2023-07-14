import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-700">
      <h1 className="text-6xl mb-4">404</h1>
      <p className="text-2xl">Oops, you went to a wrong page!</p>
    </div>
  );
};

export default NotFoundPage;
