import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { JSX, SVGProps } from 'react';
import Container from '@/components/container';

export default function ProductPage() {
  return (
    <Container>
      <div className="flex gap-x-20">
        <div className="flex flex-col gap-y-8 max-w-96">
          <div>
            <h1 className="text-6xl font-bold mb-5">Product title</h1>
            <p>
              product description Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
              placeat fuga, ipsum minus praesentium exercitationem fugit doloremque non quo soluta!
            </p>
          </div>
          <div>
            <Label>Rating</Label>
            <div className="flex">
              <StarIcon className="w-5" />
              <StarIcon className="w-5" />
              <StarIcon className="w-5" />
              <StarIcon className="w-5" />
              <StarIcon className="w-5" />
            </div>
          </div>
          <Separator />
          <Button>Add to cart</Button>
        </div>
        <Image src="images/category-drop-down.svg" width={500} height={500} alt="image" />
      </div>
    </Container>
  );
}

function StarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
