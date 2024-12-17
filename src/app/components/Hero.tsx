import Image from 'next/image';

export default function Hero() {
  return (
    <section className="flex justify-center items-center px-5 bg-neutral-100 h-96">
      <div className="flex justify-between items-center max-w-screen-2xl w-full">
        <div>
          <h1 className='text-8xl font-bold mb-5'>Best roofing materials</h1>
          <p className='text-3xl'>Buy best roofing material in TopDax</p>
        </div>
        <Image src="/images/logo-bg.svg" width={500} height={375} priority alt="logo" />
      </div>
    </section>
  );
}
