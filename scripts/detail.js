/*
*URLdeki arama parametrelerini yönetebilmek için yerleşik bir JS class'ı 
bulunmaktadır
-URLSearchParams
*/
const params = new URLSearchParams(location.search);
//JS class'ının sağladığı get metodu ile parametreye erişme
const paramId = params.get("id");
document.addEventListener("DOMContentLoaded", async () => {
  //APIden ürünleri alma
  const res = await fetch("../db.json");
  const data = await res.json();
  //URLdeki Idye denk gelen ürünü bulma
  const product = data.menu.find((i) => i.id === Number(paramId));
  renderPage(product)
});
//Arayüzü göndereceğimiz div
const outlet = document.querySelector("#outlet")

//Bütün arayüzü ekrana basar
function renderPage(product){
    console.log(product)
   outlet.innerHTML = `
   <div class="d-flex justify-content-between fs-5">
        <a href="/"><img style="width: 40px" src="/home.png"></a>
        <div>Main Page/${product.category}/${product.title.toLowerCase()}</div>
    </div>
    <h1 class="text-center my-3 shadow rounded p-2">${product.title}</h1>
    <img src="${product.img}" class="rounded object-fit-cover shadow-lg" style="max-height: 400px">

   <h3 class="mt-4">Ürünün Kategorisi: <span class="text-success">${product.category}</span></h3>
   <h3 class="my-2">Ürünün Fiyatı: <span class="text-success">${product.price} €</span></h3>

    <p class="lead fs-3">
   ${product.desc}
    </p>
   `
}