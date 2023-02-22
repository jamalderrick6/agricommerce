import { useState } from "react";

type GalleryProductType = {
  images: string[];
};

const Gallery = ({ images }: GalleryProductType) => {
  const [featImage, setfeatImage] = useState(images[0]);

  console.log("images", images);

  return (
    <section className="product-gallery">
      <div className="product-gallery__thumbs">
        {images.map((image) => (
          <div
            onClick={() => setfeatImage(image)}
            key={image.attributes.name}
            className="product-gallery__thumb"
          >
            <img src={`http://localhost:1337${image.attributes.url}`} alt="" />
          </div>
        ))}
      </div>

      <div className="product-gallery__image">
        <img src={`http://localhost:1337${featImage.attributes.url}`} alt="" />
      </div>
    </section>
  );
};

export default Gallery;
