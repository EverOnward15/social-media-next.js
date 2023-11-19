import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import ReactTimeAgo from 'react-time-ago'

TimeAgo.addDefaultLocale(en);

export function formatTimeAgo(date) {
    return <ReactTimeAgo date={date}></ReactTimeAgo>
}