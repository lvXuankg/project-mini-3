// Thêm icon vào thanh tìm kiếm 
const input = document.getElementById("search");
input.placeholder = "\uf002 " + input.placeholder; 
input.style.fontFamily = "Font Awesome 5 Free"; 
input.style.fontWeight = "400"; 

//Banner 1
const buttonClose1 = document.querySelector("#closeBanner1");
buttonClose1.addEventListener("click", ()=>{
    const divBanner1 = document.querySelector("#banner-1");
    divBanner1.style.display = "none";
});