type TInputProps = React.ComponentPropsWithRef<'input'>;

export const Input = ({ className, ...props }: TInputProps) => {
  return (
    <input
      {...props}
      className={`w-full rounded-lg bg-thrird text-fourth/75 text-sm lg:text-base leading-normal border border-primary/50 placeholder-fourth/50 outline-none focus:border-primary transition-all duration-300 hover:border-primary px-5 py-2.5 ${className ?? ''}`}
    />
  );
};
