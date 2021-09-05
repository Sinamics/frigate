import { h, FunctionalComponent } from 'preact';
import Button from './Button';
import Heading from './Heading';
import { reducer } from '../views/Events/reducer';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'preact/hooks';
import { useApiHost, useConfig, useEvents } from '../api';
interface IBox {
  className: string;
  content: string;
  elevated: boolean;
  buttons: any;
  href: any;
  header: any;
  icons: any;
  media: any;
  stretch: any;
}
const initialState = Object.freeze({ events: [], reachedEnd: false, searchStrings: {}, deleted: 0 });

const Timeline: FunctionalComponent<IBox> = ({
  buttons = [],
  className = '',
  content,
  elevated = true,
  header,
  href,
  icons = [],
  media = null,
  ...props
}) => {
  const Element = href ? 'a' : 'div';

  const typeClasses = elevated
    ? 'shadow-md hover:shadow-lg transition-shadow'
    : 'border border-gray-200 dark:border-gray-700';
  const time = [
    {
      time: 1630650668945,
      name: 'point1',
    },
    {
      time: 1630650648945,
      name: 'point1',
    },
    {
      time: 1630650628945,
      name: 'point1',
    },
    {
      time: 1630650618945,
      name: 'point1',
    },
  ];

  const timStart = time[0].time;
  const timEnd = time[time.length - 1].time;
  const [{ events, reachedEnd, searchStrings, deleted }, dispatch] = useReducer(reducer, initialState);

  const { data, status, deletedId } = useEvents();
  // const timeDistance = timEnd - timStart;
  // const nP = timeDistance / time.length;
  // console.log(nP);

  const minTime = data && Math.min(...data.map((f) => new Date(f.start_time).getTime()));
  const maxTime = data && Math.max(...data.map((f) => new Date(f.start_time).getTime()));

  let deviation = maxTime - minTime;
  let multiplier = 100 / deviation;

  // console.log(maxTime);
  return (
    <footer className="footerTimeline flex absolute bottom-0 h-16 sm:h-20 m-0 p-0 border-t">
      <div className={`relative flex-1 bg-white dark:bg-gray-800 overflow-hidden text-center`}>
        {/* Timeline  */}
        <p>Timeline goes here</p>
        {data &&
          data.map((prop, idx) => {
            let s = prop.start_time - minTime;
            console.log(multiplier * prop.start_time);
            // console.log(Math.floor(multiplier * s));
            // console.log(prop.start_time - (minTime / 100) * deviation);
            return <span style={{ position: 'absolute', left: Math.floor(multiplier * s) + '%' }}>T</span>;
          })}
      </div>
    </footer>
  );
};

export default Timeline;
