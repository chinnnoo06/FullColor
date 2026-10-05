import { FooterBrand } from './FooterBrand'
import { FooterNav } from './FooterNav'
import { FooterContact } from './FooterContact'
import { FooterMap } from './FooterMap'
import { FooterBottomBar } from './FooterBottomBar'

export const Footer = () => {
  return (
    <footer className="bg-thrird text-fourth relative before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-linear-to-r before:from-primary before:via-secondary before:to-primary">
      <div className="mx-auto w-full max-w-[1700px] px-5 lg:px-15 py-15 lg:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-15">
          <FooterBrand />

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 lg:w-[70%] lg:justify-end gap-10 lg:gap-15">
            <FooterNav />
            <FooterContact />
            <FooterMap />
          </div>
        </div>

        <FooterBottomBar />
      </div>
    </footer>
  )
}
