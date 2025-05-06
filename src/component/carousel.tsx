import { useState } from "react";

interface ItemType {
  titre: string;
  format?: string[] | undefined;
}

interface Props {
  item: ItemType;
}

function ImageCarousel({ item }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
  
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
    if (!item.format || item.format.length === 0) return null;

  return (
    <div className="relative w-full max-w-xl mx-auto">
    <img
      src={`http://localhost:5000/file/${item.format[currentIndex]}`}
      alt={`${item.titre} - ${currentIndex}`}
      className="w-full h-64 object-cover rounded"
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
  </div>
  );
}

export default ImageCarousel;
