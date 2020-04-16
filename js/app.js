let tovar = null;

window.onload = () => findFilter('all');

fetch('json/content.json')
    .then(response => response.json())
    .then(summary => {
        loadCategory(summary.category);

        initTovar(summary.content);
    });

const tov = document.getElementById('tovar');
const sum = document.getElementById('sum');
const dropMenu = document.getElementsByClassName('dropdown-menu');
const cart = document.getElementsByClassName('table')[0];

let costSum = 0;

function initTovar(t) {
    return tovar = t;
}

function loadCategory(category) {
    for (let tov of category) {
        let drop = document.createElement('div');
        drop.innerHTML = `<a class="dropdown-item" onclick=findFilter('${tov}')>${tov}</a>`;
        dropMenu[0].appendChild(drop);
    }
}



const findFilter = (value) => {
    tov.innerHTML = '';
    for (let i = 0; i < tovar.length; i++) {

        var countSource = `<div id="input_div">
                                <lavel>Порция сыра</lavel><br>
                                <input type="button" value="-" id="minus" 
                                onclick="summaDobavok(${tovar[i].id}, -${tovar[i].sirPrice}); minus(${tovar[i].sir}, ${tovar[i].id})">
                               
                                <input type="text" size="25" value="${tovar[i].sir}" id="count${tovar[i].id}" style="width: 15px">
                                 <input type="button" value="+" id="plus" 
                                onclick="plus(${tovar[i].sir}, ${tovar[i].id}); summaDobavok(${tovar[i].id}, ${tovar[i].sirPrice})">
                           </div>`;

        var dough = `<div class="form-check">
                        <input type="checkbox" ${tovar[i].corj ? 'checked' : ''} 
                        class="form-check-input" id="doughCheck${tovar[i].id}" 
                        onclick="checkboxCorj(${tovar[i].corj}, ${tovar[i].id}, ${tovar[i].corjPrice})">
                        <label class="form-check-label" for="doughCheck${tovar[i].id}">Пышный корж</label>
                    </div>`;

        var ice = `<div class="form-check">
                        <input type="checkbox" ${tovar[i].ice ? 'checked' : ''}  
                        class="form-check-input" id="iceCheck${tovar[i].id}"
                        onclick="checkboxIce(${tovar[i].ice}, ${tovar[i].id}, ${tovar[i].icePrice})">
                        <label class="form-check-label" for="doughCheck${tovar[i].id}">Лёд</label>
                    </div>`;

        if (value === tovar[i].category || value === tovar[i].firm || value === 'all') {
            let tovCont = document.createElement('div');
            tovCont.className = "tovContainer";
            tovCont.innerHTML = `
      <div class="card card-cascade narrower ">
		        <div class="view view-cascade overlay">
		          <img src='${tovar[i].img}' class=" img-fluid"
		            alt="sample photo">
		          <a>
		            <div class="mask rgba-white-slight"></div>
		          </a>
		        </div>
		        <div class="card-body card-body-cascade text-center">
		         
		          <h4 class="card-title">
		            <strong>
		              <p class="black-text" href="">${tovar[i].name} </p>
		            </strong>
		          </h4>`
                .concat(tovar[i].category === 'Pizza' ? countSource : '')
                .concat(tovar[i].corj != null ? dough : '')
                .concat(tovar[i].ice != null ? ice : '')
                .concat(
                    `<p class="card-text"> ${tovar[i].category}
		          </p>
		         
		          <div class="card-footer px-1">
		            <span class="float-left font-weight-bold">
		              <strong>${tovar[i].cost}</strong>
		            </span>
		            <span class="float-right">
		              <button onclick="tovar[${i}].onCart++; summa(tovar[${i}].cost)" class="btn btn-success" style="margin-top: 5px;">
						<i class="material-icons">shopping_cart</i>
				 	</button>
		            </span>
		          </div>
		        </div>		
      </div>
    `);
            tov.appendChild(tovCont);
        }
    }
}

const onCart = () => {
    cart.innerHTML = `
	<thead class="bg-dark ">
                <tr>
                  <th scope="col" class="border-0 bg-dark">
                    <div class="p-2 px-3 text-uppercase">Product</div>
                  </th>
                  <th scope="col" class="border-0 bg-dark">
                    <div class="py-2 text-uppercase">Name</div>
                  </th>
                  <th scope="col" class="border-0 bg-dark">
                   <img alt="" width="70" class="img-fluid rounded shadow-sm">
                    <div class="py-2 text-uppercase"></div>
                  </th>
                  <th scope="col" class="border-0 bg-dark">
                    <div class="py-2 text-uppercase">Price</div>
                  </th>
                  <th scope="col" class="border-0 bg-dark">
                    <div class="py-2 text-uppercase">Quantity</div>
                  </th>
                </tr>
              </thead>`;
    for (let i = 0; i < tovar.length; i++) {
        if (tovar[i].onCart) {
            let tovCont = document.createElement('tr');
            tovCont.innerHTML = `
			     <td>${tovar[i].category}</td>
			     <th>${tovar[i].name}</th>
			     <th><img src="${tovar[i].img}" style="height: 100px; width: 100px"></th>
			     <td>${tovar[i].cost}</td>
			     <td>${tovar[i].onCart}</td>`;
            cart.appendChild(tovCont);
        }
    }
}

const summa = (s) => {
    sum.innerHTML = `Всего: ${costSum += s} $`;
}

const summaDobavok = (id, s) => {
    if (isOnCart(id) && s > 0) {
        summa(s);
    } else if (isOnCart(id) && s < 0 && getElement("count"+id).value > 0) {
        summa(s);
    }
}

function plus(count, id) {
    if (isOnCart(id)) {
        var el = getElement("count" + id);
        el.value++;
    }
}

function minus(count, id) {
    var el = getElement("count" + id);
    if (isOnCart(id) && el.value >= 1) {
        el.value--;
    }
}

function checkboxCorj(checked, id, price) {
    var el = getElement("doughCheck" + id);
    if (checked != null && isOnCart(id)) {
        if (el.checked)
            summa(price);
        if (!el.checked)
            summa(-price);
    }
}

function checkboxIce(checked, id, price) {
    var el = getElement("iceCheck" + id);
    if (checked != null && isOnCart(id)) {
        if (el.checked)
            summa(price);
        if (!el.checked)
            summa(-price);
    }
}

function isOnCart(id) {
    for (let i of tovar) {
        if (i.onCart > 0 && i.id === id) {
            return true;
        }
    }
    return false;
}

function getElement(idElement) {
    return document.getElementById(idElement);
}
