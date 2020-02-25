$(document).ready(() => {
    $('.owl-carousel-recalls .owl-stage').mouseover(function (e) {
        let mouseX = e.clientX; // Координаты по Х у мышки
        let windowWidth = window.innerWidth; // Ширина экрана
        let half = windowWidth / 2; // половина ширины экрана, для рассчета, влево или вправо
        if (mouseX <= half) {
            $('.owl-carousel-recalls').addClass('leftArrow').removeClass('rightArrow')
        } else {
            $('.owl-carousel-recalls').removeClass('leftArrow').addClass('rightArrow')
        }
    })
    $(document).on('click', '.owl-carousel-recalls.leftArrow .owl-stage', function () {
        $('.owl-carousel-recalls').trigger('prev.owl.carousel');

    })
    $(document).on('click', '.owl-carousel-recalls.rightArrow .owl-stage', function () {
        $('.owl-carousel-recalls').trigger('next.owl.carousel');

    })
})