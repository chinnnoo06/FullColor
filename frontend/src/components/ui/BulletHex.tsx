type TBulletHexProps = { className?: string }

export const BulletHex = ({ className = 'fill-primary' }: TBulletHexProps) => (
    <svg aria-hidden="true" viewBox="0 0 173.2 200" className={`size-2 lg:size-2.5 shrink-0 ${className}`}>
        <polygon points="86.6,0 173.2,50 173.2,150 86.6,200 0,150 0,50" />
    </svg>
)
