document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.Category_swiper', {
        slidesPerView: 6, // Number of slides visible at once
        spaceBetween: 30, // Space between slides
        loop: true, // Infinite loop
        autoplay: {
            delay: 2000, // Delay between transitions in milliseconds (3 seconds)
            disableOnInteraction: false, // Keeps autoplay active even after user interactions
        },
        speed: 800, // Transition speed in milliseconds (0.8 seconds)
        pagination: {
            el: '.swiper-pagination',
            clickable: true, // Pagination dots clickable
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
        },
    });
});
