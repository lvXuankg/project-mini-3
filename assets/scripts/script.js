// FetchApi 
const fetchApi = (url)=>{
    var result = fetch(url)
        .then(response => response.json())
        .then(data => {
            return data;
        });
    return result;
}

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

//Sell Gocery
const divSell = document.querySelector("#sellGocery");
var urls = [
    "http://localhost:3000/humans",
    "http://localhost:3000/goods",
    "http://localhost:3000/laptop",
    "http://localhost:3000/books",
    "http://localhost:3000/telephone",
    "http://localhost:3000/mita"
]

async function getAllApi(){
    var dataApi = [];
    for(x of urls){
        let data = await fetchApi(x);
        dataApi = await dataApi.concat(data);
    }
    return dataApi;

}
getAllApi()
    .then(data => {
        let htmls = `
        <div class="container">
        <div class="box">
        <div class="row">
            `;
        for(x of data){
            htmls += `
                <div class="col-xl-2 col-lg-3 col-md-6 col-6">
                    <div class="inner-wrap">
                        <div class="imageContainer">
                            <img src="${x.image}">
                        </div>
                        <h3>${x.name}</h3>
                        <p>Giá : ${x.price}</p>
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
    })
