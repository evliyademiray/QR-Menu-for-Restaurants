import { renderMenuItems, renderButtons } from "./scripts/ui.js";
//HTMLden gelenler
const menuList = document.querySelector("#menu-list");
const buttonsArea = document.getElementById("buttons");
//!Sayfanın yükleme anını izleme
document.addEventListener("DOMContentLoaded", () => {
  renderButtons();
  fetchMenu();
});
//datayı global scope da tanımlama
let data;
//Menü verilerini json dosyasından çeker
async function fetchMenu() {
  const res = await fetch("./db.json");
  data = await res.json();
  renderMenuItems(data.menu, menuList);
}
//Tıklanılan kategoriyi belirleme
buttonsArea.addEventListener("click", (e) => {
  if (e.target.id !== "buttons") {
    renderButtons(e.target.innerText);
    //seçili kategriye erişme
    const selected = e.target.dataset.category;
    if (selected === "all") {
      //filtreleme yapma, APIden gelen verileri ekrana bas
      renderMenuItems(data.menu, menuList);
    } else {
      //Seçili kategoriye göre filtreleme
      const filtered = data.menu.filter((i) => i.category === selected);
      //Filtrelenmiş veriyi ekrana basma
      renderMenuItems(filtered, menuList);
    }
  }
});
