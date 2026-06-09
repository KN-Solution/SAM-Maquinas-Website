import Swiper from 'swiper';
import { Autoplay, FreeMode, EffectFade, Pagination, Navigation, Manipulation } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.refresh();

export function initHome() {

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
        modules: [Autoplay, EffectFade, Pagination, Navigation],
        effect: "fade",
        slidesPerView: 1,
        autoplay: {
            delay: 5500
        },
        loop: true,
        simulateTouch: false,
        on: {
            slideChangeTransitionStart: function (swiper: any) {
                const activeSlide = swiper.slides[swiper.activeIndex];
                const gifs = activeSlide.querySelectorAll('.gif');

                gifs.forEach((gif: { dataset: { animated: any; }; src: string; offsetHeight: any; }) => {
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
        modules: [Autoplay, EffectFade, Pagination, Navigation],
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
        modules: [Autoplay, FreeMode, Manipulation],
        freeMode: false,
        loop: true,
        speed: 5000,
        spaceBetween: 30,
        simulateTouch: false,
        grabCursor: false,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        breakpoints: {
            1200: {
                slidesPerView: 5,
                spaceBetween: 30,
                freeMode: false,
                simulateTouch: false,
                grabCursor: false
            },
            860: {
                slidesPerView: 4,
                spaceBetween: 20,
                freeMode: false,
                simulateTouch: false,
                grabCursor: false
            },
            600: {
                slidesPerView: 3,
                spaceBetween: 15,
                freeMode: false,
                simulateTouch: false,
                grabCursor: false
            },
            450: {
                slidesPerView: 2,
                spaceBetween: 10,
                freeMode: false,
                simulateTouch: false,
                grabCursor: false
            }
        }
    })

    function changeContent(contentID: string | number, menu: HTMLElement) {
        const contentList = document.querySelectorAll<HTMLElement>('.content');
        const idx = Number(contentID);
        if (Number.isNaN(idx) || idx < 0 || idx >= contentList.length) return;
        const menuList = document.querySelectorAll<HTMLElement>('.menu-item');
        menuList.forEach((menuItem) => {
            menuItem.classList.remove('active')
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
                gsap.to(contentList[idx], {
                    display: 'block',
                    duration: 0.5,
                    opacity: 1,
                    onComplete: () => {
                        contentList[idx].classList.add('active')
                    }
                })
            }
        })
    }

    function animCursor(el: gsap.TweenTarget, enter: any) {
        if (enter) {
            gsap.to(el, {
                duration: 0.5,
                x: -25,
                y: -35,
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
                x: 30,
                y: 100,
                rotate: 0
            })
        }
    }

    let lastY: number | null = null;

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
                        if (childEl.length) {
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
                        if (childEl.length > 0) {
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

    function videoClick(thumb: string, overlay: string, modal: string, url: string) {

        const thumbEl = document.getElementById(thumb);
        const overlayEl = document.getElementById(overlay);
        const modalEl = document.getElementById(modal);

        if (!thumbEl || !overlayEl || !modalEl) return;

        overlayEl.style.display = 'flex';

        const rect = thumbEl.getBoundingClientRect();

        gsap.set(modalEl, {
            position: 'absolute',
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
        })

        const tl = gsap.timeline();

        tl.to(overlayEl, {
            background: "rgba(0,0,0,0.8)",
            duration: 0.3
        })

        tl.to(modalEl, {
            top: "50%",
            left: "50%",
            xPercent: -50,
            yPercent: -50,
            width: "clamp(250px, 70vw, 420px)",
            height: 'calc(clamp(250px, 70vw, 420px) * 16 / 9)',
            'aspect-ratio': '16 / 9',
            duration: 0.5,
            ease: "power3.out"
        });

        tl.call(() => {
            const video = modalEl.querySelector('video') as HTMLVideoElement | null;
            if (!video) return;

            if (!video.src) {
                video.src = url
                video.load();
            }

            video.currentTime = 0;

            video.play();
        })

    }

    function closeVideo(thumb: string, overlay: string, modal: string) {

        const thumbEl = document.getElementById(thumb);
        const overlayEl = document.getElementById(overlay);
        const modalEl = document.getElementById(modal);

        if (!thumbEl || !overlayEl || !modalEl) return;

        const rect = thumbEl.getBoundingClientRect();

        const video = modalEl.querySelector('video');
        if (video) video.pause();

        const tl = gsap.timeline({
            onComplete: () => {
                overlayEl.style.display = 'none';

                gsap.set(modalEl, { clearProps: 'all' });
            }
        });

        tl.to(overlayEl, {
            background: "rgba(0,0,0,0)",
            duration: 0.3
        })

        tl.to(modalEl, {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            xPercent: 0,
            yPercent: 0,
            duration: 0.3
        });

        tl.to(modalEl, {
            opacity: 0,
            duration: 0.1
        })

        tl.call(() => {
            overlayEl.style.display = 'none';
        })

    }

    window.addEventListener('load', () => {

        const elements = document.querySelectorAll('.fade-in');

        elements.forEach((element) => {
            observer.observe(element);
        });

    });

    (window as any).videoClick = videoClick;
    (window as any).closeVideo = closeVideo;
    (window as any).openMenu = openMenu;
    (window as any).closeMenu = closeMenu;
    (window as any).changeContent = changeContent;
    (window as any).animCursor = animCursor;

}