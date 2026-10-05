import { getFCDepotProductByIdService } from "@/services/server/fcDepotProduct.service";
import { EditFCDepotProductImagesForm } from "@/components/depot/form/images/EditFCDepotProductImagesForm";
import { BackButton } from "@/components/ui/buttons/BackButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Imágenes del producto de FC Depot" }

export default async function AdminEditFCDepotProductImagesPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const fcDepotProduct = await getFCDepotProductByIdService(id);

    if (!fcDepotProduct) notFound();

    return (
        <section className="mx-auto flex w-full max-w-4xl flex-col gap-10">
            <div className="flex flex-col xl:flex-row justify-between gap-5">
                <div className="text-secondary flex flex-col gap-2.5">
                    <SectionLabel>Edita las imágenes</SectionLabel>
                    <SectionTitle lead="Imágenes" rotating="Producto" as="h1" />
                </div>

                <div className="flex items-center">
                    <BackButton />
                </div>
            </div>

            <EditFCDepotProductImagesForm fcDepotProduct={fcDepotProduct} />
        </section>
    )
}
