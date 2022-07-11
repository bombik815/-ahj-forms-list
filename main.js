(()=>{"use strict";class e{constructor(){this.storage=localStorage}static saveList(e){if(!e)throw new Error("Product is null");{const t=[];if(localStorage.product){const t=Array.from(JSON.parse(localStorage.product));t.push(e),localStorage.setItem("product",JSON.stringify(t))}else e.title?(t.push(e),localStorage.setItem("product",JSON.stringify(t))):0!==e.length&&localStorage.setItem("product",JSON.stringify(e))}}static loadList(){try{return JSON.parse(localStorage.product)}catch(e){throw new Error("Invalid product")}}static clearStorage(){localStorage.clear()}}class t{constructor(e,t){this.title=e,this.price=t}}function l(e){return null!==e&&""!==e&&""!==e.trim()}function i(e){return null!==e&&""!==e&&e>0}class r{constructor(){this.list=document.getElementById("table-body"),this.add=document.querySelector(".add-product"),this.popup=document.getElementById("pop-up"),this.inputText=document.querySelector(".input-text"),this.inputNumber=document.querySelector(".input-number"),this.buttonSave=document.querySelector(".btn-save"),this.buttonCancel=document.querySelector(".btn-cancel"),this.deletePopup=document.getElementById("pop-up-delete"),this.deleteOk=document.querySelector(".btn-delete-ok"),this.deleteCancel=document.querySelector(".btn-delete-cancel"),this.iconsList=null,this.editList=null,this.deleteElement=null,this.editElement=null,this.priceNumber=null,this.titleText=null}renderDom(){this.list.innerHTML="\n    <tr>\n      <td>Название</td>\n      <td>Стоимость</td>\n      <td>Действия</td>\n    </tr>\n    ",this.updateDom(),this.events()}updateDom(){const t=document.querySelectorAll(".with-data");if(0!==t.length)for(const e of t)e.remove();if(localStorage.product){const t=e.loadList(),l=this.list.firstElementChild;for(let e=0;e<t.length;e+=1){const i=l.cloneNode();i.dataset.title=t[e].title,i.dataset.price=t[e].price,i.classList.add("with-data"),this.list.appendChild(i)}const i='\n      <div class="icons">\n        <span class="edit"></span>\n        <span class="delete"></span>\n      </div>\n      ';Array.from(document.querySelectorAll(".with-data")).forEach((e=>{const t=l.firstElementChild.cloneNode(),r=l.firstElementChild.cloneNode(),s=l.firstElementChild.cloneNode();t.textContent=e.dataset.title,e.appendChild(t),r.textContent=e.dataset.price,e.appendChild(r),s.innerHTML=i,e.appendChild(s)}))}this.iconsList=document.querySelectorAll(".delete"),this.editList=document.querySelectorAll(".edit"),this.deleteClick(),this.editClick()}events(){this.addClick(this.add),this.inputTitle(this.inputText),this.inputPrice(this.inputNumber),this.saveClick(this.buttonSave),this.cancelClick(this.buttonCancel),this.deleteOkClick(this.deleteOk),this.deleteCancelClick(this.deleteCancel)}addClick(e){e.addEventListener("click",(()=>{"none"===this.popup.style.display?this.popup.style.display="flex":(this.popup.style.display="none",this.priceNumber=null,this.titleText=null)}))}inputTitle(e){e.addEventListener("input",(t=>{l(t.target.value)?(this.titleText=t.target.value,document.querySelector(".error-title")&&this.titleText.length&&(document.querySelector(".error-title").style.display="none",document.querySelector(".error-title").remove())):r.popError(e,"title")}))}inputPrice(e){e.addEventListener("input",(t=>{i(t.target.value)?(this.priceNumber=Number(t.target.value),document.querySelector(".error-price")&&this.priceNumber>0&&(document.querySelector(".error-price").style.display="none",document.querySelector(".error-price").remove())):r.popError(e,"price")}))}saveClick(s){s.addEventListener("click",(()=>{null===this.titleText&&null===this.priceNumber?(r.popError(document.querySelector(".input-text"),"title"),r.popError(document.querySelector(".input-number"),"price")):l(this.titleText)?i(this.priceNumber)||r.popError(document.querySelector(".input-number"),"price"):r.popError(document.querySelector(".input-text"),"title"),null!==this.titleText&&null!==this.priceNumber&&(e.saveList(new t(this.titleText,this.priceNumber)),"flex"===this.popup.style.display&&(this.popup.style="display: none",null!==this.editElement&&r.updateListProducts(this.editElement),this.priceNumber=null,this.titleText=null,this.inputText.value=null,this.inputNumber.value=null),this.updateDom())}))}cancelClick(e){e.addEventListener("click",(()=>{"flex"===this.popup.style.display&&(this.popup.style="display: none",this.priceNumber=null,this.titleText=null,this.inputText.value=null,this.inputNumber.value=null),document.querySelector(".error-title")&&(document.querySelector(".error-title").style.display="none",document.querySelector(".error-title").remove()),document.querySelector(".error-price")&&(document.querySelector(".error-price").style.display="none",document.querySelector(".error-price").remove())}))}deleteClick(){for(const e of this.iconsList)e.addEventListener("click",(e=>{"none"===this.deletePopup.style.display&&(this.deletePopup.style.display="flex",this.deleteElement=e.target.closest("tr"))}))}deleteOkClick(e){e.addEventListener("click",(()=>{this.deletePopup.style.display="none",r.updateListProducts(this.deleteElement),this.updateDom()}))}deleteCancelClick(e){e.addEventListener("click",(()=>{this.deletePopup.style.display="none"}))}editClick(){for(const e of this.editList)e.addEventListener("click",(e=>{"none"===this.popup.style.display&&(this.popup.style.display="flex",this.priceNumber=e.target.closest("tr").dataset.price,this.titleText=e.target.closest("tr").dataset.title,this.inputText.value=e.target.closest("tr").dataset.title,this.inputNumber.value=e.target.closest("tr").dataset.price,this.editElement=e.target.closest("tr"))}))}static updateListProducts(t){const l=e.loadList();for(let e=0;e<l.length;e+=1)l[e].title===t.dataset.title&&l[e].price===+t.dataset.price&&l.splice(e,1);e.clearStorage(),e.saveList(l)}static popError(e,t){if(e&&!document.querySelector(`.error-${t}`)){const l=document.createElement("div");l.textContent=`Error ${t}`,l.className=`error-${t}`,e.offsetParent.appendChild(l),l.style.top=`${e.offsetTop+l.offsetHeight}px`,l.style.left=`${e.offsetLeft}px`}}}console.log("app started"),(new r).renderDom()})();