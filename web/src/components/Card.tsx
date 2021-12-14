import { h, FunctionalComponent } from 'preact';
import Button from './Button';
import Heading from './Heading';

interface IBox {
  className?: string;
  content?: string;
  elevated?: boolean;
  buttons: any;
  href: any;
  header: any;
  icons: any;
  media: any;
  stretch?: any;
}

const Box: FunctionalComponent<IBox> = ({
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

  return (
    <div className="border border-gray-600">
      <div className="border-b border-gray-600 bg-gradient-to-b from-gray-700 text-xs tracking-wider flex justify-between">
        {/* Top header here  */}
        <div className="pl-1 flex items-center">{header}</div>
        <div className="text-right">
          {icons.map(({ name, icon: Icon, ...props }: any) => (
            <Button aria-label={name} className="py-0 rounded-full" key={name} type="text" {...props}>
              <Icon className="w-4" />
            </Button>
          ))}
        </div>
      </div>
      <div className={`bg-white dark:bg-gray-800 overflow-hidden ${typeClasses} ${className}`}>
        {media || header ? (
          <Element {...props}>
            {media}
            {/* <div className="p-4 pb-2">{header ? <Heading size="base">{header}</Heading> : null}</div> */}
          </Element>
        ) : null}
        {/* {buttons.length || content || icons.length ? (
        <div className="px-4 pb-2">
          {content || null}
          {buttons.length ? (
            <div className="flex space-x-4 -ml-2">
              {buttons.map(({ name, href }: any) => (
                <Button key={name} href={href} type="text">
                  {name}
                </Button>
              ))}
              <div class="flex-grow" />
              {icons.map(({ name, icon: Icon, ...props }: any) => (
                <Button aria-label={name} className="rounded-full" key={name} type="text" {...props}>
                  <Icon className="w-6" />
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null} */}
      </div>
    </div>
  );
};

export default Box;
