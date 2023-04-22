const tabs = document.querySelector(".expertise-nav");
const tabButton = document.querySelectorAll(".expertise-link");
const contents = document.querySelectorAll(".expertise-tab");

tabs.onclick = (e) => {
    e.preventDefault();
    const id = e.target.dataset.id;
    if (id) {
        tabButton.forEach((btn) => {
            btn.classList.remove("active");
        });
        e.target.classList.add("active");
        contents.forEach((content) => {
            content.classList.remove("active");
        });
        const element = document.getElementById(id);
        element.classList.add("active");
    }
};

var swiper = new Swiper(".skills-swiper", {
    slidesPerView: 2,
    spaceBetween: 35,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
        },

        640: {
            slidePerView: 3,
            spaceBetween: 35,
        },
    },
});

const filterContainer = document.querySelector(".portfolio-filter"),
    galleryItems = document.querySelectorAll(".portfolio-item");

filterContainer.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("portfolio-nav-link")) {
        filterContainer.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        const filterValue = e.target.getAttribute("data-id");
        galleryItems.forEach((item) => {
            if (item.classList.contains(filterValue) || filterValue === "all") {
                item.classList.remove("hide");
                item.classList.add("show");
            } else {
                item.classList.remove("show");
                item.classList.add("hide");
            }
        });
    }
});

function stickyElement(e) {
    var header = document.querySelector("#slide-carousel");
    var headerHeight = getComputedStyle(header).height.split("px")[0];
    header = headerHeight / 2;
    var navbar = document.querySelector(".header-fixed");
    var scrollValue = window.scrollY;
    if (scrollValue > headerHeight) {
        navbar.classList.add("header-sticky");
    } else {
        navbar.classList.remove("header-sticky");
    }
}

window.addEventListener("scroll", stickyElement);

// theme switch
function isLight() {
    return localStorage.getItem("light-theme");
}

function toggleRootClass() {
    document.querySelector(":root").classList.toggle("light");
}

function toggleLocalStorageItem() {
    if (isLight()) {
        localStorage.removeItem("light-theme");
    } else {
        localStorage.setItem("light-theme", "set");
    }
}

if (isLight()) {
    toggleRootClass();
}

document.querySelector(".theme-toggle").addEventListener("click", () => {
    toggleLocalStorageItem();
    toggleRootClass();
});

const hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", function () {
    document.querySelector(".portfolio-navbar").classList.toggle("show");
});

const words = ["Anna", "a Web Developer", "a Designer", "a Creator."];

let cursor = gsap.to(".cursor", {
    opacity: 0,
    ease: "power2.inOut",
    repeat: -1,
});
let masterTl = gsap.timeline({ repeat: -1 }).pause();
let boxTl = gsap.timeline();

boxTl
    .to(".box", { duration: 1, width: "17vw", delay: 0.5, ease: "power4.inOut" })
    .from(".hi", { duration: 1, y: "7vw", ease: "power3.out" })
    .to(".box", {
        duration: 1,
        height: "7vw",
        ease: "elastic.out",
        onComplete: () => masterTl.play(),
    })
    .to(".box", {
        duration: 2,
        autoAlpha: 0.7,
        yoyo: true,
        repeat: -1,
        ease: "rough({ template: none.out, strength:  1, points: 20, taper: 'none', randomize: true, clamp: false})",
    });
words.forEach((word) => {
    let tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 });
    tl.to(".text", { duration: 1, text: word });
    masterTl.add(tl);
});
