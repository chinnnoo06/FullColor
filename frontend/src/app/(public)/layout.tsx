import { WhatsAppButton } from "@/components/ui/buttons/WhatsAppButton";
import { Header } from "@/components/ui/layout/header/Header";
import { Footer } from "@/components/ui/layout/footer/Footer";

export default function PublicLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <Header />
            <main className="pt-20">{children}</main>
            <Footer />
            <WhatsAppButton />
        </>
    );
}
