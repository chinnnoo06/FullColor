import { SOCIAL_LINKS } from '@/utils/data/navigation';

type TSocialButtonsProps = {
  className?: string;
  isHeader?: boolean
};

export const SocialButtons = ({ className, isHeader }: TSocialButtonsProps) => {
  return (
    <ul role="list" aria-label="Redes sociales" className={`flex items-center gap-2.5 ${className ?? ''}`}>
      {SOCIAL_LINKS.map(({ url, label, icon: Icon }) => (
        <li key={url}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="border-fourth text-fourth hover:border-primary hover:bg-primary hover:text-secondary inline-flex size-9 items-center justify-center rounded-xl border transition-colors duration-300 xl:size-10"
          >
            <Icon className={`size-4 shrink-0 ${isHeader ? 'xl:size-4.5' : 'lg:size-4.5'}`} />
          </a>
        </li>
      ))}
    </ul>
  );
};
