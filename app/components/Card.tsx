import React from 'react'



interface Card {
  title?: string;
  details?: string;
  geticon?: React.ReactNode;
  bg?: string;
}

const Card: React.FC<Card> = ({
    title = 'Default Title',
    details = 'Default Details',
    geticon = '',
    bg = '',
}) => {
  return (
    <div
      className={`h-[330px] p-6 ${bg} border border-gray-200 rounded-2xl shadow-xl dark:bg-gray-800 dark:border-gray-700 space-y-5 transition-transform duration-300 hover:scale-105`}
    >
        {geticon}
      
      <a href="#">
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-200 dark:text-white">
          {title}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-300 dark:text-gray-400">{details}</p>
    </div>
  )
}

export default Card