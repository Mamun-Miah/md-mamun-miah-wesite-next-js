import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faHeadset, faServer, faBrain } from '@fortawesome/free-solid-svg-icons';
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
// Define the props interface for the Card component
interface CardProps {
  title?: string;
  details?: string;
  image?: string;
  bg?: string;
  link?: string; 
}


const SingleServiceCard : React.FC<CardProps>= ({
  title = 'Default Title',
  details = 'Default Details',
  image = '',
  bg = '',
  link = '#',

  
}) => {
  const getIcon = () => {
    let iconObj = null;
    if (image.includes('fa-laptop-code')) iconObj = faLaptopCode;
    else if (image.includes('fa-server')) iconObj = faServer;
    else if (image.includes('fa-searchengin')) iconObj = faSearchengin;
    else if (image.includes('fa-headset')) iconObj = faHeadset;
    else if (image.includes('fa-brain')) iconObj = faBrain;

    if (!iconObj) return null;

    const classes = image
      .split(' ')
      .filter(cls => !cls.startsWith('fa-') && cls !== 'fa' && cls !== 'fa-solid' && cls !== 'fa-brands')
      .join(' ');

    return <FontAwesomeIcon icon={iconObj} className={`my-2 ${classes}`} />;
  };
  
    return (
    <div
      className={`min-w-0 min-h-[330px] h-full p-6 xl:p-8 ${bg} border border-gray-200 rounded-[2.5rem] shadow-xl dark:bg-gray-800 dark:border-gray-700 space-y-5 transition-transform duration-300 hover:scale-[1.03] overflow-hidden`}
    >
      {getIcon()}
      <Link href={link}>
        <h3 className="mb-2 text-xl sm:text-2xl font-semibold tracking-tight text-gray-200 dark:text-white [overflow-wrap:anywhere]">
          {title}
        </h3>
      </Link>
      <p className="mb-3 font-normal leading-relaxed text-gray-300 dark:text-gray-400 [overflow-wrap:anywhere]">{details}</p>
    </div>
  );
}

export default SingleServiceCard
