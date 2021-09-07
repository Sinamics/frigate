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
  const apiHost = useApiHost();
  const { data, status, deletedId } = useEvents(`include_thumbnails=0&limit=25`);
  // const timeDistance = timEnd - timStart;
  // const nP = timeDistance / time.length;
  // console.log(nP);

  const minTime = data && Math.min(...data.map((f) => new Date(f.start_time * 1000)));
  const maxTime = data && Math.max(...data.map((f) => new Date(f.start_time * 1000)));

  let deviation = maxTime - minTime;

  return (
    <footer className="footerTimeline flex absolute bottom-0 h-16 sm:h-20 m-0 p-0 border-t">
      <div className={`relative flex-1 bg-white dark:bg-gray-800 overflow-hidden text-center`}>
        {data &&
          data.map((prop, idx) => {
            var today = new Date(prop.start_time * 1000);
            let g = new Date(prop.start_time * 1000) - minTime;
            var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
            return (
              <span className="">
                <span
                  className="border-b-2  border-yellow-500"
                  style={{ position: 'absolute', top: 0, left: Math.floor((g / deviation) * 100) + '%' }}
                >
                  <span style={{ fontSize: 9 }}>{time}</span>
                  <img
                    width="60"
                    src={
                      prop.has_snapshot
                        ? `${apiHost}/clips/${prop.camera}-${prop.id}.jpg`
                        : `prop:image/jpeg;base64,${prop.thumbnail}`
                    }
                    alt={`${prop.label} at ${(prop.top_score * 100).toFixed(1)}% confidence`}
                  />
                </span>
              </span>
            );
          })}
      </div>
    </footer>
  );
};

export default Timeline;
