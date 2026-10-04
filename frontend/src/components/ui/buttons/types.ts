export type TLinkButtonVariant = 'primary' | 'secondary' | 'thrird';

export type TLinkButtonWidth = 'fit' | 'full' | 'responsive';

export type TLinkButtonProps = {
    href: string;
    children: React.ReactNode;
    variant?: TLinkButtonVariant;
    width?: TLinkButtonWidth;
}

export type TBackButtonProps = {
    label?: string;
    variant?: TLinkButtonVariant;
    width?: TLinkButtonWidth;
}


export type TEditButtonProps = {
    href: string;
    label: string;
    className?: string;
}

export type TDeleteButtonProps = {
    onClick: () => void;
    label: string;
    disabled?: boolean;
    className?: string;
}

export type TImagesButtonProps = {
    href: string;
    label: string;
    className?: string;
}