import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import ReactTimeAgo from 'react-time-ago'


TimeAgo.addDefaultLocale(en);
export function formatTimeAgo (date) {
    // You can add any additional logic here
    return <ReactTimeAgo date={date} />;
  };
  
  export default formatTimeAgo;