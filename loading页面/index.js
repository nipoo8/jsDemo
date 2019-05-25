window.onload = function() {
    var dots = document.getElementById('dots');
    setInterval(function() {
        dots.classList.remove('animate');
        setTimeout(function() {
            dots.classList.add('animate');
        }, 200);
    }, 3750);
};