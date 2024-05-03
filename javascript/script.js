const btn = document.getElementById('theme-toggle');
btn.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
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

countdown('2024-06-21');

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
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

let bg = document.querySelector('.mouse-parallax-bg');
window.addEventListener('mousemove', function(e) {
    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerHeight;  
    bg.style.transform = 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)';
});

document.addEventListener('DOMContentLoaded', function() {
    let images = document.querySelectorAll('.gallery-img');
    let popup = document.getElementById('popup_gallery');
    const navbar = document.getElementById('navbar');
    let popupImg = document.querySelector('.popup-img');
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

    document.querySelector('.close_gallery').addEventListener('click', () => {
        popup.style.display = 'none';
        navbar.classList.add('fixed');
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
    const navbar = document.getElementById('navbar');

    openFeedbackPopupButton.addEventListener('click', function() {
        feedbackPopup.classList.add('show');
        navbar.classList.remove('fixed');
    });

    closeFeedback.addEventListener('click', function() {
        feedbackPopup.classList.remove('show');
        navbar.classList.add('fixed');
    });

    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let phone = document.getElementById('phone').value;
        let email = document.getElementById('email').value;
        let message = document.getElementById('message').value;

        if (validatePhone(phone) && validateEmail(email) && validateMessage(message)) {
            submitButton.textContent = "Отправляем...";
            submitButton.classList.add('button-loading');
            submitButton.disabled = true;
            navbar.classList.add('fixed');

            sendData({ phone, email, message });
        } else {
            alert("Проверьте введенные данные.");
        }
    });

    function sendData(data) {
        fetch('your_post_url_here', {
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
            submitButton.textContent = "Ошибка отправки";
            submitButton.disabled = false;
            alert("Ошибка при отправке: " + error.message);
        });
    }
});
