import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
interface ItemType {
  titre: string;
  format?: string[] | undefined;
}

interface Props {
  item: ItemType;
}

function ImageCarousel({ item }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    if (!item.format || item.format.length === 0) return null;

    const images = item.format.map((img) => ({
      src: `http://localhost:5000/file/${img}`,
    }));
    const handlePrev = () => {
      setCurrentIndex((prev) =>
        prev === 0 ? (item.format?.length || 1) - 1 : prev - 1
      );
    };
  
    const handleNext = () => {
      setCurrentIndex((prev) =>
        prev === (item.format?.length || 0) - 1 ? 0 : prev + 1
      );
    };
  
    // Check if format is defined and not empty

  return (
    <div className="relative w-full max-w-xl mx-auto">
    <img
      src={`http://localhost:5000/file/${item.format[currentIndex]}`}
      alt={`${item.titre} - ${currentIndex}`}
      className="w-full h-64 object-cover rounded-lg cursor-pointer"
      onClick={() => setIsOpen(true)}
    />
    <button
      onClick={handlePrev}
      className="absolute top-1/2 left-5 transform  bg-white/70 rounded-full p-2 shadow hover:bg-white"
    >
      ◀
    </button>
    <button
      onClick={handleNext}
      className="absolute top-1/2 right-5 transform  bg-white/70 rounded-full p-2 shadow hover:bg-white"
    >
      ▶
    </button>
    <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        index={currentIndex}
        slides={images}
      />
  </div>
  );
}

export default ImageCarousel;
