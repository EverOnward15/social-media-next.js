"use client";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import ReactTimeAgo from 'react-time-ago'
import { initializeLibrary } from './SetLocale';

initializeLibrary();



export function formatTimeAgo (date, style = "round") {
  

    
    // You can add any additional logic here
    const time = new Date(date).getTime();

    return <ReactTimeAgo date={time} timeStyle={style}/>;
    
  };
  
  export default formatTimeAgo;