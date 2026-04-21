// --- Timer Logic ---
const deadline = new Date("2026-08-29T16:00:00+03:00").getTime();

const timerInterval = setInterval(function() {
  const now = new Date().getTime();
  const distance = deadline - now;

  // Time calculations
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update HTML
  document.getElementById("days").innerText = days < 10 ? "0" + Math.max(0, days) : Math.max(0, days);
  document.getElementById("hours").innerText = ("0" + Math.max(0, hours)).slice(-2);
  document.getElementById("minutes").innerText = ("0" + Math.max(0, minutes)).slice(-2);
  document.getElementById("seconds").innerText = ("0" + Math.max(0, seconds)).slice(-2);

  // If the countdown is over
  if (distance < 0) {
    clearInterval(timerInterval);
    document.getElementById("timer").innerHTML = "<div class='timer-col'><span class='timer-num'>00</span></div>";
  }
}, 1000);


// --- Modal Logic ---
function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = "none";
  }
}


// --- Gallery Slider Logic ---
let slideIndex = 1;
const slides = document.getElementsByClassName("slider-img");

function changeSlide(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  if(slides.length > 0) {
    slides[slideIndex-1].classList.add("active");
  }
}


// --- Form Conditional Logic ---
function updateQty(id, change) {
    const input = document.getElementById(id);
    let newVal = parseInt(input.value) + change;
    if (newVal < 0) newVal = 0;
    input.value = newVal;
}

function toggleAccomodationDates(show) {
    const el = document.getElementById("datesField");
    el.style.display = show ? "block" : "none";
}

function toggleHelpOptions(show) {
    const el = document.getElementById("helpOptionsField");
    el.style.display = show ? "block" : "none";
}

// --- Phone Masking ---
const phoneInput = document.getElementById('phoneInput');
if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        if (!x[2] && x[1] !== '') {
            e.target.value = x[1] === '7' || x[1] === '8' ? '+7 (' : '+7 (' + x[1];
        } else {
            e.target.value = !x[3] ? '+7 (' + x[2] : '+7 (' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
        }
    });

    phoneInput.addEventListener('keydown', function (e) {
        if (e.keyCode == 8 && e.target.value.length <= 4) {
            e.preventDefault();
        }
    });
}

// Form Handlers (EmailJS integration)
document.getElementById('declineForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.submit-btn');
    const originalText = btn.innerText;
    btn.innerText = 'ОТПРАВКА...';
    btn.disabled = true;

    // Параметры: serviceID, templateID, formElement, publicKey (опционально, если инициализировано)
    emailjs.sendForm('service_wyuylji', 'template_rqrmsic', this)
        .then(() => {
            this.style.display = 'none';
            this.parentElement.querySelector('.form-success').style.display = 'block';
        }, (error) => {
            console.error('FAILED...', error);
            alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
            btn.innerText = originalText;
            btn.disabled = false;
        });
});

document.getElementById('acceptForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Валидация телефона
    const phoneVal = document.getElementById('phoneInput').value;
    const phoneDigits = phoneVal.replace(/\D/g, '');
    const phoneError = document.getElementById('phoneError');

    if (phoneDigits.length < 11) {
        phoneError.style.display = 'block';
        document.getElementById('phoneInput').focus();
        return;
    } else {
        phoneError.style.display = 'none';
    }

    const btn = this.querySelector('.submit-btn');
    const originalText = btn.innerText;
    btn.innerText = 'ОТПРАВКА...';
    btn.disabled = true;

    emailjs.sendForm('service_wyuylji', 'template_9iuy4vq', this)
        .then(() => {
            this.style.display = 'none';
            this.parentElement.querySelector('.form-success').style.display = 'block';
            this.parentElement.querySelector('.form-desc').style.display = 'none';
        }, (error) => {
            console.error('FAILED...', error);
            alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
            btn.innerText = originalText;
            btn.disabled = false;
        });
});


// --- Yandex Maps Initialization (Simple version) ---
ymaps.ready(init);
function init() {
    // 55.757999, 37.605296 is Вознесенский пер., 8/5
    var myMap = new ymaps.Map("map", {
        center: [56.060251, 49.840182],
        zoom: 15,
        controls: ['zoomControl']
    });

    var myPlacemark = new ymaps.Placemark([56.060251, 49.840182], {
        hintContent: 'Место проведения',
        balloonContent: 'Татарская усадьба, банкетный зал «Веранда усадьбы»'
    }, {
        preset: 'islands#blackIcon'
    });

    myMap.geoObjects.add(myPlacemark);
    
    // Switch to grayscale map style similar to tilda using behaviors or tile layers if needed
    // Tilda uses custom tile styles for Google/Yandex. We'll leave it as default clean Yandex Map layout.
}
