type TLabelProps = {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
  optional?: boolean;
};

export const Label = ({ htmlFor, children, className, optional }: TLabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`font-barlow block tracking-[0.15em] text-[10px] lg:text-xs font-semibold uppercase text-primary mb-2.5 ${className ?? ''}`}
    >
      {children}
      {optional && <span className="ml-2.5 normal-case font-normal text-fourth/75 tracking-normal"> (opcional)</span>}
    </label>
  );
};
