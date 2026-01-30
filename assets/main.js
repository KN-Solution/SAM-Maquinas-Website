var menuOpen = false;

function openMenu() {
    if (menuOpen) {
        closeMenu();
        return;
    }
    gsap.to('#list-menu', {
        duration: 0.3,
        x: '-85%',
        onComplete: () => {
            menuOpen = true;
        }
    })
}

function closeMenu() {
    gsap.to('#list-menu', {
        duration: 0.3,
        x: '0%',
        onComplete: () => {
            menuOpen = false;
        }
    })
}

const homeSwiper = new Swiper("#home-swiper", {
    effect: "fade",
    slidesPerView: 1,
    autoplay: {
        delay: 5000
    },
    loop: true,
    simulateTouch: false,
    on: {
        slideChangeTransitionStart: function () {
            const activeSlide = this.slides[this.activeIndex];
            const gifs = activeSlide.querySelectorAll('.gif');

            gifs.forEach(gif => {
                const original = gif.dataset.animated;

                // Reinicia o GIF SEM precisar de imagem estática
                gif.src = "";
                gif.offsetHeight; // força o reflow
                gif.src = original;
            });
        }
    }
})

const aboutSwiper = new Swiper('#about-swiper', {
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    autoplay: {
        delay: 8000
    },
    grabCursor: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    }
})

const partnerSwiper = new Swiper('#swiper-partners', {
    freemode: false,
    loop: true,
    speed: 5000,
    spaceBetween: 30,
    simulateTouch: false,
    grabCursor: false,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },
    breakpoints:{
        1200:{
            slidesPerView: 5,
            spaceBetween: 30,
        },
        860:{
            slidesPerView: 4,
            spaceBetween: 20,
        },
        600:{
            slidesPerView: 3,
            spaceBetween: 10,
        },
        450:{
            slidesPerView: 2,
            spaceBetween: 10,
        }
    }
})

function changeContent(contentID, menu) {
    const contentList = document.querySelectorAll('.content');
    const menuList = document.querySelectorAll('.menu-item');
    menuList.forEach((menu) => {
        menu.classList.remove('active')
    })
    menu.classList.add('active');
    gsap.to(contentList, {
        duration: 0.5,
        opacity: 0,
        onComplete: () => {
            contentList.forEach((content) => {
                content.style.display = 'none'
                content.classList.remove('active')
            })
            gsap.to(contentList[contentID], {
                display: 'block',
                duration: 0.5,
                opacity: 1,
                onComplete: () => {
                    contentList[contentID].classList.add('active')
                }
            })
        }
    })
}

function animCursor(el, enter) {
    if (enter) {
        gsap.to(el, {
            duration: 0.5,
            x: -25,
            y: -30,
            rotate: -25,
            onComplete: () => {
                gsap.to(el, {
                    duration: 0.1,
                    scale: 0.85,
                    onComplete: () => {
                        gsap.to(el, {
                            duration: 0.1,
                            scale: 1,
                            onComplete: () => {
                                gsap.to(el, {
                                    duration: 0.1,
                                    scale: 0.85,
                                    onComplete: () => {
                                        gsap.to(el, {
                                            duration: 0.1,
                                            scale: 1,
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    } else {
        gsap.to(el, {
            duration: 0.5,
            x: 50,
            y: 50,
            rotate: 0
        })
    }
}

let lastY = null;

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            lastY = entry.boundingClientRect.top;
            gsap.to(entry.target, {
                duration: 0.5,
                x: 0,
                opacity: 1,
                onComplete: () => {
                    const childEl = entry.target.querySelectorAll('.fade-in-children')
                    if(childEl.length){
                        childEl.forEach((child) => {
                            gsap.to(child, {
                                delay: 0.3,
                                duration: 0.65,
                                x: 0,
                                opacity: 1,
                            })
                        })
                    }
                }
            })

            return;
        }

        const currentY = entry.boundingClientRect.top;

        if (lastY !== null && currentY > lastY) {
            gsap.to(entry.target, {
                duration: 0.5,
                x: -100,
                opacity: 0,
                onComplete: () => {
                    const childEl = entry.target.querySelectorAll('.fade-in-children')
                    if(childEl.length > 0){
                        childEl.forEach((child) => {
                            gsap.to(child, {
                                duration: 0.5,
                                x: -100,
                                opacity: 0,
                            })
                        })
                    }
                }
            })
        }

    });
}, options);
const elements = document.querySelectorAll('.fade-in')
elements.forEach((element) => {
    observer.observe(element)
})

gsap.registerPlugin(ScrollTrigger);

gsap.to('header', {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    'box-shadow': '0px 4px 4px rgba(0, 0, 0, 0.244)',
    ease: 'none',
    scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'top -620',
        scrub: true
    }
})

gsap.to('header a', {
    color: '#000000ff',
    ease: 'none',
    scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'top -620',
        scrub: true
    }
})