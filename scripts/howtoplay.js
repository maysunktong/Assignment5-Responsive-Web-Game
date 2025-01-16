const slide = $(".slide");
const totalSlides = slide.length;
let currentIndex = 0;

slide.eq(currentIndex).fadeIn();

function showSlide(index) {
  slide.stop(true, true).hide();
  slide.eq(index).stop(true, true).fadeIn();
}

const nextSlide = () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  showSlide(currentIndex);
};

const prevSlide = () => {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  showSlide(currentIndex);
};

$(".next").on("click", nextSlide);
$(".prev").on("click", prevSlide);
