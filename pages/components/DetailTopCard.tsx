import React from 'react';

const DetailTopCard = ({
  name,
  stockValue,
}: {
  name: string | undefined;
  stockValue: string;
}) => {
  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-4 p-4">
        <div className="lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
          <div className="flex flex-col w-full pb-4">
            <p className="text-2xl font-bold">${stockValue}</p>
            <p className="text-gray-600">{name}</p>
          </div>
          <p className="bg-violet-200 flex justify-center items-center p-2 rounded-lg">
            <span className="text-violet-700 text-lg">+11%</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailTopCard;
