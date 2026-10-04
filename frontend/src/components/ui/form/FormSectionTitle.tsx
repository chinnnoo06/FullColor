import { ReactNode } from 'react';

type TFormSectionTitleProps = {
  children: ReactNode;
  className?: string;
};

export const FormSectionTitle = ({ children, className }: TFormSectionTitleProps) => {
  return (
    <legend className={`font-barlow text-primary px-2.5 tracking-[0.15em] text-sm lg:text-base font-semibold uppercase  ${className ?? ''}`}>
      {children}
    </legend>
  );
};
