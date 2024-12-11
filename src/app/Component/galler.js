import Image from 'next/image';

const PropertyGallery = ({ property }) => {
  const sliderImages = property.sliderImages || [];
  const mainimage = property.mainImageFile || "";

  if (sliderImages.length === 0) {
    return <div>No images available</div>;
  }

  return (
    <div className="max-w-screen-2xl mx-auto  relative bg-white">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex">
            <Image
              src={`https://eshanivaccationbackend.vercel.app/${mainimage}`}
              alt="image"
              className="w-full"
              layout="intrinsic"
              width={500}
              height={400}
            />

          </div>
          <div className="flex">
            <Image
              src={`https://eshanivaccationbackend.vercel.app/${sliderImages[0]}`}
              alt={`image-alt`} // Adjust alt text to match the correct image index
              className="object-cover w-full h-full"
              width={300}
              height={300}
              objectFit="cover"
            />

          </div>
        </div>
        <div className="flex flex-1">
          <div className="grid grid-cols-2 gap-2">
            {sliderImages.slice(1).map((image, index) => (
              <div key={index + 1}>
                <Image
                  src={`https://eshanivaccationbackend.vercel.app/${image}`}
                  alt={`image-${index + 1}`} 
                  className="object-cover w-full h-full"
                  width={300}
                  height={300}
                  objectFit="cover"
                />
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyGallery;
