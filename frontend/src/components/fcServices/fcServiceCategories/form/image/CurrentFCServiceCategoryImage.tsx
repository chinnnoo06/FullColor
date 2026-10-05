import Image from 'next/image'

export const CurrentFCServiceCategoryImage = ({ image, name }: { image: string; name: string }) => (
    <Image
        src={`${process.env.NEXT_PUBLIC_FC_SERVICE_CATEGORIES_IMAGE_URL}/${image}`}
        alt={`Imagen actual de ${name}`}
        width={200}
        height={200}
        className="border-secondary/30 aspect-square w-40 rounded-lg border object-cover"
    />
)
