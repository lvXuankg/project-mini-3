// FetchApi 
const fetchApi = (url)=>{
    var result = fetch(url)
        .then(response => response.json())
        .then(data => {
            return data;
        });
    return result;
}

// Định dạng giá tiền
function setPrice(x){
    var result = "";
    if(x==0) return "0";
    while(x > 0){
        let s = x % 1000;
        x = Math.floor(x/1000);
        let num = s.toString();
        if(x){
            num = num.padStart(3, "0");
        }
        result = num + (result ? "," : "") + result;
        
    }
    return result;
}

// Thêm icon vào thanh tìm kiếm 
const input = document.getElementById("searchInput");
input.placeholder = "\uf002 " + input.placeholder; 
input.style.fontFamily = "Font Awesome 5 Free"; 
input.style.fontWeight = "400"; 

//Thêm chức năng chọn nav bar
const divMenuBar = document.querySelector("#menuBar");
const divNavBars = document.querySelector("#nav-bars");
divMenuBar.onclick = ()=>{
    divNavBars.classList.toggle("show");
};

//Banner 1
const buttonClose1 = document.querySelector("#closeBanner1");
buttonClose1.addEventListener("click", ()=>{
    const divBanner1 = document.querySelector("#banner-1");
    divBanner1.style.display = "none";
});

//Sell Gocery
const divSell = document.querySelector("#sellGrocery");
var getAllGrocery;
var urls = [
    "https://database-project-mini-3-one.vercel.app/humans",
    "https://database-project-mini-3-one.vercel.app/goods",
    "https://database-project-mini-3-one.vercel.app/laptop",
    "https://database-project-mini-3-one.vercel.app/books",
    "https://database-project-mini-3-one.vercel.app/telephone",
    "https://database-project-mini-3-one.vercel.app/mita"
]

async function getAllApi(){
    var dataApi = [];
    for(x of urls){
        let data = await fetchApi(x);
        dataApi = await dataApi.concat(data);
    }
    return dataApi;

}
// Show Item 
function CloseModal(){
    const divContainerModal = document.querySelector("#modalContainer");
    divContainerModal.classList.remove("show");
}
function addToCart(x){

}
function showItem(x){
    const divContainerModal = document.querySelector("#modalContainer");
    const divModal = document.querySelector("#modal");
    const item = getAllGrocery[x];
    divModal.innerHTML = `
    <div class="box">
        <div class="imgContainer">
            <img src="${item.image}">
        </div>
        <div class="contentContainer">
            <div class="name">
                <b>${item.name}</b>
            </div>
            <div class="description">
                <b>Giới thiệu :</b> <i>${item.description}</i>
            </div>
            <div class="price">
                <b>Giá :</b> ${setPrice(item.price)}
            </div>
            <div class="slots">
                <b>Còn lại :</b> ${item.slots}
            </div>
        </div>
    </div>
    <div class="buttons">
        <button class="closeButton" onclick="CloseModal()">Close</button>
        <button class="addToCart" onclick="addToCart(${x});CloseModal();">Add</button>
    </div>
    
    
    `
    divContainerModal.classList.add("show");

}
const divCModal = document.querySelector("#modalContainer");
divCModal.addEventListener("click", (event)=>{
    if(event.target == divCModal){
        divCModal.classList.remove("show"); 
    }
      
});
// Show Item 
// Show all Item 
function showAllItem(viewMore){
    getAllApi()
    .then(data => {
        getAllGrocery = data;
        themID(getAllGrocery);
        let count = 0;
        let htmls = `
        <div class="container">
        <div class="box">
        <div class="buttons">
            <div class="button1" onclick="SortItems(1)"><i class="fa-solid fa-sort-down"></i></div>
            <div class="button2" onclick="SortItems(2)"><i class="fa-solid fa-sort-up"></i></div>
        </div>

        
        <div class="row">
            `;
        for(x of data){
            ++count;
            if(viewMore == false && count==13){
                break;
            }
            htmls += `
                <div class="col-xl-2 col-lg-3 col-md-6 col-6">
                    <div class="inner-wrap" onclick="showItem(${count-1})">
                        <div class="imageContainer">
                            <img src="${x.image}">
                        </div>
                        <h3>${x.name}</h3>
                        <p>Giá : ${setPrice(Number(x.price))}</p>
                        <p>Còn lại: ${x.slots}</p>
                        <button>Thêm vào giỏ hàng</button>
                    </div>
                </div>
            `;
        }
        if(count > 12 && viewMore == false){
            htmls += `
            <div class="col-12">
                <button class="viewMore" onclick="showAllItem(true)">
                    <i class="fa-solid fa-toggle-off"></i>
                    <span>View More</span>
                </button>
            </div>`
        }
        htmls += `
        </div>
        </div>
        </div>
        `;
        divSell.innerHTML = htmls;
    })
}
showAllItem(false);
// End Show All Item 
// Sort Groceries 
function displayItems(data){
    getAllGrocery = data;
    themID(getAllGrocery);
    let count = 0;
    let htmls = `
    <div class="container">
    <div class="box">
    <div class="buttons">
        <div class="button1" onclick="SortItems(1)"><i class="fa-solid fa-sort-down"></i></div>
        <div class="button2" onclick="SortItems(2)"><i class="fa-solid fa-sort-up"></i></div>
    </div>

    
    <div class="row">
        `;
    for(x of data){
        count++;
        htmls += `
            <div class="col-xl-2 col-lg-3 col-md-6 col-6">
                <div class="inner-wrap" onclick="showItem(${count-1})">
                    <div class="imageContainer">
                        <img src="${x.image}">
                    </div>
                    <h3>${x.name}</h3>
                    <p>Giá : ${setPrice(Number(x.price))}</p>
                    <p>Còn lại: ${x.slots}</p>
                    <button>Thêm vào giỏ hàng</button>
                </div>
            </div>
        `;
    }
    
    htmls += `
    </div>
    </div>
    </div>
    `;
    divSell.innerHTML = htmls;
}
function SortItems(type){
    var APIs = getAllGrocery;
    if(type == 2)   APIs.sort((a, b) => a.price - b.price);
    else APIs.sort((a,b) => b.price - a.price);
    displayItems(APIs);
}
// End SortGroceries

// Thêm id cho object
function themID(Items){
    let cnt = 0;
    Items.forEach(item => {
        item.ids = cnt++; 
    });
}

// Search Hint
function normalizeString(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}
const searchHint = document.getElementById("searchHint");

input.addEventListener("input", ()=>{
    const inputValue = input.value;
    searchHint.innerHTML = "";

    if(inputValue){
        const filteredSuggestions = getAllGrocery.filter(function(value){
            let textInput = normalizeString(value.name);
            return textInput.toLowerCase().includes(normalizeString(inputValue).toLowerCase());
        });
        console.log(filteredSuggestions);
        filteredSuggestions.forEach(item => {
            const listItem = document.createElement("li");
            listItem.textContent = item.name;
            listItem.addEventListener("click",()=>{
                showItem(item.ids);
                searchHint.style.display = "none";
            });
            searchHint.appendChild(listItem);
        });
        searchHint.style.display = "block";
    }
    else{
        searchHint.style.display = "none";
    }
});
// End Search Hint 