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

export function isOnTop({ object, platform }) {
  return (
    object.position.y + object.height <= platform.position.y &&
    object.position.y + object.height + object.velocity.y >=
      platform.position.y &&
    object.position.x + object.width >= platform.position.x &&
    object.position.x <= platform.position.x + platform.width
  );
}

export function collisionTop({ object1, object2 }) {
  return (
    object1.position.y + object1.height <= object2.position.y &&
    object1.position.y + object1.height + object1.velocity.y >=
      object2.position.y &&
    object1.position.x + object1.width >= object2.position.x &&
    object1.position.x <= object2.position.x + object2.width
  );
}

export function createBlock({ object, platform }) {
  return (
    object.position.y + (object.height - 80) <=
      platform.position.y + platform.height &&
    object.position.y + (object.height - 80) - object.velocity.y >=
      platform.position.y + platform.height &&
    object.position.x + (object.width - 50) >= platform.position.x &&
    object.position.x + (object.width - 50) <=
      platform.position.x + platform.width
  );
}

export const toggleVisibility = (element, isVisible) => {
  element.style.display = isVisible ? "block" : "none";
};
