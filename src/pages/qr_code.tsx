import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import Image from 'next/image'
import qr_code from '@/images/qr_code.jpg'

const Usage = () => {
  return (
    <div>
      <Header />
      <main className=" flex justify-center align-middle">
        <Image
          className=" "
          src={qr_code}
          alt=""
          //   width={2347}
          //   height={1244}
          unoptimized
        />
      </main>
      <Footer />
    </div>
  )
}

export default Usage
