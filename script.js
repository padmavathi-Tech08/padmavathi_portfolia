/* CURRENT YEAR */
const currentYear = document.getElementById("currentYear");
if (currentYear) currentYear.textContent = new Date().getFullYear();

/* MOBILE MENU */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        menuToggle.textContent = navLinks.classList.contains("open") ? "✕" : "☰";
    });

    const navItems = navLinks.querySelectorAll("a");
    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.textContent = "☰";
        });
    });
}

/* SCROLL REVEAL */
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);
revealElements.forEach((element) => revealObserver.observe(element));

/* ACTIVE NAVIGATION */
const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-link");

function updateActiveNavigation() {
    let currentSection = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute("id");
        }
    });

    navigationLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
}
window.addEventListener("scroll", updateActiveNavigation);
updateActiveNavigation();

/* CLOSE MOBILE MENU WHEN CLICKING OUTSIDE */
document.addEventListener("click", (event) => {
    if (!navLinks || !menuToggle) return;
    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedMenuButton = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        menuToggle.textContent = "☰";
    }
});

/* IMAGE ERROR CHECK */
const profileImage = document.querySelector(".profile-image");
if (profileImage) {
    profileImage.addEventListener("error", () => {
        console.error("Profile image not found. Check: assets/images/profile_photo.jpg.jpeg");
    });
}
