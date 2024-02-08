console.log("script");
var nameSignUp = document.getElementById("nameSignUp");
var emailSignUp = document.getElementById("emailSignUp");
var passwordSignUp = document.getElementById("passwordSignUp");
var signupBtn = document.getElementById("signup");
var emailSignin = document.getElementById("emailSignin");
var passwordSignin = document.getElementById("passwordSignin");
var signinBtn = document.getElementById("signin");
var nameRegex = /^[a-z ,.'-]+$/i;
var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
var regDataAll = [];
var localData = JSON.parse(localStorage.getItem("users"));
if (localData != null) {
  regDataAll = localData;
}

if (window.location.pathname === "/signup.html") {
  nameSignUp.addEventListener("keyup", () => {
    if (nameRegex.test(nameSignUp.value)) {
      nameSignUp.classList.remove("is-invalid");
      nameSignUp.classList.add("is-valid");
    } else {
      nameSignUp.classList.remove("is-valid");
      nameSignUp.classList.add("is-invalid");
    }
  });

  emailSignUp.addEventListener("keyup", () => {
    if (emailRegex.test(emailSignUp.value)) {
      emailSignUp.classList.remove("is-invalid");
      emailSignUp.classList.add("is-valid");
    } else {
      emailSignUp.classList.remove("is-valid");
      emailSignUp.classList.add("is-invalid");
    }
  });

  passwordSignUp.addEventListener("keyup", () => {
    if (passwordRegex.test(passwordSignUp.value)) {
      passwordSignUp.classList.remove("is-invalid");
      passwordSignUp.classList.add("is-valid");
    } else {
      passwordSignUp.classList.remove("is-valid");
      passwordSignUp.classList.add("is-invalid");
    }
  });

  signupBtn.addEventListener("click", () => {
    if (
      nameSignUp.classList.contains("is-valid") &&
      emailSignUp.classList.contains("is-valid") &&
      passwordSignUp.classList.contains("is-valid") &&
      regDataAll.some((user) => user.email == emailSignUp.value) == false
    ) {
      var regData = {
        name: nameSignUp.value,
        email: emailSignUp.value,
        password: passwordSignUp.value,
      };
      regDataAll.push(regData);
      localStorage.setItem("users", JSON.stringify(regDataAll));
      clearInputs();
      window.location.href = "../index.html";
    } else if (regDataAll.some((user) => user.email == emailSignUp.value)) {
      Swal.fire({
        title: "Email is already registered!",
        text: "You have to type another email!",
        icon: "warning",
      });
    } else if (nameSignUp.classList.contains("is-invalid")) {
      Swal.fire({
        title: "Name isn't correct",
        text: "You have to type a correct name!",
        icon: "warning",
      });
    } else if (emailSignUp.classList.contains("is-invalid")) {
      Swal.fire({
        title: "Email isn't correct",
        text: "You have to type a correct email!",
        icon: "warning",
      });
    } else if (passwordSignUp.classList.contains("is-invalid")) {
      Swal.fire({
        title: "Password isn't correct",
        text: "You have to type a password with at least 1 uppercase and 1 number",
        icon: "warning",
      });
    }
  });

  function clearInputs() {
    nameSignUp.value = "";
    emailSignUp.value = "";
    passwordSignUp.value = "";
    nameSignUp.classList.remove("is-valid");
    emailSignUp.classList.remove("is-valid");
    passwordSignUp.classList.remove("is-valid");
  }
}

function loginCheck() {
  for (i = 0; i < regDataAll.length; i++) {
    if (
      regDataAll[i].email == emailSignin.value &&
      regDataAll[i].password == passwordSignin.value
    ) {
      var userName = regDataAll[i].name;
      Swal.fire({
        title: "Login Success",
        text: "You'll be redirected to homepage.'",
        icon: "success",
      });
      redirectToHome(userName);
    }
  }
}

function redirectToHome(username) {
  sessionStorage.setItem("userLoggedIn", username);
  window.location.href = "../home.html";
}

if (
  window.location.pathname == "/index.html" ||
  window.location.pathname == "/"
) {
  signinBtn.addEventListener("click", () => {
    loginCheck();
  });
}

if (window.location.pathname == "/home.html") {
  if (sessionStorage.getItem("userLoggedIn") == null) {
    document.getElementById("notLoggedIn").style.display = "block";
    var logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", () => {
      sessionStorage.removeItem("userLoggedIn");
      window.location.href = "../index.html";
    });
  } else {
    document.getElementById("loggedIn").style.display = "block";
    document.getElementById("userName").innerHTML =
      sessionStorage.getItem("userLoggedIn");
  }
}
