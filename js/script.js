async function loadJson(folder, filename) {
    try {
        const response = await fetch(folder+filename+'.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error loading json:", error);
        return null;
    }
}

async function loadTranslations(lang) {
    return loadJson("translations/", lang);
}

async function changeLanguage(lang) {
    const translations = await loadTranslations(lang);
    if (translations) {
        let contentHTML = "";
        Object.keys(translations).forEach(id => {
            const translation = translations[id];

            if (typeof translation === "object") {
                contentHTML += `<p id="${id}">`;
                contentHTML += `<strong>${translation.title}:</strong> ${translation.message}`;
                contentHTML += `</p>`;
            } else {                   
                document.getElementById(id).innerHTML = translation;
            }
        });
        document.getElementById("content-info").innerHTML = contentHTML;
    }
}

async function initContactInfo() {
    let contacts = "";
    const mobiles = await loadJson("contacts/", "mobiles");
    mobiles.mobiles.forEach((phoneNumber) => {
        contacts += "📞 " + phoneNumber + "<br>";
    });

    const emails = await loadJson("contacts/", "emails");
    emails.emails.forEach((emailAddress) => {
        contacts += "✉️ " + emailAddress + "<br>";
    });

    document.getElementById("contact-info").innerHTML = contacts;
}

function initLanguageSelector() {
    let buttons = "";
    const languages = config.languages;

    if(Object.keys(languages).length <= 1) {
        return;
    }

    for (const key in languages) {
        buttons += "<button onclick=\"changeLanguage('" + key + "')\">" + languages[key].emoji + " " + languages[key].name + "</button>";
    }    

    document.getElementById("language-selector").innerHTML = buttons;
}

function tryLoadImage(i) {
        
    if(i > config.image_count) {
        return;
    }    

    const mainImage = document.querySelector(".main-image");
    const thumbnailsContainer = document.querySelector(".thumbnails");

    const img = new Image();
    img.src = `images/${i}.jpg`;
    img.onload = function () {
        const thumb = document.createElement("img");
        thumb.src = `images/thumb-${i}.jpg`;
        thumb.setAttribute("data-fullimage", img.src);
        thumb.alt = `Image ${i}`;

        if (i === 1) {
            mainImage.src = img.src;
            mainImage.alt = thumb.alt;
        }

        thumb.addEventListener("click", () => {
            mainImage.src = img.src;
            mainImage.alt = thumb.alt;
        });

        thumbnailsContainer.appendChild(thumb);

        tryLoadImage(i + 1);
    };
}

function changeImage(newIndex, direction) {
    if (isAnimating || newIndex === currentIndex) return;
    isAnimating = true;

    let hideClass = direction === "right" ? "swipe-left" : "swipe-right";
    let showClass = direction === "right" ? "show-right" : "show-left";

    const newImg = new Image();
    newImg.src = images[newIndex];

    newImg.onload = function () {
        mainImage.classList.add(hideClass);

        setTimeout(() => {
            mainImage.src = newImg.src;
            mainImage.classList.remove(hideClass);
            mainImage.classList.add(showClass);

            setTimeout(() => {
                mainImage.classList.remove(showClass);
                isAnimating = false;
                currentIndex = newIndex;
            }, 300);
        }, 300);
    };
}

document.addEventListener("DOMContentLoaded", async function() {  
    changeLanguage(config.default_language);
    initContactInfo();
    tryLoadImage(config.minimum_image);
    initLanguageSelector();

    document.querySelectorAll('.thumbnails img').forEach(img => {
        img.addEventListener('click', function() {
            const fullImagePath = this.getAttribute('data-fullimage');
            document.querySelector('.main-image').src = fullImagePath;
        });
    });

    const mainImage = document.querySelector('.main-image');
    const thumbnails = document.querySelectorAll('.thumbnails img');

    let currentIndex = 0;
    let startX = 0;
    let isAnimating = false;

    const images = Array.from(thumbnails).map(img => img.getAttribute('data-fullimage'));

    thumbnails.forEach((img, index) => {
        img.addEventListener('click', function() {
            if (!isAnimating && index !== currentIndex) {
                changeImage(index, index > currentIndex ? "right" : "left");
            }
        });
    });

    mainImage.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    mainImage.addEventListener("touchend", (e) => {
        let endX = e.changedTouches[0].clientX;
        let diff = startX - endX;

        if (diff > 50) {
            changeImage((currentIndex + 1) % images.length, "right");
        } else if (diff < -50) {
            changeImage((currentIndex - 1 + images.length) % images.length, "left");
        }
    });
});