function openMenu(){
    gsap.to('#list-menu',{
        duration: 0.3,
        x: '-85%'
    })
}

function closeMenu(){
    gsap.to('#list-menu',{
        duration: 0.3,
        x: '0%'
    })
}

const homeSwiper = new Swiper("#home-swiper", {
    effect: "fade",
    slidesPerView: 1,
    autoplay: {
        delay: 3000
    },
    loop: true,
    simulateTouch: false
})

const prodSwiper = new Swiper("#product-swiper",{
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 55,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
        scale: 0.95
    },
    autoplay: {
        delay: 3000
    },
    speed: 2000
})