import Image from "next/image"
import Img from "@/assets/media/logos/fullcolorlogo.webp"

export const Logo = ({ sizes }: { sizes: string }) => {
    return (
        <Image
            src={Img}
            alt="Logo Full Color"
            sizes={sizes}
            quality={90}
            priority
            className="w-full h-auto"
        />
    )
}
