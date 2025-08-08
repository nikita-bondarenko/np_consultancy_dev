"use strict";

const MAX_MEDIA_1200 = window.matchMedia('(max-width: 1200px)').matches;

const initWhyUaeSlider = () => {
    const whyUaeSection = document.querySelector('.why-uae');

    if (!whyUaeSection) return;

    const whyUaeSliderPrev = whyUaeSection.querySelector('.arrow--prev');
    const whyUaeSliderNext = whyUaeSection.querySelector('.arrow--next');
    const whyUaeSlider = whyUaeSection.querySelector('.why-uae__slider');
    const options = {
        slidesPerView: 'auto',
        spaceBetween: 8,
        grabCursor: true,
        navigation: {
            prevEl: whyUaeSliderPrev,
            nextEl: whyUaeSliderNext,
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

    if (!whyUaeSlider) return;

    const whyUaeSliderSwiper = new Swiper(whyUaeSlider, options);
}

const initLozad = () => {
    const lozadElements = document.querySelectorAll('[data-lozad]');

    if (!lozadElements) return;

    lozadElements.forEach(element => {
        const lozadObserver = lozad(element);

        lozadObserver.observe();
    })
}

const initHeader = () => {
    const header = document.querySelector('.site-header');

    if (!header) return;


    let lastScrollTop;

    window.addEventListener('scroll', toggleScrollingClass);
    window.addEventListener('scroll', animateHeader);

    function animateHeader() {
        const scrollTop = document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 48) {
            header.classList.add('is-scrolling-down');
        } else {
            header.classList.remove('is-scrolling-down');
        }

        lastScrollTop = scrollTop;
    }

    function toggleScrollingClass() {
        const scrollTop = document.documentElement.scrollTop;

        if (scrollTop > 0) {
            header.classList.add('is-scrolling');
        } else {
            header.classList.remove('is-scrolling');
        }
    }
}

const initBurgerMenu = () => {
    const menu = document.querySelector(".site-header__panel");
    const burger = document.querySelector(".burger");

    if (!menu || !burger) return;

    const menuOverlay = document.querySelector(".site-header__overlay");
    const menuClose = menu.querySelector(".site-header__panel-close");
    const menuAnchors = menu.querySelectorAll('[data-anchor]');

    if (menuClose) menuClose.addEventListener("click", closeBurgerMenu);
    if (menuOverlay) menuOverlay.addEventListener("click", closeBurgerMenu);
    if (menuAnchors) initMenuAnchors();

    burger.addEventListener("click", openBurgerMenu);

    function initMenuAnchors() {
        menuAnchors.forEach(anchor => anchor.addEventListener('click', closeBurgerMenu));
    }

    function closeBurgerMenu() {
        menu.classList.remove("is-open");
        menuOverlay.classList.remove('is-visible');
        document.body.classList.remove('is-lock');
    }

    function openBurgerMenu() {
        menu.classList.add("is-open");
        menuOverlay.classList.add('is-visible');
        document.body.classList.add('is-lock');
    }
};

const initFoldedElements = () => {
    const foldedElements = document.querySelectorAll('[data-fold]');

    if (!foldedElements) return;

    foldedElements.forEach(foldedElement => {
        let foldedElementContent;
        const foldedElementBtn = foldedElement.querySelector('[data-fold-btn]');
        foldedElementContent = foldedElement.querySelectorAll('[data-fold-content]')

        if (foldedElement.classList.contains('is-dropdown')) {
            foldedElementContent = foldedElement.querySelector('[data-fold-content]')
        }

        heightToggleElement(foldedElementBtn, foldedElementContent);
    })
}

const initAccordions = () => {
    const accordions = document.querySelectorAll('[data-accordion]');

    if (!accordions) return;

    accordions.forEach(accordion => {
        const accordionFoldedElements = accordion.querySelectorAll('[data-fold]');

        accordionFoldedElements.forEach((foldedElement, i) => {
            const foldedElementBtn = foldedElement.querySelector('[data-fold-btn]');
            const foldedElementsWithoutCurrent = Array.from(accordionFoldedElements).filter((element, j) => i !== j);

            foldedElementBtn.addEventListener('click', () => closeOtherFoldedElements(foldedElementsWithoutCurrent));
        })

    })

    function closeOtherFoldedElements(foldedElements) {
        foldedElements.forEach(element => {
            const foldedElementBtn = element.querySelector('[data-fold-btn]');
            const foldedElementContent = element.querySelector('[data-fold-content]');

            foldedElementContent.style.height = `${foldedElementContent.scrollHeight}px`;
            window.getComputedStyle(foldedElementContent, null).getPropertyValue("height");
            foldedElementContent.style.height = "0";
            foldedElementBtn.classList.remove("is-active");
            foldedElementContent.classList.remove("is-expanded");

            foldedElementContent.addEventListener("transitionend", () => {
                if (foldedElementContent.style.height !== "0px") {
                    foldedElementContent.style.height = "auto";
                }
            });
        })
    }
}

const initAnchors = () => {
    const anchors = document.querySelectorAll('[data-anchor]');

    if (!anchors) return;

    const header = document.querySelector('.site-header');
    const headerHeight = header.offsetHeight;

    anchors.forEach(link => {

        link.addEventListener('click', function (e) {
            e.preventDefault();

            const href = this.getAttribute('href');
            const scrollTarget = document.querySelector(href);
            const topOffset = headerHeight;
            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

}

const initAnimations = () => {
    if (!gsap || MAX_MEDIA_1200) return;

    gsap.registerPlugin(ScrollTrigger);

    animateHero();
    animateCards();
    animateWeWorkFor();
    animateWhyUae();
    animateFaqs();
    animateWantUse();
    animateHasRequest();

    function animateHero() {
        const tl = gsap.timeline({
            onComplete: function () {
                const header = document.querySelector('.site-header');

                header.style.transform = '';
                header.style.transition = 'all 0.3s ease-in-out';
            }
        });

        tl
            .from('.hero__image', { opacity: 0, duration: 1, delay: 0.5 })
            .from('.hero__title', { opacity: 0, duration: 1 }, "-=1")
            .from('.site-header', { yPercent: -100, duration: 1 }, "-=0.5")
            .from('.hero__text', { opacity: 0, duration: 1 })
            .from('.hero__button', { opacity: 0, duration: 1 })
    }

    function animateCards() {
        const blocksWithCards = document.querySelectorAll('.block-with-cards');

        if (!blocksWithCards) return;

        blocksWithCards.forEach(block => {
            const blockSection = block.closest('section');
            const blockCardsWrapper = block.querySelector('.block-with-cards__list');
            const blockImages = block.querySelectorAll('.block-with-cards__image');
            const blockCards = block.querySelectorAll('.animation-card');
            const tl = gsap.timeline({
                defaults: {
                    ease: "none",
                },
                scrollTrigger: {
                    trigger: blockSection,
                    start: "top top",
                    end: `+=${blockCards.length - 1}000`,
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                }
            });

            setLastCardHeight();

            blockCards.forEach((card, i) => {
                if (i !== 0) {
                    const cardHeight = card.scrollHeight;

                    tl
                        .to(card, { opacity: 1, top: i * 28 })
                        .to(blockCards[i + 1], { opacity: 0.5 }, '<')
                        .to(blockImages[i], { opacity: 1 }, '<')
                        .to(blockImages[i - 1], { opacity: 0 }, '<')
                        .to(blockCardsWrapper, { height: cardHeight + i * 28, duration: 0 })
                } else {
                    tl.to({}, 0.1, {})
                }
            })

            function setLastCardHeight() {
                const blockImagesWrapper = block.querySelector('.block-with-cards__images');
                const lastCard = blockCards[blockCards.length - 1];
                const lastCardHeight = lastCard.scrollHeight;
                const cardsGaps = (blockCards.length - 1) * 28;
                const blockImagesWrapperHeight = blockImagesWrapper.scrollHeight;
                const allCardsHeight = cardsGaps + lastCardHeight;

                if (allCardsHeight < blockImagesWrapperHeight) {
                    const needleHeight = blockImagesWrapperHeight - cardsGaps;

                    lastCard.style.height = needleHeight + "px";
                }
            }
        })
    }

    function animateWhyUae() {
        const whyUae = document.querySelector('.why-uae');

        if (!whyUae) return;

        const tl = gsap.timeline(
            {
                scrollTrigger: {
                    trigger: whyUae,
                    start: "top center",
                    end: `bottom bottom`
                }
            }
        );

        tl.from(whyUae, { opacity: 0, duration: 1 })

    }

    function animateWeWorkFor() {
        const weWorkFor = document.querySelector('.we-work-for');

        if (!weWorkFor) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: weWorkFor,
                start: "top center",
                end: `bottom bottom`
            }
        })
        const weWorkForTitle = weWorkFor.querySelector('.we-work-for__title');
        const weWorkForOddItems = weWorkFor.querySelectorAll('.we-work-for__item:nth-child(odd)');
        const weWorkForEvenItems = weWorkFor.querySelectorAll('.we-work-for__item:nth-child(even)');

        tl.from(weWorkForTitle, { opacity: 0, duration: 1 })

        weWorkForOddItems.forEach((item, i) => {
            if (i === 0) {
                tl.from(item, { opacity: 0, duration: 1 }, "-=0.5")
            } else {
                tl.from(item, { opacity: 0, duration: 1 }, "-=1")
            }
        })

        weWorkForEvenItems.forEach((item, i) => {
            if (i === 0) {
                tl.from(item, { opacity: 0, duration: 1 })
            } else {
                tl.from(item, { opacity: 0, duration: 1 }, "-=1")
            }
        })
    }

    function animateWantUse() {
        const wantUse = document.querySelector('.want-use');

        if (!wantUse) return;

        const wantUseTitle = wantUse.querySelector('.want-use__title');
        const wantUseText = wantUse.querySelector('.want-use__text');
        const wantUseButton = wantUse.querySelector('.want-use__button');
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wantUse,
                start: "top center",
                end: `bottom bottom`
            }
        })

        tl
            .from(wantUseTitle, { opacity: 0, duration: 0.5 })
            .from(wantUseText, { opacity: 0, duration: 0.5 })
            .from(wantUseButton, { opacity: 0, duration: 0.5 })
    }

    function animateFaqs() {
        const faqs = document.querySelector('.faqs');

        if (!faqs) return;

        const faqsTitle = faqs.querySelector('.faqs__title');

        gsap.from(faqsTitle, {
            scrollTrigger: {
                trigger: faqs,
                start: "top center",
                end: `bottom bottom`
            }, opacity: 0, duration: 1
        })

    }

    function animateHasRequest() {
        const hasRequest = document.querySelector('.has-request');

        if (!hasRequest) return;

        const hasRequestTitle = hasRequest.querySelector('.has-request__title');
        const hasRequestText = hasRequest.querySelector('.has-request__text');
        const hasRequestButton = hasRequest.querySelector('.has-request__button');
        const hasRequestImage = hasRequest.querySelector('.has-request__image');
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: hasRequest,
                start: "top center",
                end: `bottom bottom`
            }
        })

        tl
            .from(hasRequestImage, { opacity: 0, duration: 0.5 })
            .from(hasRequestTitle, { opacity: 0, duration: 0.5 }, '<')
            .from(hasRequestText, { opacity: 0, duration: 0.5 })
            .from(hasRequestButton, { opacity: 0, duration: 0.5 })
    }
}

function heightToggleElement(toggler, blocks) {
    toggler.addEventListener("click", (e) => {
        e.preventDefault();

        if (blocks instanceof NodeList) {
            blocks.forEach(function (block) {
                addFunctionality(toggler, block);
            });
        } else {
            addFunctionality(toggler, blocks);
        }
    });

    function addFunctionality(toggler, block) {
        if (block.style.height === "0px" || !block.style.height) {
            block.style.height = `${block.scrollHeight}px`;
            toggler.classList.add("is-active");
            block.classList.add("is-expanded");
        } else {
            block.style.height = `${block.scrollHeight}px`;
            window.getComputedStyle(block, null).getPropertyValue("height");
            block.style.height = "0";
            toggler.classList.remove("is-active");
            block.classList.remove("is-expanded");
        }

        block.addEventListener("transitionend", () => {
            if (block.style.height !== "0px") {
                block.style.height = "auto";
            }
        });
    }
}

window.addEventListener("DOMContentLoaded", (e) => {
    initLozad();
    initFoldedElements();
    initAccordions();
    initWhyUaeSlider();
    initHeader();
    initAnchors();
    initBurgerMenu();
    initAnimations();
});
