const initServiceCasesSwiper = () => {
    const serviceCasesSections = document.querySelectorAll('.service-cases');
    Array.from(serviceCasesSections).forEach(serviceCasesSection => {
        const serviceCasesSliderPrev = serviceCasesSection.querySelector('.arrow--prev');
        const serviceCasesSliderNext = serviceCasesSection.querySelector('.arrow--next');
        const serviceCasesSlider = serviceCasesSection.querySelector('.service-cases__swiper');
        const options = {
            slidesPerView: 'auto',
            spaceBetween: 8,
            grabCursor: true,
            navigation: {
                prevEl: serviceCasesSliderPrev,
                nextEl: serviceCasesSliderNext,
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

        if (!serviceCasesSlider) return;

        const serviceCasesSliderSwiper = new Swiper(serviceCasesSlider, options);
    })

}

const initPutServiceCaseContentToModal = () => {
    const casesItems = document.querySelectorAll('.service-case');

    const modalContentElement = document.querySelector('#modal-text .modal__text');

    Array.from(casesItems).forEach((caseItem) => {
        const content = caseItem.querySelector('.service-case__content')
        const button = caseItem.querySelector('.np-button')
        if (content && modalContentElement && button) {
            button.addEventListener('click', (e) => {
                modalContentElement.innerHTML = content.innerHTML

            })
        }
    })
}


document.addEventListener("DOMContentLoaded", () => {
    initServiceCasesSwiper()
    initPutServiceCaseContentToModal()
})