import { useEffect, useState } from "react";
import { LeftArrow, RightArrow } from "../../public/icons";

export const Slider = () => {
  const images = [
    'img-1.jpg',
    'img-2.jpg',
    'img-3.jpg',
    'img-4.jpg',
  ]

  const [currentImg, setCurrentImg] = useState(0);

  const handlePrev = () => {
    if (currentImg > 0) {
      setCurrentImg(currentImg - 1);
    }else{
      setCurrentImg(images.length - 1)
    }
  };

  const handleNext = () => {
    if (currentImg < images.length - 1) {
      setCurrentImg(currentImg + 1);
    }else{
      setCurrentImg(0)
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 5000);
  
    return () => clearInterval(intervalId);
  }, [currentImg]);


  return (
    <aside className="max-w-lg max-h-full flex relative rounded-2xl">
      <div
        className="bg-gray-300/60 rounded-full flex items-center justify-center p-3 absolute left-0 top-[50%] cursor-pointer z-10"
        onClick={handlePrev}
      >
        <LeftArrow />
      </div>
      <div className=" overflow-hidden">
        <div className="flex mt-10 w-full">
          {images.map((img, index) => (
            <img
              key={`slider1-${index}`}
              src={`images/${img}`}
              className="min-w-full h-auto transition-transform ease-out duration-300 rounded-2xl"
              style={{ transform: `translateX(-${currentImg * 100}%)` }}
              alt={`slider ${index}`}
            />
          ))}
        </div>
      </div>
      <div
        className="bg-gray-300/60 rounded-full flex items-center justify-center p-3 absolute right-0 top-[50%] cursor-pointer"
        onClick={handleNext}>
        <RightArrow />
      </div>
      <div className="absolute flex bottom-5 right-0 w-full">
        <div className="flex items-center justify-center w-full gap-2">
          {images.map((image, index) => (
            <div className={`rounded-full  p-2 ${index == currentImg ? 'bg-gray-100' : 'bg-gray-200/60'}`} key={image}></div>
          ))}
        </div>
      </div>
    </aside>
  );
};
