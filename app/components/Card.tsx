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
      className={`min-w-0 min-h-[330px] h-full p-6 ${bg} border border-gray-200 rounded-[2.5rem] shadow-xl dark:bg-gray-800 dark:border-gray-700 space-y-5 transition-transform duration-300 hover:scale-105 overflow-hidden`}
    >
        {geticon}
      
      <a href="#">
        <h3 className="mb-2 text-xl sm:text-2xl font-semibold tracking-tight text-gray-200 dark:text-white [overflow-wrap:anywhere]">
          {title}
        </h3>
      </a>
      <p className="mb-3 font-normal leading-relaxed text-gray-300 dark:text-gray-400 [overflow-wrap:anywhere]">{details}</p>
    </div>
  )
}

export default Card
