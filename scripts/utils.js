export function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
}

// block anything from continueing until loading images
export function createImageAsync(imageSrc) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.src = imageSrc;
  });
}
