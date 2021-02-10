const title = document.querySelector("h2");
const container = document.querySelector(".container");
const form = document.querySelector("form");
const button = document.querySelector("button");
const greeting = document.querySelector(".greeting");

function displayGreeting(nickname) {
    title.classList.add("hide");
    container.classList.add("hide");
    button.classList.add("hide");

    greeting.innerHTML = `Welcome 🎈<br/> ${nickname}`;
    greeting.classList.add("show");
}

function signUp(nickname, email, password) {
    const user = {
        nickname,
        email,
        password,
    };

    localStorage.setItem("user", JSON.stringify(user));
    displayGreeting(nickname);
}

function checkPublication(check) {
    const warning = document.querySelector(".warning-publication");

    if (!check) {
        warning.innerText = "⚠️ Checked Personal information collection agreement.";
        warning.classList.add("show");
        return false;
    } else {
        return true;
    }
}

function checkPassword(password, confirm) {
    const warning = document.querySelector(".warning-password");
    const confirmWarning = document.querySelector(".warning-password2");

    if (!password) {
        warning.innerText = "⚠️ Password is required.";
        warning.classList.add("show");
    }

    if (!confirm) {
        confirmWarning.innerText = "⚠️ Must Confirm Password.";
        confirmWarning.classList.add("show");
    }

    if (password !== confirm) {
        confirmWarning.innerText = "⚠️ Passwords do not match.";
        confirmWarning.classList.add("show");
    } else {
        return true;
    }

    return false;
}

function checkEmail(email) {
    const warning = document.querySelector(".warning-email");

    if (!email) {
        warning.innerText = "⚠️ Email is required.";
        warning.classList.add("show");
    } else {
        return true;
    }

    return false;
}

function checkNickname(nickname) {
    const warning = document.querySelector(".warning-nickname");
    const reg = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;

    if (!nickname) {
        warning.innerText = "⚠️ Nickname is required.";
        warning.classList.add("show");
    } else if (parseInt(nickname.charAt(0)) >= 0 && parseInt(nickname.charAt(0)) <= 9) {
        warning.innerText = "⚠️ First letter can not be a number.";
        warning.classList.add("show");
    } else if (nickname.length < 5) {
        warning.innerText = "⚠️ Nickname must be at least 5 characters.";
        warning.classList.add("show");
    } else if (nickname.match(reg)) {
        warning.innerText = "⚠️ Special characters can not be used in the nickname.";
        warning.classList.add("show");
    } else {
        return true;
    }

    return false;
}

function validate() {
    const nickname = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const confirm = document.querySelector("#password2").value;
    const check = document.querySelector("#publication").checked;

    const valNickname = checkNickname(nickname);
    const valEmail = checkEmail(email);
    const valPassword = checkPassword(password, confirm);
    const valPublication = checkPublication(check);

    if (valNickname && valEmail && valPassword && valPublication) {
        signUp(nickname, email, password);
    }
}

function main() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        displayGreeting(user.nickname);
    }
}

main();

button.addEventListener("click", validate);
