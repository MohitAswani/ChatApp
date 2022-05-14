const wrapper = document.querySelector(".wrapper");
const fileName = document.querySelector(".file-name");
const defaultBtn = document.querySelector("#default-btn");
const customBtn = document.querySelector("#custom-btn");
const cancelBtn = document.querySelector("#cancel-btn i");
const img = document.querySelector("img");
let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;
function defaultBtnActive() {
    defaultBtn.click();
}
defaultBtn.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            const result = reader.result;
            img.src = result;
            img.style.visibility = "visible";
            wrapper.classList.add("active");
        }
        cancelBtn.addEventListener("click", function () {
            img.src = "";
            wrapper.classList.remove("active");
        })
        reader.readAsDataURL(file);
    }
    if (this.value) {
        let valueStore = this.value.match(regExp);
        fileName.textContent = valueStore;
    }
});

function submitData(event) {
    event.preventDefault();
    const form = document.getElementById("register-form");
    const formData = new FormData(form);
    const warning=document.querySelector(".warning p");

    if (formData.get('username') == "" || formData.get('password') == "") {
        warning.innerText="Please enter not empty details"
    } else {
        if(parseInt(formData.get('username').length)<6){
            warning.innerText="Please enter a username greater than 6 letters."
        }
        else if(parseInt(formData.get('password').length)<6){
            warning.innerText="Please enter a password greater than 6 letters."
        }
        else if(formData.get('password')!==formData.get('confirm_password')){
            warning.innerText="Password and confirm password must be matching."
        }
    }
}

function myFunction() {
    let x = document.getElementById("password");
    let y = document.getElementById("confirm_password");
    if (x.type === "password") {
      x.type = "text";
      y.type = "text";
    } else {
      x.type = "password";
      y.type= "password";
    }
  }