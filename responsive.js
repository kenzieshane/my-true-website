(function () {
    function isIE() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        var trident = ua.indexOf('Trident/');
        return (msie > 0 || trident > 0);
    }

    function isLegacyIE() {
        var documentMode = window.document.documentMode;
        return typeof documentMode === 'number' && documentMode > 0 && documentMode <= 9;
    }

    function updateRemoveWhenSmallElements() {
        var targets = document.querySelectorAll('#remove-when-small');
        var isSmall = window.innerWidth <= 470;

        for (var i = 0; i < targets.length; i++) {
            var target = targets[i];

            if (isSmall) {
                if (target.getAttribute('data-original-html') === null) {
                    target.setAttribute('data-original-html', target.innerHTML);
                }
                target.innerHTML = '';
                target.style.display = 'none';
            } else {
                var originalHtml = target.getAttribute('data-original-html');
                if (originalHtml !== null) {
                    target.innerHTML = originalHtml;
                }
                target.style.display = '';
            }
        }
    }

    function bindHandler(eventName, handler) {
        if (window.addEventListener) {
            window.addEventListener(eventName, handler, false);
        } else if (window.attachEvent) {
            window.attachEvent('on' + eventName, handler);
        }
    }

    if (isLegacyIE() && window.location.href.toLowerCase().indexOf('legacy.kenzieshane.my.id/legacy.html') === -1) {
        window.location.replace('https://legacy.kenzieshane.my.id/legacy.html');
        return;
    }

    if (isIE()) {
        var ieSupportBanner = document.getElementById('ie-support-banner');
        if (!ieSupportBanner && document.body) {
            ieSupportBanner = document.createElement('div');
            ieSupportBanner.id = 'ie-support-banner';
            ieSupportBanner.className = 'ie-support-banner';
            ieSupportBanner.innerHTML = 'This site works in IE 10/11, but some visuals are simplified there.';
            ieSupportBanner.style.backgroundImage = 'linear-gradient(to right, #dd0000, #ff0000)';
            ieSupportBanner.style.textAlign = 'center';
            ieSupportBanner.style.padding = '5px';
            ieSupportBanner.style.color = '#fff';
            document.body.insertBefore(ieSupportBanner, document.body.firstChild);
        }
        if (ieSupportBanner) {
            ieSupportBanner.style.display = 'block';
        }
    }

    bindHandler('load', updateRemoveWhenSmallElements);
    bindHandler('resize', updateRemoveWhenSmallElements);
    updateRemoveWhenSmallElements();
})();
