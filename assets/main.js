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