import { LoginForm } from '@/components/auth/LoginForm';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SectionLabel } from '@/components/ui/SectionLabel';

export default function LoginPage() {
    return (
        <section className='max-w-4xl mx-auto px-5 lg:px-15 py-15 lg:py-20'>
            <div className="text-secondary flex flex-col mb-10 gap-2.5">
                <SectionLabel>Panel de administrador</SectionLabel>

                <SectionTitle lead="Iniciar" rotating="Sesión" as='h1' />
                <p className="text-fourth/75 text-base lg:text-lg ">
                    Ingresa tus credenciales correctamente para poder iniciar sesión
                </p>
            </div>

            <LoginForm />
        </section>
    )
}
