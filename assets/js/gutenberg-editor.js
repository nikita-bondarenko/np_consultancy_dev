class GetCryptoGutenbergEditor {
    constructor() {
        this.init();
    }

    init() {
        this.initMarqueeTabs();
        this.initTabs();
        this.initFoldedElements();
        this.initAccordions();
        this.initHeaderDropdowns();

        window.updateLozad = this.initLozad;
    }

    initHeaderDropdowns() {
        // Инициализация dropdown меню в редакторе
        document.addEventListener('click', (e) => {
            // Находим все dropdown кнопки
            const dropdownBtns = document.querySelectorAll('[data-fold-btn]');
            
            dropdownBtns.forEach(btn => {
                const parent = btn.closest('[data-fold]');
                const content = parent?.querySelector('[data-fold-content]');
                
                if (!content) return;
                
                if (btn.contains(e.target) || e.target === btn) {
                    // Переключаем dropdown
                    e.preventDefault();
                    const isOpen = content.style.display === 'block';
                    content.style.display = isOpen ? 'none' : 'block';
                    parent.classList.toggle('is-open', !isOpen);
                } else if (!parent.contains(e.target)) {
                    // Закрываем dropdown если клик вне его
                    content.style.display = 'none';
                    parent.classList.remove('is-open');
                }
            });
        });

        // Закрываем все dropdown при скролле в редакторе
        const editorCanvas = document.querySelector('.interface-interface-skeleton__content');
        if (editorCanvas) {
            editorCanvas.addEventListener('scroll', () => {
                document.querySelectorAll('[data-fold-content]').forEach(content => {
                    content.style.display = 'none';
                    content.closest('[data-fold]')?.classList.remove('is-open');
                });
            });
        }
    }

    initMarqueeTabs() {
        const marqueeTabs = document.querySelector('.marquee-tabs');

        if (!marqueeTabs) return;

        const marqueeTabsContent = marqueeTabs.querySelector('.marquee-tabs__content');
        const marqueeTabsItems = [...marqueeTabsContent.children];

        updateMarquee();
        window.addEventListener("resize", updateMarquee);

        function updateMarquee() {
            marqueeTabsContent.innerHTML = "";

            let counter = 1;
            let totalWidth = 0;
            let duration = 0;
            const tabsGap = parseInt(window.getComputedStyle(marqueeTabsContent).gap);

            while ((totalWidth < window.innerWidth * 2) || counter <= 2) {
                marqueeTabsItems.forEach((item) => {
                    const itemClone = item.cloneNode(true);

                    marqueeTabsContent.appendChild(itemClone);
                    duration += 3;
                    totalWidth += itemClone.offsetWidth + tabsGap;
                    marqueeTabsContent.style.animationDuration = `${duration}s`;
                });

                counter++;
            }
        }
    }

    initTabs() {
        const tabsContainers = document.querySelectorAll('[data-tabs]');
        console.log(tabsContainers);
        if (!tabsContainers) return;

        tabsContainers.forEach(container => {
            const tabs = container.querySelectorAll('[data-tab]');
            const tabsContents = container.querySelectorAll('[data-tabcontent]');

            tabs.forEach(tab => {
                tab.addEventListener('click', handleTabClick);
            })

            function handleTabClick(e) {
                const { target } = e;
                const tabValue = target.dataset.tab;
                const tabContent = [...tabsContents].find(content => content.dataset.tabcontent === tabValue);

                if (!tabContent) return;

                setActiveTab(target, tabContent);
            }

            function setActiveTab(tab, tabcontent) {
                const activeTab = [...tabs].find(tab => tab.classList.contains('is-active'));
                const activeTabcontent = [...tabsContents].find(tabsContents => tabsContents.classList.contains('is-active'));

                activeTab.classList.remove('is-active');
                activeTabcontent.classList.remove('is-active');
                tab.classList.add('is-active');
                tabcontent.classList.add('is-active');
            }
        })
    }

    initFoldedElements() {
        const foldedElements = document.querySelectorAll('[data-fold]');

        if (!foldedElements) return;

        foldedElements.forEach(foldedElement => {
            let foldedElementContent;
            const foldedElementBtn = foldedElement.querySelector('[data-fold-btn]');
            foldedElementContent = foldedElement.querySelectorAll('[data-fold-content]')

            if (foldedElement.classList.contains('is-dropdown')) {
                foldedElementContent = foldedElement.querySelector('[data-fold-content]')
            }

            this.heightToggleElement(foldedElementBtn, foldedElementContent);
        })
    }

    initAccordions() {
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

    initLozad() {
        const lozadElements = document.querySelectorAll('[data-lozad]');

        if (!lozadElements) return;

        lozadElements.forEach(element => {
            const lozadObserver = lozad(element);

            lozadObserver.observe()
        });
    }

    heightToggleElement(toggler, blocks) {
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
            if (block.style.height === "0px" || !block.style.height && !block.classList.contains('is-expanded')) {
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
}

let isInitialized = false;

wp.data.subscribe(() => {
    if (window?.updateLozad) {
        window.updateLozad();
    }

    if (!isInitialized) {
        const blocks = wp.data.select('core/block-editor').getBlocks();

        if (blocks.length > 0) {
            setTimeout(() => new GetCryptoGutenbergEditor(), 2000);
            isInitialized = true;
        }
    }
});