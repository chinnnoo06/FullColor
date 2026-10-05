import { HiChevronDown } from 'react-icons/hi2';

type TSelectProps = React.ComponentPropsWithRef<'select'>;

export const Select = ({ className, children, ...props }: TSelectProps) => {
  return (
    <div className="relative">
      <select
        {...props}
        className={`w-full appearance-none rounded-lg bg-thrird text-fourth/75 text-sm lg:text-base leading-normal border border-primary/30 outline-none focus:border-primary transition-all duration-300 hover:border-primary py-2.5 pr-10 pl-5 ${className ?? ''}`}
      >
        {children}
      </select>
      <HiChevronDown
        aria-hidden="true"
        className="text-primary pointer-events-none absolute top-1/2 right-5 size-4 lg:size-4.5 -translate-y-1/2"
      />
    </div>
  );
};
