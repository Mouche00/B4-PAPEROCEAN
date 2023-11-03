
        const contactForm = document.getElementById("contactForm");

        if (contactForm) {
            contactForm.addEventListener("submit", (e) => {
                e.preventDefault();

                const firstname = document.getElementById("firstname").value;
                const lastname = document.getElementById("lastname").value;
                const email = document.getElementById("email").value;

                validateName(firstname, "msgErrorFirstName");
                validateName(lastname, "msgErrorLastName");
                validateEmail(email, "msgErrorEmail");

                if (!validateName(firstname, "msgErrorFirstName") || !validateName(lastname, "msgErrorLastName") || !validateEmail(email, "msgErrorEmail")) {
                    return;
                }

               
                alert("Form submitted successfully!");
            });
        }

        function validateName(name, errorElementId) {
            const msgError = document.getElementById(errorElementId);
            if (name === "") {
                msgError.textContent = "This field is required.";
                return false;
            } else if (!/^[a-zA-Z]+$/.test(name)) {
                msgError.textContent = "Enter a valid name, only letters are allowed.";
                return false;
            } else {
                msgError.textContent = "";
                return true;
            }
        }

        function validateEmail(email, errorElementId) {
            const msgError = document.getElementById(errorElementId);
            const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
            if (email === "") {
                msgError.textContent = "Email is required.";
                return false;
            } else if (!emailPattern.test(email)) {
                msgError.textContent = "Enter a valid email address.";
                return false;
            } else {
                msgError.textContent = "";
                return true;
            }
        }
    