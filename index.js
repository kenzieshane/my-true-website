function isIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');
    return (msie > 0 || trident > 0);
}

var heroCarousel = document.getElementById('hero-carousel');
var heroSlides = heroCarousel ? heroCarousel.getElementsByClassName('hero-slide') : [];
var heroDots = heroCarousel ? heroCarousel.getElementsByClassName('carousel-dot') : [];
var heroIndex = 0;
var heroTimer = null;

function showHeroSlide(index) {
    if (!heroSlides.length) {
        return;
    }

    if (index < 0) {
        index = heroSlides.length - 1;
    }
    if (index >= heroSlides.length) {
        index = 0;
    }

    for (var i = 0; i < heroSlides.length; i++) {
        heroSlides[i].style.display = 'none';
        if (heroSlides[i].className === 'hero-slide active') {
            heroSlides[i].className = 'hero-slide';
        } else {
            heroSlides[i].className = heroSlides[i].className.replace(' active', '').replace('active', '');
        }
    }

    heroSlides[index].style.display = 'block';
    heroSlides[index].className = 'hero-slide active';
    heroIndex = index;

    for (var j = 0; j < heroDots.length; j++) {
        if (j === index) {
            heroDots[j].className = 'carousel-dot active';
        } else {
            heroDots[j].className = 'carousel-dot';
        }
    }
}

function stopHeroTimer() {
    if (heroTimer) {
        window.clearInterval(heroTimer);
        heroTimer = null;
    }
}

function startHeroTimer() {
    stopHeroTimer();
    heroTimer = window.setInterval(function () {
        showHeroSlide(heroIndex + 1);
    }, 7000);
}

for (var k = 0; k < heroDots.length; k++) {
    heroDots[k].onclick = function () {
        var slideIndex = parseInt(this.getAttribute('data-slide'), 10);
        if (!isNaN(slideIndex)) {
            showHeroSlide(slideIndex);
            startHeroTimer();
        }
    };
}

if (heroCarousel) {
    if (heroCarousel.addEventListener) {
        heroCarousel.addEventListener('mouseenter', stopHeroTimer, false);
        heroCarousel.addEventListener('mouseleave', startHeroTimer, false);
    }
    showHeroSlide(0);
    startHeroTimer();
}

var blog = document.getElementById('blog-link');
var blog2 = document.getElementById('blog2-link');

if (isIE()) {
    if (blog) {
        blog.href = '#';
        blog.textContent = 'Blogs (Not supported in IE)';
        blog.style.color = '#999';
    }
    if (blog2) {
        blog2.style.fontSize = '12px';
        blog2.href = '#';
        blog2.textContent = 'Blogs (Not supported in IE)';
        blog2.style.color = '#999';
    }
}
