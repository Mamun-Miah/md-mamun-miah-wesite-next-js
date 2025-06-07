import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faHeadset } from '@fortawesome/free-solid-svg-icons';
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';

// Define the props interface for the Card component
interface CardProps {
  title?: string;
  details?: string;
  image?: string;
  bg?: string;
}


const SingleServiceCard : React.FC<CardProps>= ({
  title = 'Default Title',
  details = 'Default Details',
  image = '',
  bg = '',
  
}) => {
  const getIcon = () => {
    switch (image) {
      case 'fa-solid fa-laptop-code text-[100px] text-[#48CDA0]':
        return <FontAwesomeIcon icon={faLaptopCode} className="my-2 text-[100px] text-[#48CDA0]" />;
      case 'fa-brands fa-searchengin text-[100px] text-[#FF8000]':
        return <FontAwesomeIcon icon={faSearchengin} className="my-2 text-[100px] text-[#FF8000]" />;
      case 'fa-solid fa-headset text-[100px] text-[#E6BC13]':
        return <FontAwesomeIcon icon={faHeadset} className="my-2 text-[100px] text-[#E6BC13]" />;
      default:
        return null;
    }
  };
  
    return (
    <div
      className={`h-[330px] p-6 ${bg} border border-gray-200 rounded-2xl shadow-xl dark:bg-gray-800 dark:border-gray-700 space-y-5 transition-transform duration-300 hover:scale-105`}
    >
      {getIcon()}
      <a href="#">
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-white dark:text-white">
          {title}
        </h5>
      </a>
      <p className="mb-3 font-normal text-white dark:text-gray-400">{details}</p>
    </div>
  );
}

export default SingleServiceCard