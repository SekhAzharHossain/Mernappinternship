// src/components/ImageCarousel.jsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const ImageCarousel = ({ images }) => {
  if (!images || images.length === 0) return null;

  return (
    <Carousel className="w-full max-w-xl">
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index} className="flex justify-center">
            <img
              src={src}
              alt={`item-${index}`}
              className="object-contain w-full h-64 rounded-lg border shadow"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ImageCarousel;
