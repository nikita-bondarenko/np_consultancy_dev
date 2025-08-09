// Аккордеон
document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    function toggleAccordion(item) {
        const wrapper = item.querySelector('.accordion-item__wrapper');
        const content = item.querySelector('.accordion-item__content');
        const isActive = item.classList.contains('active');
        
        if (isActive) {
            // Закрываем аккордеон
            item.classList.remove('active');
            wrapper.style.height = '0px';
        } else {
            // Закрываем все остальные аккордеоны
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherWrapper = otherItem.querySelector('.accordion-item__wrapper');
                    if (otherWrapper) {
                        otherWrapper.style.height = '0px';
                    }
                }
            });
            
            // Открываем текущий аккордеон
            item.classList.add('active');
            const contentHeight = content.scrollHeight;
            wrapper.style.height = contentHeight + 'px';
        }
    }
    
    // Инициализация аккордеона
    accordionItems.forEach(item => {
        const heading = item.querySelector('.accordion-item__heading');
        const wrapper = item.querySelector('.accordion-item__wrapper');
        
        if (heading && wrapper) {
            // Устанавливаем начальную высоту
            wrapper.style.height = '0px';
            wrapper.style.overflow = 'hidden';
            wrapper.style.transition = 'height 0.3s ease-in-out';
            
            // Добавляем обработчик клика
            item.addEventListener('click', function() {
                toggleAccordion(item);
            });
            
            // Делаем заголовок интерактивным
            item.style.cursor = 'pointer';
        }
    });
    
    // Опционально: открываем первый элемент по умолчанию
    // if (accordionItems.length > 0) {
    //     toggleAccordion(accordionItems[0]);
    // }
});