import { SectionLabel } from '@/components/ui/SectionLabel'

export const FooterMap = () => (
  <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
    <SectionLabel>Ubicación</SectionLabel>
    <div className="h-60 w-full overflow-hidden rounded-xl lg:h-full lg:min-h-60">
      <iframe
        title="Ubicación de FullColor"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.796661590525!2d-103.33582899999999!3d20.67785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b1bcc01d458b%3A0xf2e0389c091c99d4!2sImprenta%20Full%20color%2C%20Lona%20Impresa%2C%20Corte%20y%20Grabado%20Laser%20Tazas%20Personalizada%2C%20Impresion%20digital%2C%20DTF%20Textil!5e0!3m2!1ses!2smx!4v1791166019639!5m2!1ses!2smx"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  </div>
)
