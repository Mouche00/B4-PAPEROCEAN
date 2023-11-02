const form = document.getElementById("form");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const fname = document.getElementById("fname").value;
        const email = document.getElementById("email").value;
        const zippostal = document.getElementById("zippostal").value;
        const cardnumber = document.getElementById("cardnumber").value;
        const threedigits =document.getElementById("threedigits").value;
        const statecountry =document.getElementById("statecountry").value;
        const paypal = document.getElementById("paypal").value;

        function verefierName(fname){
            const nameError = document.getElementById("nameError");
    
            if( fname === ""){
                nameError.textContent = "Enter a full name please !";
                return false;
                
            }
            else if(!(/^[a-z ]+$/i.test(fname)) ){
                nameError.textContent = "Enter a valid name please !";
                return false;
            }
            else{
                nameError.textContent = "";
                return true;
            }
        }
        function verefierEmail(email){
            const emailError = document.getElementById("emailError");
            if(email ===""){
                emailError.textContent = "Enter a email address please !";
                return false;
            }
            if(!/^\S+@\S+\.\S+$/.test(email)){
                emailError.textContent = "Enter a valid email address please !";
                return false;
            }
            else {
                emailError.textContent = "";
                return true;
            }
        }
        function verefierZippostal (zippostal) {
            const zippostalError = document.getElementById("zippostalError");
            if(zippostal === ""){
                zippostalError.textContent ="Enter a zip/Postal !";
                return false;
            }
            if (!/^\d{5,10}$/.test(zippostal)){
                zippostalError.textContent= "Enter A valid Zip/Postal min 5 digits !"
                return false;
            }
            else {
                zippostalError.textContent = "";
                return true;       
            }
        }

        function verefierCardnumber (cardnumber){
            const cardnumberError = document.getElementById("cardnumberError");
            if(cardnumber === ""){
                cardnumberError.textContent ="Enter a Card number Please !"
                return false;
            }
            if(!/^\d{16}$/ .test (cardnumber)){
                cardnumberError.textContent ="Enter the 16 number please !"
                return false;
            }
            else {
                cardnumberError.textContent ="";
                return true;
            }
        }
        function verefierthreedigits (threedigits){
            const threedigitsError = document.getElementById("threedigitsError");
            if(threedigits ===""){
                threedigitsError.textContent ="Enter a code security please !"
                return false;
            }
            if (!/^\d{3}$/ .test(threedigits)){
                threedigitsError.textContent="Enter a code containing 3 numbers"
                return false;
            }
            else {
                threedigitsError.textContent ="";
                return true;
            }
        }
        function verefierstatecountry (statecountry){
            const statecountryError =document.getElementById("statecountryError");
            if(statecountry ===""){
                statecountryError.textContent = "Enter a state please !";
                return false;
            }
            if(!/^[a-z]+$/ .test(statecountry)){
                statecountryError.textContent = "Enter a character please!";
                return false;
            }
            else {
                statecountryError.textContent = "";
                return true;
            }

        }
        function verefierpaypal (paypal){
            const paypalError = document.getElementById("paypalError");
            if(paypal ===""){
                paypalError.textContent = "";
                return true;
            }
            if(!/^\d{16}$/ .test(paypal)){
                paypalError.textContent = "Enter a valid paypal number please!";
                return false;
            }
            else {
                paypalError.textContent = "";
                return true;
            }
        }
        verefierName(fname);
        verefierEmail(email);
        verefierZippostal(zippostal);
        verefierCardnumber(cardnumber);
        verefierthreedigits(threedigits);
        verefierstatecountry(statecountry);
        verefierpaypal(paypal);

    })
}