document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       AOS INIT
    ========================== */

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    /* ==========================
       TYPED TEXT
    ========================== */

    if (
        typeof Typed !== "undefined" &&
        document.querySelector("#typed-text")
    ) {

        new Typed("#typed-text", {
            strings: [
                "Photographer",
                "Videographer",
                "Video Editor",
                "Graphic Designer",
                "Motion Graphics Artist",
                "AI Content Creator"
            ],
            typeSpeed: 60,
            backSpeed: 40,
            loop: true
        });

    }

    /* ==========================
       COUNTER
    ========================== */

    document.querySelectorAll(".counter").forEach(counter => {

        const target =
        parseInt(counter.dataset.target) || 0;

        let current = 0;

        const updateCounter = () => {

            current += target / 100;

            if (current < target) {

                counter.innerText =
                Math.floor(current);

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText = target;

            }

        };

        updateCounter();

    });

    /* ==========================
       PORTFOLIO MODAL
    ========================== */

    const portfolioData = {

        photo: [
            {
                title: "Wedding Shoot",
                image: "images/photo1.png",
                description: "Luxury wedding photography"
            },
            {
                title: "Travel Photography",
                image: "images/photo2.png",
                description: "Landscape photography collection"
            }
        ],

        video: [
            {
                title: "Brand Campaign",
                image: "images/video1.mp4",
                description: "Commercial advertisement"
            },
            {
                title: "Corporate Video",
                image: "images/video2.jpg",
                description: "Business promotion"
            }
        ],

        poster: [
            {
                title: "Event Poster",
                image: "images/poster1.jpg",
                description: "Marketing campaign poster"
            }
        ],

        motion: [
            {
                title: "Logo Animation",
                image: "images/motion1.jpg",
                description: "Motion graphics intro"
            }
        ],

        branding: [
            {
                title: "Tech Startup Branding",
                image: "images/branding1.jpg",
                description: "Complete visual identity"
            }
        ]

    };

    const categoryButtons =
    document.querySelectorAll(
        ".portfolio-filter button"
    );

    const modal =
    document.getElementById(
        "portfolioCategoryModal"
    );

    const categoryTitle =
    document.getElementById(
        "categoryTitle"
    );

    const categoryWorks =
    document.getElementById(
        "categoryWorks"
    );

    const closeModal =
    document.getElementById(
        "closeCategoryModal"
    );

    if (
        modal &&
        categoryTitle &&
        categoryWorks
    ) {

        categoryButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const category =
                    button.dataset.filter;

                    if (
                        category === "all" ||
                        !portfolioData[category]
                    ) return;

                    categoryTitle.textContent =
                    button.textContent;

                    categoryWorks.innerHTML = "";

                    portfolioData[category]
                    .forEach(work => {

                        categoryWorks.innerHTML += `
                            <div class="work-card">
                                <img src="${work.image}" alt="${work.title}">
                                <h4>${work.title}</h4>
                                <p>${work.description}</p>
                            </div>
                        `;

                    });

                    modal.classList.add("active");

                }
            );

        });

        if (closeModal) {

            closeModal.addEventListener(
                "click",
                () => {

                    modal.classList.remove(
                        "active"
                    );

                }
            );

        }

        modal.addEventListener(
            "click",
            e => {

                if (e.target === modal) {

                    modal.classList.remove(
                        "active"
                    );

                }

            }
        );

    }

    /* ==========================
       BACK TO TOP
    ========================== */

    const backToTop =
    document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 400) {

                    backToTop.classList.add(
                        "active"
                    );

                } else {

                    backToTop.classList.remove(
                        "active"
                    );

                }

            }
        );

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }

    /* ==========================
       THEME TOGGLE
    ========================== */

    const themeToggle =
    document.getElementById(
        "themeToggle"
    );

    if (themeToggle) {

        const icon =
        themeToggle.querySelector("i");

        const savedTheme =
        localStorage.getItem("theme");

        if (savedTheme === "dark") {

            document.body.classList.add(
                "dark"
            );

            if (icon) {

                icon.classList.remove(
                    "fa-moon"
                );

                icon.classList.add(
                    "fa-sun"
                );

            }

        }

        themeToggle.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "dark"
                );

                const isDark =
                document.body.classList.contains(
                    "dark"
                );

                localStorage.setItem(
                    "theme",
                    isDark
                        ? "dark"
                        : "light"
                );

                if (icon) {

                    if (isDark) {

                        icon.classList.remove(
                            "fa-moon"
                        );

                        icon.classList.add(
                            "fa-sun"
                        );

                    } else {

                        icon.classList.remove(
                            "fa-sun"
                        );

                        icon.classList.add(
                            "fa-moon"
                        );

                    }

                }

            }
        );

    }

});