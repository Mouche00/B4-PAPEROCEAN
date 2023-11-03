const burgerBtn = document.getElementById("burger");
const mobileNav = document.getElementById("mobile-nav");



burgerBtn.addEventListener("click",function(){
    if(mobileNav.style.display == "none"){
        mobileNav.style.display = "block";
    }
    else{
        mobileNav.style.display = "none";
    }
})