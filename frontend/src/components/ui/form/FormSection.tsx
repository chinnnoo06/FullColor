import { ReactNode } from 'react';

type TFormSectionProps = {
  children: ReactNode;
  className?: string;
};

export const FormSection = ({ children, className }: TFormSectionProps) => {
  return (
    <fieldset
      className={`border-primary/30 bg-fourth/2.5 flex flex-col gap-5 rounded-xl border p-5 lg:p-10 ${className ?? ''}`}
    >
      {children}
    </fieldset>
  );
};
