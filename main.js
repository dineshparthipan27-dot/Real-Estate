document.addEventListener("DOMContentLoaded", function () {
    
 
    const navbar = document.getElementById('mainNavbar');
    
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled'); // Adds shadow and shrinks padding
        } else {
            navbar.classList.remove('scrolled'); // Reverts to transparent/flat look
        }
    });

 
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const body = document.body;

    hamburgerBtn.addEventListener('click', function () {
 
        navMenu.classList.toggle('active-menu');
        
 
        if (navMenu.classList.contains('active-menu')) {
            hamburgerBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            body.classList.add('no-scroll'); // STOPS BACKGROUND SCROLLING
        } else {
            hamburgerBtn.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
            body.classList.remove('no-scroll'); // RESTORES SCROLLING
        }
    });

 
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active-menu');
            hamburgerBtn.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
            body.classList.remove('no-scroll');
        });
    });
});









 
const newsForm = document.getElementById('newsletterForm');
const newsEmail = document.getElementById('newsletterEmail');
const newsMsg = document.getElementById('newsMessage');

newsForm.addEventListener('submit', function(event) {
 
    event.preventDefault(); 
    
    const emailValue = newsEmail.value.trim();
 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

 
    if (emailValue === "") {
        showNewsMessage(" Please enter your email!", "error");
        triggerNewsShake();
    } 
 
    else if (!emailRegex.test(emailValue)) {
        showNewsMessage("Valid-ana email id type !", "error");
        triggerNewsShake();
    } 
 
    else {
        showNewsMessage("Super! Subscribed successfully.", "success");
        newsForm.classList.remove('news-error-shake');
        newsEmail.value = ""; // Clear the input field
        
 
        setTimeout(() => {
            newsMsg.style.display = 'none';
            window.location.href = '404.html'
        }, 400);
    }
});

 
function showNewsMessage(msg, type) {
    newsMsg.textContent = msg;
    newsMsg.style.display = 'block';
    
    if (type === "error") {
        newsMsg.className = "news-message msg-error";
    } else {
        newsMsg.className = "news-message msg-success";
    }
}

 
function triggerNewsShake() {
    newsForm.classList.add('news-error-shake');
 
    setTimeout(() => {
        newsForm.classList.remove('news-error-shake');
    }, 500);
}