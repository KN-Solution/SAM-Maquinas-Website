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
    effect: "cards",
    grabCursor: true,
    loop: true,
    autoplay: {
        delay: 3000
    }
})