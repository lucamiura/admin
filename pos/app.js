let products = [
{ id:1, name:"Night Ripper II", price:6500, description:"High-power LED", stock:10, image:"./items/NightRipper2.jpg" },
{ id:2, name:"Mini Version III", price:3000, description:"Compact", stock:15, image:"./items/MiniVersion3.jpg" },
{ id:3, name:"Night Ripper Plus", price:5500, description:"Enhanced", stock:8, image:"./items/NightRipperPlus.jpg" },
{ id:4, name:"Mini Plus", price:4000, description:"Portable", stock:12, image:"./items/MiniPlus.jpg" },
{ id:5, name:"Quad Beam", price:7500, description:"Multi-beam", stock:5, image:"./items/QuadBeam.jpg" },
{ id:6, name:"Mini Pod", price:3000, description:"Efficient", stock:20, image:"./items/MiniPod.jpg" }
];

let currentEditId = null;

const productsGrid = document.getElementById("productsGrid");
const inventoryList = document.getElementById("inventoryList");
const searchInput = document.getElementById("searchInput");
const viewModal = document.getElementById("viewModal");
const viewContent = document.getElementById("viewContent");

/* NAVIGATION */

function showSection(section,btn){
document.querySelectorAll("section").forEach(s=>s.style.display="none");
document.getElementById(section+"Section").style.display="block";
document.querySelectorAll(".nav-btn").forEach(b=>b.classList.remove("active"));
if(btn) btn.classList.add("active");
}

/* DISPLAY PRODUCTS */

function displayProducts(list=products){
productsGrid.innerHTML=list.map(p=>`
<div class="product-card" onclick="openViewModal(${p.id})">
<img src="${p.image}">
<h3>${p.name}</h3>
<p>₱${p.price}</p>
<p class="${p.stock<=5?'low-stock':''}">Stock: ${p.stock}</p>
<button onclick="event.stopPropagation(); openEditModal(${p.id})">
Edit
</button>
</div>`).join("");
}
displayProducts();

/* SEARCH */

searchInput.addEventListener("input",()=>{
const q=searchInput.value.toLowerCase();
displayProducts(products.filter(p=>
p.name.toLowerCase().includes(q) ||
p.description.toLowerCase().includes(q)
));
});

/* VIEW PRODUCT (ZOOM) */

function openViewModal(id){
const p=products.find(x=>x.id===id);

viewContent.innerHTML=`
<img src="${p.image}">
<div>
<h2>${p.name}</h2>
<p><strong>Price:</strong> ₱${p.price}</p>
<p>${p.description}</p>
<p>Stock: ${p.stock}</p>
<button onclick="openEditModal(${p.id})">Edit Product</button>
</div>`;

viewModal.style.display="flex";
}

function closeViewModal(){
viewModal.style.display="none";
}

/* INVENTORY DISPLAY */

function displayInventory(){
inventoryList.innerHTML=products.map(p=>
`<p>${p.name} — ₱${p.price} — Stock: ${p.stock}</p>`
).join("");
}
displayInventory();

/* ADD PRODUCT */

function openAddModal(){
document.getElementById("addModal").style.display="flex";
}

function closeAddModal(){
document.getElementById("addModal").style.display="none";
}

function addNewProduct(){
const name=newName.value.trim();
const desc=newDesc.value.trim();
const price=parseFloat(newPrice.value);
const stock=parseInt(newStock.value);
const file=newImage.files[0];

if(!name||!desc||!price||!stock||!file){
alert("Fill all fields!");
return;
}

const reader=new FileReader();
reader.onload=e=>{
const id=products.length?products[products.length-1].id+1:1;
products.push({id,name,description:desc,price,stock,image:e.target.result});
displayProducts();
displayInventory();
closeAddModal();
};
reader.readAsDataURL(file);
}

/* EDIT PRODUCT */

function openEditModal(id){
const p=products.find(x=>x.id===id);
currentEditId=id;

editName.value=p.name;
editDesc.value=p.description;
editPrice.value=p.price;
editStock.value=p.stock;

document.getElementById("editModal").style.display="flex";
}

function closeEditModal(){
document.getElementById("editModal").style.display="none";
}

function saveEdit(){
const p=products.find(x=>x.id===currentEditId);

p.name=editName.value.trim();
p.description=editDesc.value.trim();
p.price=parseFloat(editPrice.value);
p.stock=parseInt(editStock.value);

displayProducts();
displayInventory();
closeEditModal();
}