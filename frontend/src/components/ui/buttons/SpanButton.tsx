import { HiArrowUpRight } from 'react-icons/hi2'
import { BUTTON_BASE, BUTTON_ICON, BUTTON_VARIANT_STATIC, BUTTON_WIDTH } from './styles'
import { TLinkButtonVariant, TLinkButtonWidth } from './types'

type TSpanButtonProps = {
    children: React.ReactNode
    variant?: TLinkButtonVariant
    width?: TLinkButtonWidth
}

export const SpanButton = ({ children, variant = 'primary', width = 'full' }: TSpanButtonProps) => {
    return (
        <span className={`${BUTTON_BASE} ${BUTTON_WIDTH[width]} ${BUTTON_VARIANT_STATIC[variant]}`}>
            {children}
            <HiArrowUpRight aria-hidden="true" className={BUTTON_ICON} />
        </span>
    )
}
