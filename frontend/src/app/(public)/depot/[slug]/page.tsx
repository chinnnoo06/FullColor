import type { Metadata } from 'next';
import { FCDepotProductInfo } from '@/components/fcDepot/detail/FCDepotProductInfo';
import { FCDepotProductGallery } from '@/components/fcDepot/detail/FCDepotProductGallery';
import { FCDepotProductBreadcrumb } from '@/components/fcDepot/detail/FCDepotProductBreadcrumb';
import { DepotProductStructuredData } from '@/components/seo/DepotProductStructuredData';
import { RevealOnLoad } from '@/components/ui/Reveal';
import { getFCDepotProductBySlugService } from '@/services/server/fcDepotProduct.service';
import { fadeUp, fadeUpScale } from '@/utils/motion/reveal';
import { notFound } from 'next/navigation';

const IMAGE_URL = process.env.NEXT_PUBLIC_FC_DEPOT_PRODUCTS_IMAGE_URL!;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const product = await getFCDepotProductBySlugService(slug);

    if (!product) return { title: 'Producto no encontrado' };

    const productUrl = `/depot/${slug}`;
    const imageUrl = product.images[0] ? `${IMAGE_URL}/${product.images[0]}` : undefined;

    return {
        title: product.seo.metaTitle,
        description: product.seo.metaDescription,
        alternates: { canonical: productUrl },
        openGraph: {
            url: productUrl,
            title: product.seo.metaTitle,
            description: product.seo.metaDescription,
            ...(imageUrl && { images: [{ url: imageUrl, alt: product.name }] }),
        },
    };
}

export default async function DepotProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const fcDepotProduct = await getFCDepotProductBySlugService(slug);

    if (!fcDepotProduct) notFound();

    return (
        <section id="depot-producto-detalle" data-section="depot-producto-detalle" className="bg-thrird py-15 lg:py-20">
            <DepotProductStructuredData product={fcDepotProduct} imageUrl={IMAGE_URL} />
            <div className="mx-auto w-full max-w-[1700px] px-5 lg:px-15">
                <div className="flex flex-col gap-10">

                    <FCDepotProductBreadcrumb productName={fcDepotProduct.name} />

                    <div className="flex flex-col gap-10 lg:flex-row lg:gap-15">
                        <RevealOnLoad variants={fadeUpScale} className="w-full lg:w-[50%] xl:w-[40%]">
                            <FCDepotProductGallery
                                images={fcDepotProduct.images}
                                name={fcDepotProduct.name}
                                imageUrl={IMAGE_URL}
                            />
                        </RevealOnLoad>

                        <RevealOnLoad variants={fadeUp} className="w-full lg:w-[50%] xl:w-[60%]">
                            <FCDepotProductInfo fcDepotProduct={fcDepotProduct} />
                        </RevealOnLoad>
                    </div>

                </div>
            </div>
        </section>
    )
}
