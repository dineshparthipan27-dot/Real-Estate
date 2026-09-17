 

const btnLogin = document.getElementById('btnShowLogin');
const btnSignup = document.getElementById('btnShowSignup');
const pillSlider = document.getElementById('pillSlider');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

 
btnLogin.addEventListener('click', () => {
    pillSlider.style.transform = 'translateX(0)';
    btnLogin.classList.add('active');
    btnSignup.classList.remove('active');
    loginForm.classList.add('active-form');
    signupForm.classList.remove('active-form');
});

btnSignup.addEventListener('click', () => {
    pillSlider.style.transform = 'translateX(100%)';
    btnSignup.classList.add('active');
    btnLogin.classList.remove('active');
    signupForm.classList.add('active-form');
    loginForm.classList.remove('active-form');
});

 
document.querySelectorAll(".toggle-pwd").forEach(icon => {
    icon.addEventListener("click", () => {
        const input = icon.closest('.input-group').querySelector('input');
        if (input.type === "password") {
            input.type = "text";
            icon.classList.replace("fa-eye", "fa-eye-slash");
        } else {
            input.type = "password";
            icon.classList.replace("fa-eye-slash", "fa-eye");
        }
    });
});

 
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showError(inputId, errorId, msg) {
    const input = document.getElementById(inputId);
    const err = document.getElementById(errorId);
    input.classList.add("error-border", "shake");
    err.innerText = msg;
    err.style.display = "block";
    setTimeout(() => input.classList.remove("shake"), 400);
}

function clearError(inputId, errorId) {
    document.getElementById(inputId).classList.remove("error-border");
    document.getElementById(errorId).style.display = "none";
}

function loading(btn, text) {
    btn.disabled = true;
    btn.dataset.original = btn.innerHTML;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${text}`;
}

 
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    const role = document.getElementById("loginRole").value;
    const email = document.getElementById("loginEmail").value.trim();
    const pwd = document.getElementById("loginPassword").value;

    if (!role) { 
        isValid = false; 
        document.getElementById("loginRole").classList.add("error-border", "shake");
        setTimeout(() => document.getElementById("loginRole").classList.remove("shake"), 400);
    } else {
        document.getElementById("loginRole").classList.remove("error-border");
    }

    if (!emailRegex.test(email)) {
        showError("loginEmail", "loginEmailError", "Valid email required");
        isValid = false;
    } else { clearError("loginEmail", "loginEmailError"); }

    if (pwd.length < 6) {
        showError("loginPassword", "loginPasswordError", "Min 6 characters required");
        isValid = false;
    } else { clearError("loginPassword", "loginPasswordError"); }

    if (!isValid) return;

    const btn = loginForm.querySelector("button[type='submit']");
    loading(btn, "Authenticating...");

 
    localStorage.setItem("DreamHomesUserMail", email);
    localStorage.setItem("DreamHomesUserRole", role);

 
    setTimeout(() => {
        if (role === "admin") {
            window.location.href = "user.html";
        } else {
            window.location.href = "admin.html"; // Routes to the User Portal we created
        }
    }, 1500);
});

 
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const pwd = document.getElementById("signupPassword").value;
    const confirm = document.getElementById("signupConfirm").value;

    if (name.length < 3) {
        showError("signupName", "signupNameError", "Valid name required");
        isValid = false;
    } else { clearError("signupName", "signupNameError"); }

    if (!emailRegex.test(email)) {
        showError("signupEmail", "signupEmailError", "Valid email required");
        isValid = false;
    } else { clearError("signupEmail", "signupEmailError"); }

    if (pwd.length < 6) {
        showError("signupPassword", "signupPasswordError", "Min 6 chars required");
        isValid = false;
    } else { clearError("signupPassword", "signupPasswordError"); }

    if (pwd !== confirm || confirm === "") {
        showError("signupConfirm", "signupConfirmError", "Passwords don't match");
        isValid = false;
    } else { clearError("signupConfirm", "signupConfirmError"); }

    if (!isValid) return;

    const btn = signupForm.querySelector("button[type='submit']");
    loading(btn, "Creating Profile...");

    setTimeout(() => {
        btn.innerHTML = btn.dataset.original;
        btn.disabled = false;
        signupForm.reset();
        btnLogin.click(); // Switch back to login tab automatically
    }, 1500);
});

 
document.querySelectorAll('.input-group input, .input-group select').forEach(input => {
    input.addEventListener('input', function() {
        this.classList.remove('error-border');
        if(this.nextElementSibling && this.nextElementSibling.nextElementSibling && this.nextElementSibling.nextElementSibling.classList.contains('error-msg')){
            this.nextElementSibling.nextElementSibling.style.display = 'none';
        }
    });
});