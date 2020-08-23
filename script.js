const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;

// unsplash API
const initialCount = 5;
const apiKey = "nGZgz2CjiyYEwyOPOcxY5-hOQmc_vh9tdIeP-byDGFI";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

// update count
function updateImageCount(newCount) {
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${newCount}`;
}

// check all images loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// helper func to set attr
function setAttributes(element, attr) {
  for (const key in attr) {
    element.setAttribute(key, attr[key]);
  }
}

// display photo
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.map((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener("load", imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// get photo from unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();

    if (isInitialLoad) {
      updateImageCount(30);
      isInitialLoad = false;
    }
  } catch (error) {}
}

// check bottom of window
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// on load
getPhotos();
