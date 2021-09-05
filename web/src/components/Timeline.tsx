import { h, FunctionalComponent } from 'preact';
import Button from './Button';
import Heading from './Heading';

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

  // const timeDistance = timEnd - timStart;
  // const nP = timeDistance / time.length;
  // console.log(nP);
  return (
    <footer className="footerTimeline flex absolute bottom-0 h-16 sm:h-20 m-0 p-0 border-t">
      <div className={`flex-1 bg-white dark:bg-gray-800 overflow-hidden text-center`}>
        {/* Timeline  */}
        <p>Timeline goes here</p>
        {/* {time.map((prop, idx) => {
          return <span className="">{prop.name}</span>;
        })} */}
      </div>
    </footer>
  );
};

export default Timeline;
