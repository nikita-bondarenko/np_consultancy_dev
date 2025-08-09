const initFeedbacksSwiper = () => {
    const feedbacksSections = document.querySelectorAll('.feedbacks');
    Array.from(feedbacksSections).forEach(feedbacksSection => {
        const feedbacksSliderPrev = feedbacksSection.querySelector('.arrow--prev');
        const feedbacksSliderNext = feedbacksSection.querySelector('.arrow--next');
        const feedbacksSlider = feedbacksSection.querySelector('.feedbacks__swiper');
        const options = {
            slidesPerView: 'auto',
            spaceBetween: 8,
            grabCursor: true,
            navigation: {
                prevEl: feedbacksSliderPrev,
                nextEl: feedbacksSliderNext,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            breakpoints: {
                576: {
                    spaceBetween: 24
                }
            }
        }

        if (!feedbacksSlider) return;

        const feedbacksSliderSwiper = new Swiper(feedbacksSlider, options);
    })

}


document.addEventListener("DOMContentLoaded", () => {
    initFeedbacksSwiper()
})