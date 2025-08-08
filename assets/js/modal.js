



const initModalFunction = () => {
    const openButtons = document.querySelectorAll('.open-modal-button')
    const modals = document.querySelectorAll('.modal')
    Array.from(openButtons).forEach(button => button.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = button.dataset.openModalWithId
        Array.from(modals).find(modal => {
            if (modal.id === modalId) {
                modal.classList.add('open')
            } else {
                modal.classList.remove('open')
            }
        })

    }))

    Array.from(modals).forEach(modal => {
        modal.addEventListener('click', (e) => {
            modal.classList.remove('open')
        })
        const modalWindow = modal.querySelector('.modal__window')
        if (modalWindow) {
            modalWindow.addEventListener("click", (e) => {
                e.stopPropagation()
            })
        }
        const closeButtons = modal.querySelectorAll('.modal__close')
        Array.from(closeButtons).forEach(button => button.addEventListener('click', (e) => {
            e.preventDefault()
            modal.classList.remove('open')
        }))


    })


}

const initSelectFunction = () => {
    const selects = document.querySelectorAll('.select')


    Array.from(selects).forEach(select => {
        const input = select.querySelector('input')
        const options = select.querySelectorAll('.select__option')
        const value = select.querySelector('.select__value')
        const dropdown = select.querySelector('.select__dropdown')
        console.log(input, options, value, dropdown)

        select.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopPropagation()
            select.classList.toggle('open')
            select.focus()
        })

        Array.from(options).forEach(option => option.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopPropagation()
            input.value = option.dataset.value
            console.log(value)
            value.textContent = option.textContent
            Array.from(options).forEach(option => option.classList.remove('selected'))
            option.classList.add('selected')
            select.focus()
            select.classList.remove('open')
        }))
        // Событие, когда фокус уходит с select и его дочерних элементов — это 'focusout'
        select.addEventListener('focusout', (e) => {
            // Проверяем, что фокус ушёл за пределы select, а не просто на дочерний элемент
            if (!select.contains(e.relatedTarget)) {
                select.classList.remove('open')
            }
        })
    })
}

const initCheckboxFunction = () => {
    const checkboxes = document.querySelectorAll('.checkbox')
    console.log(checkboxes)
    Array.from(checkboxes).forEach(checkbox => {
        const button = checkbox.querySelector('.checkbox__button')
        const input = checkbox.querySelector('input')
        console.log(button, input)

        button.addEventListener('click', (e) => {
            e.preventDefault()
            if (input.checked) {
                input.checked = false
                button.classList.remove('checked')
            } else {
                input.checked = true
                button.classList.add('checked')

            }
        })
    })
}

const initFormFunction = () => {
    initSelectFunction()
    initCheckboxFunction()
    const forms = document.querySelectorAll('.form')

    Array.from(forms).forEach(form => {
        console.log(form.elements)
        const nameInput = form.elements.name
        const wayInput = form.elements.way
        const phoneInput = form.elements.phone
        const telegramInput = form.elements.telegram
        const emailInput = form.elements.email
        const agreementInput = form.elements.agreement
        const submitButton = form.querySelector('.submit')
        const timeoutsIds = {
            'name': '',
            'phone': '',
            'telegram': '',
            'email': '',
            'agreement': '',

        }

        const setError = ({ key }) => {
            const element = form.querySelector(`.${key}`)
            if (!element) return


            clearTimeout(timeoutsIds[key])
            element.classList.add('error')
            const timeoutId = setTimeout(() => {
                element.classList.remove('error')
            }, 3000)

            timeoutsIds[key] = timeoutId
        }

        const validate = () => {
            console.log(wayInput.value)
            const requiredFieldValidationObject = {
                name: false,
                agreement: false,
                ...(wayInput.value === 'phone' ? { phone: false } : wayInput.value === 'telegram' ? { telegram: false } : { email: false })
            }

            Object.entries(form.elements).forEach(([key, element]) => {
                const value = element.value
                if (key === 'name') {
                    if (value.trim().length > 0) {
                        requiredFieldValidationObject.name = true
                    }
                }

                if (key === 'agreement') {
                    if (element.checked) {
                        requiredFieldValidationObject.agreement = true
                    }
                }

                if (key === 'phone' && requiredFieldValidationObject.hasOwnProperty('phone')) {
                    if (value.split('').filter(symbol => Number.isInteger(Number(symbol))).length === 11) {
                        requiredFieldValidationObject.phone = true
                    }
                }
                if (key === 'telegram' && requiredFieldValidationObject.hasOwnProperty('telegram')) {
                    if (value.trim().length > 0) {
                        requiredFieldValidationObject.telegram = true
                    }
                }
                if (key === 'email' && requiredFieldValidationObject.hasOwnProperty('email')) {
                    const lastAtIndex = value.lastIndexOf('@')
                    const lastDoteIndex = value.lastIndexOf('.')
                    if (lastAtIndex > 2 && lastDoteIndex - lastAtIndex > 2 && value.length > lastDoteIndex - 1) {
                        requiredFieldValidationObject.email = true
                    }
                }
            })
            return requiredFieldValidationObject
        }

        nameInput?.addEventListener('keydown', (e) => {
            if (Number.isInteger(Number(e.key))) {
                e.preventDefault()
            }
        })

        phoneInput?.addEventListener('keydown', (e) => {
            if (!Number.isInteger(Number(e.key))) {
                e.preventDefault()
            }
        })

        const putFieldInHtml = ({ label, value }) => {
            console.log(label, value)
            return value && value?.trim().length > 0 ? `<p><strong>${label}:</strong>${value}</p>` : ''
        }

        submitButton.addEventListener('click', async (e) => {

            e.preventDefault()
            const validationResult = validate()
            if (Object.values(validationResult).every(isValidationSuccess => isValidationSuccess)) {
                const wayValue = form.querySelector('.way .select__value')?.textContent
                const htmlBody = `
                ${putFieldInHtml({ label: 'Имя', value: nameInput.value })}
                ${putFieldInHtml({ label: 'Предпочтительный способ связи', value: wayValue })}
                ${putFieldInHtml({ label: 'Телефон', value: phoneInput.value })}
                ${putFieldInHtml({ label: 'Telegram', value: telegramInput.value })}
                ${putFieldInHtml({ label: 'Email', value: emailInput.value })}
                `
                console.log(htmlBody)
                submitButton.classList.add('pending')
                setTimeout(() => {
                    nameInput.value = ''
                    phoneInput.value = ''
                    telegramInput.value = ''
                    emailInput.value = ''
                    submitButton.classList.remove('pending')

                    const modals = document.querySelectorAll('.modal')

                    Array.from(modals).find(modal => {
                        if (modal.id === 'modal-success') {
                            modal.classList.add('open')
                            setTimeout(() => {
                                modal.classList.remove('open')
                            }, 3000)
                        } else {
                            modal.classList.remove('open')
                        }
                    })


                }, 1000)
            } else {
                Object.entries(validationResult).forEach(([key, value]) => {
                    if (!value) {
                        setError({ key: key })
                    }
                })
            }
        })




    })
}

document.addEventListener('DOMContentLoaded', () => {
    initModalFunction();

    initFormFunction();
});