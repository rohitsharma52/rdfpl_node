///////////////////     Swiper slider for Frontend/////////////////////////////////////////////////////////////
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

document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper_feature', {
        slidesPerView: 4, // Default for larger screens
        spaceBetween: 20, // Adjust the gap between slides   
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            576: {
                slidesPerView: 2, // 2 slides on screens >= 576px
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3, // 3 slides on screens >= 768px
                spaceBetween: 30,
            },
            1200: {
                slidesPerView: 4, // 4 slides on screens >= 1200px
                spaceBetween: 40,
            },
        },
    });
});
///////////////////     Swiper slider enf Frontend/////////////////////////////////////////////////////////////

