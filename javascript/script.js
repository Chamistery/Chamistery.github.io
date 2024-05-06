const btn = document.getElementById('theme-toggle');
const body = document.body;
const themeKey = 'theme';

const savedTheme = localStorage.getItem(themeKey);

if (savedTheme) {
    body.classList.add(savedTheme);
}

btn.addEventListener('click', function() {
    // Если текущая тема - светлая, то переключаем на темную и сохраняем в Local Storage
    if (!body.classList.contains('dark-theme')) {
        body.classList.add('dark-theme');
        localStorage.setItem(themeKey, 'dark-theme');
    }
    // Если текущая тема - темная, то переключаем на светлую и удаляем из Local Storage
    else {
        body.classList.remove('dark-theme');
        localStorage.removeItem(themeKey);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('popup');
    const close = document.querySelector('.close');
    function showPopup() {
        if (!localStorage.getItem('popupClosed')) {
            setTimeout(() => {
                popup.style.display = 'flex';
            }, 30000);  // 30 секунд
        }
    }

    close.addEventListener('click', function() {
        popup.style.display = 'none';
        localStorage.setItem('popupClosed', 'true');
    });

    showPopup();
});

function validatePhone(phone) {
    return /^\+?[78][-(]?\d{3}\)??\d{3}?\d{2}?\d{2}$/.test(phone);
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateMessage(message) {
    return /^[а-яА-ЯёЁa-zA-Z\s]+$/.test(message);
}

function countdown(targetDate) {
    const endDate = new Date(targetDate).getTime();

    const timer = setInterval(function() {
        const now = new Date().getTime();
        const difference = endDate - now;

        if (difference < 0) {
            clearInterval(timer);
            document.getElementById('timer').innerHTML = "Событие началось!";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }, 1000);
}

// Задайте целевая дата
countdown('2024-06-21');

let bg = document.querySelector('.mouse-parallax-bg');
window.addEventListener('mousemove', function(e) {
    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerHeight;  
    bg.style.transform = 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)';
});

document.addEventListener('DOMContentLoaded', function() {
    let images = document.querySelectorAll('.gallery-img');
    let popup = document.getElementById('popup_gallery');
    let popupImg = document.querySelector('.popup-img');
    const navbar = document.querySelector(".navbar");
    let currentIndex = 0;

    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            popup.style.display = 'flex';
            navbar.classList.remove('fixed');
            popupImg.src = img.src;
            currentIndex = index;
            updateButtons();
        });
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.popup-content') && !event.target.closest('.next') && !event.target.closest('.prev') && !event.target.closest('.gallery-img')) {
            popup.style.display = 'none';
            navbar.classList.add('fixed');
        }
    });

    document.querySelector('.prev').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            popupImg.src = images[currentIndex].src;
            updateButtons();
        }
    });

    document.querySelector('.next').addEventListener('click', () => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            popupImg.src = images[currentIndex].src;
            updateButtons();
        }
    });

    function updateButtons() {
        document.querySelector('.prev').style.display = currentIndex === 0 ? 'none' : '';
        document.querySelector('.next').style.display = currentIndex === images.length - 1 ? 'none' : '';
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const feedbackPopup = document.getElementById('feedback-popup');
    const openFeedbackPopupButton = document.getElementById('open-feedback-popup');
    const closeFeedback = document.querySelector('.close-feedback');
    const feedbackForm = document.getElementById('feedback-form');
    const submitButton = feedbackForm.querySelector('button[type="submit"]');
    const navbar = document.querySelector('.navbar');

    openFeedbackPopupButton.addEventListener('click', function() {
        feedbackPopup.classList.add('show');
        navbar.style.position = "relative";
    });

    closeFeedback.addEventListener('click', function() {
        feedbackPopup.classList.remove('show');
        navbar.style.position = "fixed";
    });
    
    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let phone = document.getElementById('phone').value;
        let email = document.getElementById('email').value;
        let message = document.getElementById('message').value;
        console.log(message);

        if (validatePhone(phone) && validateEmail(email) && validateMessage(message)) {
            submitButton.textContent = "Отправляем...";
            submitButton.classList.add('button-loading');
            submitButton.disabled = true;

            sendData({ phone, email, message });
        } else {
            alert("Проверьте введенные данные.");
        }
    });

    function sendData(data) {
        fetch('http://test.test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            submitButton.textContent = "Успешно отправлено";
            submitButton.classList.replace('button-loading', 'button-success');
        })
        .catch(error => {
            submitButton.textContent = "Успешно отправлено";
            submitButton.disabled = false;
            alert("Ошибка при отправке: " + error.message);
            submitButton.classList.replace('button-loading', 'button-success');
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const feedbackPopup = document.getElementById('feedback-popup');
    const stickyStart = window.innerHeight; // Высота одного экрана
    let popup = document.getElementById('popup_gallery');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= stickyStart && popup.style.display == 'none' && !feedbackPopup.classList.contains('show')) {
            navbar.classList.add('fixed');
        } else {
            navbar.classList.remove('fixed');
        }
    });
});
