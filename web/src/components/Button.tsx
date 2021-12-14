import { h, Fragment, FunctionalComponent, ComponentChildren } from 'preact';
import Tooltip from './Tooltip';
import { useCallback, useRef, useState } from 'preact/hooks';

const ButtonColors: any = {
  blue: {
    contained: 'bg-blue-500 focus:bg-blue-400 active:bg-blue-600 ring-blue-300',
    outlined:
      'text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:bg-opacity-20 focus:bg-blue-500 focus:bg-opacity-40 active:bg-blue-500 active:bg-opacity-40',
    text:
      'text-blue-500 hover:bg-blue-500 hover:bg-opacity-20 focus:bg-blue-500 focus:bg-opacity-40 active:bg-blue-500 active:bg-opacity-40',
  },
  red: {
    contained: 'bg-red-500 focus:bg-red-400 active:bg-red-600 ring-red-300',
    outlined:
      'text-red-500 border-2 border-red-500 hover:bg-red-500 hover:bg-opacity-20 focus:bg-red-500 focus:bg-opacity-40 active:bg-red-500 active:bg-opacity-40',
    text:
      'text-red-500 hover:bg-red-500 hover:bg-opacity-20 focus:bg-red-500 focus:bg-opacity-40 active:bg-red-500 active:bg-opacity-40',
  },
  green: {
    contained: 'bg-green-500 focus:bg-green-400 active:bg-green-600 ring-green-300',
    outlined:
      'text-green-500 border-2 border-green-500 hover:bg-green-500 hover:bg-opacity-20 focus:bg-green-500 focus:bg-opacity-40 active:bg-green-500 active:bg-opacity-40',
    text:
      'text-green-500 hover:bg-green-500 hover:bg-opacity-20 focus:bg-green-500 focus:bg-opacity-40 active:bg-green-500 active:bg-opacity-40',
  },
  gray: {
    contained: 'bg-gray-500 focus:bg-gray-400 active:bg-gray-600 ring-gray-300',
    outlined:
      'text-gray-500 border-2 border-gray-500 hover:bg-gray-500 hover:bg-opacity-20 focus:bg-gray-500 focus:bg-opacity-40 active:bg-gray-500 active:bg-opacity-40',
    text:
      'text-gray-500 hover:bg-gray-500 hover:bg-opacity-20 focus:bg-gray-500 focus:bg-opacity-40 active:bg-gray-500 active:bg-opacity-40',
  },
  disabled: {
    contained: 'bg-gray-400',
    outlined:
      'text-gray-500 border-2 border-gray-500 hover:bg-gray-500 hover:bg-opacity-20 focus:bg-gray-500 focus:bg-opacity-40 active:bg-gray-500 active:bg-opacity-40',
    text:
      'text-gray-500 hover:bg-gray-500 hover:bg-opacity-20 focus:bg-gray-500 focus:bg-opacity-40 active:bg-gray-500 active:bg-opacity-40',
  },
  black: {
    contained: '',
    outlined: '',
    text: 'text-black dark:text-white',
  },
};

const ButtonTypes: any = {
  contained: 'text-white shadow focus:shadow-xl hover:shadow-md',
  outlined: '',
  text: 'transition-opacity',
};

interface IButton {
  children: ComponentChildren;
  className: string;
  color: string;
  disabled: boolean;
  href: string;
  size: string;
  type: string;
  attrs: any;
}

const Button: FunctionalComponent<IButton> = ({
  children,
  className = '',
  color = 'blue',
  disabled = false,
  href,
  size,
  type = 'contained',
  ...attrs
}) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef();

  let classes = `whitespace-nowrap flex items-center px-1.5 md:px-1 py-1  space-x-1 ${className} ${ButtonTypes[type]} ${
    ButtonColors[disabled ? 'disabled' : color][type]
  } font-sans inline-flex font-bold uppercase text-xs rounded outline-none focus:outline-none ring-opacity-50 transition-shadow transition-colors ${
    disabled ? 'cursor-not-allowed' : 'focus:ring-2 cursor-pointer'
  }`;

  if (disabled) {
    classes = classes.replace(/(?:focus|active|hover):[^ ]+/g, '');
  }

  const handleMousenter = useCallback(() => {
    setHovered(true);
  }, []);

  const handleMouseleave = useCallback(() => {
    setHovered(false);
  }, []);

  const Element = href ? 'a' : 'div';

  return (
    <Fragment>
      <Element
        role="button"
        aria-disabled={disabled ? 'true' : 'false'}
        tabindex="0"
        className={classes}
        href={href}
        ref={ref}
        onmouseenter={handleMousenter}
        onmouseleave={handleMouseleave}
        {...attrs}
      >
        {children}
      </Element>
      {hovered && attrs['aria-label'] ? <Tooltip text={attrs['aria-label']} relativeTo={ref} /> : null}
    </Fragment>
  );
};
export default Button;
