// ============ WEATHER INTERACTIVITY ============
function toggleWeatherDetail(element) {
    element.classList.toggle('active');
    // Close other details
    document.querySelectorAll('.weather-detail-item-compact').forEach(detail => {
        if (detail !== element) {
            detail.classList.remove('active');
        }
    });
}

// ============ CONTACT UTILITIES ============
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show toast notification
        showToast('Berhasil disalin! ✓');
    }).catch(() => {
        alert('Gagal menyalin teks');
    });
}

function openWhatsApp(phoneNumber) {
    // Clean phone number from non-numeric characters
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}`, '_blank');
}

function sendFormToWhatsApp(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    if (!name || !message) {
        showToast('Mohon isi nama dan pesan Anda! ⚠️');
        return;
    }

    const text = `Halo RT 06 RW 02 Kadirojo 2,%0A%0A` +
        `*Nama:* ${name}%0A` +
        `*Email:* ${email}%0A` +
        `*No. Telp:* ${phone || '-'}%0A%0A` +
        `*Pesan:*%0A${message}`;

    const phoneNumber = '6287847712990';
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');

    showToast('Membuka WhatsApp... 🚀');
}

function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            // Check if the user clicked the WhatsApp button or the main submit
            // For now, let's keep the main submit going to FormSubmit.co
            // but add a listener for the specific WhatsApp button if we change it.
        });
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #25D366 0%, #20BA5A 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        font-weight: 600;
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 8px 25px rgba(37, 211, 102, 0.3);
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// ============ CURSOR BLOB EFFECT ============
function initCursorBlob() {
    const blob = document.getElementById('cursor-blob');
    if (!blob) return;

    window.addEventListener('mousemove', e => {
        requestAnimationFrame(() => {
            blob.style.left = e.clientX + 'px';
            blob.style.top = e.clientY + 'px';
        });
    });
}

// ============ TYPEWRITER EFFECT ============
function initTypewriter() {
    const text = "RT 06 RW 02 Kadirojo 2";
    const element = document.getElementById('typewriter');
    let i = 0;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }

    if (element) {
        element.textContent = "";
        type();
    }
}

// ============ SCROLL PROGRESS ============
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress');
    if (!scrollProgress) return;

    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + "%";
}

// ============ INTERACTIVE STAT DETAILS ============
function toggleStatDetail(element) {
    element.classList.toggle('active');
    // Close other stats
    document.querySelectorAll('.stat').forEach(stat => {
        if (stat !== element) {
            stat.classList.remove('active');
        }
    });
}

// ============ ABOUT SECTION INTERACTIVITY ============
function toggleAboutExpanded() {
    const expanded = document.getElementById('about-expanded');
    const intro = document.querySelector('.about-intro');

    if (expanded.style.display === 'none') {
        expanded.style.display = 'block';
        intro.style.backgroundColor = 'rgba(0, 119, 190, 0.05)';
    } else {
        expanded.style.display = 'none';
        intro.style.backgroundColor = '';
    }
}

// ============ 3D TILT EFFECT ============
function initTilt() {
    const tiltElements = document.querySelectorAll('.stat, .about-item, .service-card, .info-card');

    tiltElements.forEach(el => {
        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale(1.02)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)`;
        });
    });
}

// ============ COUNTER ANIMATION ============
function initCounter() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ============ STORIES MANAGEMENT ============
const stories = [
    {
        image: 'images/story-nature.jpg',
        title: 'Keindahan Alam Desa',
        caption: 'Gotong Royong'
    },
    {
        image: 'images/story-farming.jpg',
        title: 'Program Pertanian',
        caption: 'Kegiatan pertanian berkelanjutan desa kami'
    },
    {
        image: 'images/story-umkm.jpg',
        title: 'Gotong Royong',
        caption: 'Produk unggulan dari pengusaha lokal'
    },
    {
        image: 'images/story-people.jpg',
        title: 'Gotong Royong',
        caption: 'Kebersamaan masyarakat desa'
    }
];

let currentStory = 0;
let storyAutoPlay;
let storyProgress = 0;

function showStory(index) {
    currentStory = index;
    const story = stories[index];

    document.getElementById('story-image').src = story.image;
    document.getElementById('story-title').textContent = story.title;
    document.getElementById('story-caption').textContent = story.caption;

    // Update dots
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    // Reset progress animation
    const progressBar = document.querySelector('.story-progress-fill');
    progressBar.style.animation = 'none';
    setTimeout(() => {
        progressBar.style.animation = 'progress 5s linear forwards';
    }, 10);
}

function nextStory() {
    showStory((currentStory + 1) % stories.length);
    clearInterval(storyAutoPlay);
    startAutoPlay();
}

function previousStory() {
    showStory((currentStory - 1 + stories.length) % stories.length);
    clearInterval(storyAutoPlay);
    startAutoPlay();
}

function goToStory(index) {
    showStory(index);
    clearInterval(storyAutoPlay);
    startAutoPlay();
}

function startAutoPlay() {
    storyAutoPlay = setInterval(() => {
        nextStory();
    }, 5000);
}

function pauseAutoPlay() {
    clearInterval(storyAutoPlay);
}

function resumeAutoPlay() {
    startAutoPlay();
}

// ============ WEATHER MANAGEMENT ============
function fetchWeather() {
    const latitude = -7.759056;
    const longitude = 110.448001;

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=celsius`)
        .then(res => res.json())
        .then(data => {
            const current = data.current;
            updateWeather(current.temperature_2m, current.relative_humidity_2m, current.weather_code, current.wind_speed_10m);
        })
        .catch(err => console.log('Error fetching weather:', err));
}

function updateWeather(temp, humidity, code, wind) {
    // Update main weather widget
    const tempDisplay = document.getElementById('weather-temp-display');
    if (tempDisplay) {
        tempDisplay.textContent = Math.round(temp);
    }

    const statusDisplay = document.getElementById('weather-status');
    if (statusDisplay) {
        statusDisplay.textContent = getWeatherDescription(code);
    }

    // Update humidity display
    const humidityDisplay = document.getElementById('humidity-display');
    if (humidityDisplay) {
        humidityDisplay.textContent = humidity + '%';
    }

    // Update wind display
    const windDisplay = document.getElementById('wind-display');
    if (windDisplay) {
        windDisplay.textContent = Math.round(wind) + ' km/h';
    }

    // Update weather icons
    updateWeatherIconDisplay(code);

    // Update modal displays
    const tempModal = document.getElementById('weather-temp-modal');
    if (tempModal) {
        tempModal.textContent = Math.round(temp) + '°C';
    }

    const descModal = document.getElementById('weather-description-modal');
    if (descModal) {
        descModal.textContent = getWeatherDescription(code);
    }

    const humidityModal = document.getElementById('humidity-modal');
    if (humidityModal) {
        humidityModal.textContent = humidity + '%';
    }

    const windModal = document.getElementById('wind-modal');
    if (windModal) {
        windModal.textContent = Math.round(wind) + ' km/h';
    }

    // Update floating weather widget
    const floatingTemp = document.getElementById('floating-temp');
    if (floatingTemp) {
        floatingTemp.textContent = Math.round(temp) + '°C';
    }

    const floatingIcon = document.getElementById('floating-weather-icon');
    if (floatingIcon) {
        floatingIcon.className = getWeatherIcon(code);
    }
}

function getWeatherDescription(code) {
    const weatherCodes = {
        0: 'Cerah',
        1: 'Sebagian Berawan',
        2: 'Berawan',
        3: 'Mendung',
        45: 'Berkabut',
        48: 'Berkabut',
        51: 'Gerimis Ringan',
        53: 'Gerimis',
        55: 'Gerimis Lebat',
        61: 'Hujan Ringan',
        63: 'Hujan',
        65: 'Hujan Lebat',
        71: 'Salju Ringan',
        73: 'Salju',
        75: 'Salju Lebat',
        77: 'Butir Salju',
        80: 'Hujan Ringan Rintik',
        81: 'Hujan Rintik',
        82: 'Hujan Rintik Lebat',
        85: 'Salju Ringan Rintik',
        86: 'Salju Rintik Lebat',
        95: 'Badai Petir',
        96: 'Badai Petir dengan Butir Es',
        99: 'Badai Petir dengan Salju Es'
    };
    return weatherCodes[code] || 'Tidak Diketahui';
}

function updateWeatherIcon(code) {
    const iconElements = [
        document.getElementById('weather-icon'),
        document.getElementById('weather-icon-main'),
        document.getElementById('weather-icon-modal')
    ];

    const iconClass = getWeatherIcon(code);

    iconElements.forEach(elem => {
        if (elem) {
            elem.className = iconClass;
        }
    });
}

function getWeatherIcon(code) {
    if (code === 0) {
        return 'fas fa-sun';
    } else if (code === 1 || code === 2) {
        return 'fas fa-cloud-sun';
    } else if (code === 3) {
        return 'fas fa-cloud';
    } else if (code >= 45 && code <= 48) {
        return 'fas fa-smog';
    } else if ((code >= 51 && code <= 55) || (code >= 61 && code <= 65) || (code >= 80 && code <= 82)) {
        return 'fas fa-cloud-rain';
    } else if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
        return 'fas fa-snowflake';
    } else if (code >= 95 && code <= 99) {
        return 'fas fa-bolt';
    } else {
        return 'fas fa-cloud';
    }
}

// ============ MAP MANAGEMENT ============
let mapInstance = null;

function initializeSmallMap() {
    const mapContainer = document.getElementById('map-container');
    if (!mapContainer || mapContainer.querySelector('.leaflet-container')) return;

    const latitude = -7.759056;
    const longitude = 110.448001;

    const map = L.map('map-container', {
        dragging: true,
        touchZoom: true,
        doubleClickZoom: true,
        scrollWheelZoom: true,
        zoomControl: true,
        attributionControl: false
    }).setView([latitude, longitude], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map);
}

function openMapFullscreen() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: white;
        z-index: 1000;
        display: flex;
        flex-direction: column;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        z-index: 1001;
        background: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    `;
    closeBtn.innerHTML = '✕';
    closeBtn.onclick = () => overlay.remove();

    const mapContainer = document.createElement('div');
    mapContainer.id = 'map-fullscreen';
    mapContainer.style.cssText = `
        flex: 1;
        width: 100%;
        height: 100%;
    `;

    overlay.appendChild(closeBtn);
    overlay.appendChild(mapContainer);
    document.body.appendChild(overlay);

    setTimeout(() => {
        const fullscreenMap = L.map('map-fullscreen', {
            dragging: true,
            touchZoom: true,
            doubleClickZoom: true,
            scrollWheelZoom: true,
            zoomControl: true,
            attributionControl: true
        }).setView([-7.759056, 110.448001], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(fullscreenMap);

        L.marker([-7.759056, 110.448001], {
            title: 'Desa Kadirojo 2'
        }).addTo(fullscreenMap)
            .bindPopup(
                '<div style="text-align: center;">' +
                '<strong style="font-size: 1.1rem; color: #0077be;">Desa Kadirojo 2</strong><br>' +
                '<small>7°45′32.612″S 110°26′54.763″E</small>' +
                '</div>',
                { maxWidth: 250 }
            )
            .openPopup();

        L.circle([-7.759056, 110.448001], {
            color: '#0077be',
            fillColor: '#0077be',
            fillOpacity: 0.1,
            weight: 2,
            radius: 1000,
            dashArray: '5, 5'
        }).addTo(fullscreenMap);

        fullscreenMap.invalidateSize();
    }, 100);
}

// ============ FAQ MANAGEMENT ============
function toggleAnswer(element) {
    const faqItem = element.closest('.faq-item');
    const answer = faqItem.querySelector('.faq-answer');

    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });

    faqItem.classList.toggle('active');
}

// ============ INFO MODAL MANAGEMENT ============
function openInfoModal(element) {
    const img = element.querySelector('img');
    const modal = document.getElementById('info-modal');
    const modalImage = document.getElementById('info-modal-image');

    modalImage.src = img.src;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeInfoModal(event) {
    if (event && event.type === 'click' && event.target.id !== 'info-modal') {
        return;
    }

    const modal = document.getElementById('info-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal on Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeInfoModal();
    }
});

// ============ SCROLL ANIMATIONS ============
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.about h2, .services h2, .stories-section h2, .weather-section h2, .faq-section h2, .map-section h2, .contact h2').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    document.querySelectorAll('.about-item, .service-card, .faq-item, .info-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animationDelay = (index * 0.1) + 's';
        observer.observe(el);
    });
}

// ============ NAVBAR MANAGEMENT ============
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Sticky Navbar on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Initialize cursor blob
    initCursorBlob();

    // Initialize stories
    showStory(0);
    startAutoPlay();

    const storyViewer = document.querySelector('.story-viewer');
    if (storyViewer) {
        storyViewer.addEventListener('mouseenter', pauseAutoPlay);
        storyViewer.addEventListener('mouseleave', resumeAutoPlay);
        storyViewer.addEventListener('touchstart', pauseAutoPlay);
        storyViewer.addEventListener('touchend', resumeAutoPlay);
    }

    // Fetch weather
    fetchWeather();

    // Initialize map
    setTimeout(initializeSmallMap, 500);

    // Initialize scroll animations
    initializeScrollAnimations();

    // Remove Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
                // Trigger typewriter after preloader is gone
                initTypewriter();
            }, 600);
        }, 1500);
    } else {
        initTypewriter();
    }

    // Scroll progress listener
    window.addEventListener('scroll', updateScrollProgress);

    // Initialize Counter
    initCounter();

    // Initialize 3D Tilt
    initTilt();
});

// Refresh weather every 10 minutes
setInterval(fetchWeather, 600000);

// ============ WEATHER MODAL FUNCTIONS ============
function openWeatherModal() {
    const modal = document.getElementById('weather-modal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeWeatherModal(event) {
    if (event && event.target.id !== 'weather-modal') {
        return;
    }
    const modal = document.getElementById('weather-modal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Consolidated with updateWeatherIcon and getWeatherIcon
function updateWeatherIconDisplay(code) {
    updateWeatherIcon(code);
}

