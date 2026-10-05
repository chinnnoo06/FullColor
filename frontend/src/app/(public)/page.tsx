import { Hero } from '@/components/home/hero/Hero'
import { About } from '@/components/home/About'
import { FCServices } from '@/components/home/fcServices/FCServices'
import { FCDepot } from '@/components/home/fcDepot/FCDepot'
import { FCWeb } from '@/components/home/fcWeb/FCWeb'
import { Cta } from '@/components/sections/Cta'
import { MarqueeBanner } from '@/components/sections/MarqueeBanner'
import ImgBanner from '@/assets/media/backgrounds/bg1.webp'
import { ContactInfo } from '@/components/contact/form/ContactInfo'
import { getFCServiceCategoriesService } from '@/services/server/fcServiceCategory.service'
import { getFCDepotProductsService } from '@/services/server/fcDepotProduct.service'

export default async function HomePage() {
  const [fcServiceCategories, { fcDepotProducts }] = await Promise.all([
    getFCServiceCategoriesService(),
    getFCDepotProductsService(),
  ]);

  return (
    <>
      <Hero />
      <About />
      <MarqueeBanner image={ImgBanner} />
      <FCServices fcServiceCategories={fcServiceCategories}/>
      <FCDepot />
      <FCWeb />
      <Cta />
      <ContactInfo id="home-contact" dataSection="home-contact" showMoreLink />
    </>
  )
}
