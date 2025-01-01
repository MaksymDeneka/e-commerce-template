import Image from 'next/image';

export default function Hero() {
  return (
    <section className="flex justify-center items-center px-5 bg-neutral-100">
      <div className="flex gap-y-5 flex-wrap justify-between items-center max-w-screen-2xl w-full">
        <div>
          <h1 className='text-8xl font-bold mb-5'>Hero title</h1>
          <p className='text-3xl'>subtitle subtitle subtitle subtitle</p>
        </div>
        <Image src="/images/logo-bg.svg" width={500} height={375} priority alt="logo" />
      </div>
    </section>
  );
}
