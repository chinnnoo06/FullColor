import { ReactNode } from 'react'

type TSectionLabelProps = {
    children: ReactNode
    tone?: 'primary' | 'secondary'
}

const COLOR = {
    primary: 'text-primary',
    secondary: 'text-secondary',
}

const LINE = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
}

export const SectionLabel = ({ children, tone = 'primary' }: TSectionLabelProps) => (
    <span className={`font-beyno ${COLOR[tone]} inline-flex items-center gap-2.5 text-sm font-semibold tracking-[0.3em] uppercase lg:text-base`}>
        <span className={`${LINE[tone]} h-px w-7.5 shrink-0`} />
        {children}
    </span>
)
