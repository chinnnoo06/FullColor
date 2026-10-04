type THamburgerButtonProps = {
  open: boolean;
  toggleMenu: () => void
  ref?: React.Ref<HTMLButtonElement>
};

export const HamburgerButton = ({ open, toggleMenu, ref }: THamburgerButtonProps) => {
  return (
    <button
      ref={ref}
      onClick={toggleMenu}
      aria-label={open ? "Cerrar menú" : "Abrir menú"}
      aria-expanded={open}
      aria-controls="mobile-nav"
      className="relative flex items-center justify-center cursor-pointer
                 w-7.5 h-7.5
                 text-primary/75 hover:text-primary
                 transition-all duration-300"
    >
      <span
        className={`
          absolute bg-current transition-all duration-300
          h-0.5 w-6
          ${open ? "rotate-45" : "-translate-y-2 xl:-translate-y-2"}
        `}
      />

      <span
        className={`
          absolute bg-current transition-all duration-300
          h-0.5 w-6
          ${open ? "opacity-0" : "opacity-100"}
        `}
      />

      <span
        className={`
          absolute bg-current transition-all duration-300
          h-0.5 w-6
          ${open ? "-rotate-45" : "translate-y-2 xl:translate-y-2"}
        `}
      />
    </button>
  );
};
