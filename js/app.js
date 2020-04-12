window.onload = () => findFilter('all');

const cat = document.getElementById('filter');
const aa = document.createElement('div');
const tov = document.getElementById('tovar');
const sum = document.getElementById('sum');
const dropMenu = document.getElementsByClassName('dropdown-menu');
const cart = document.getElementsByClassName('table')[0];

let costSum = 0;
const category = ["Pizza", "Drinks", "Wrap", "Toppings"];
const firm = ["Samsung", "Xiaomi", "LG", "Apple", "Vesta"];

const summa = (s) => {
    costSum += s;
    sum.innerHTML = `Всего: ${costSum} $`;
};

for (let tov of category) {
    let drop = document.createElement('div');
    drop.innerHTML = `<a class="dropdown-item" onclick=findFilter('${tov}')>${tov}</a>`;
    dropMenu[0].appendChild(drop);
}
;
for (let tov of firm) {
    let drop = document.createElement('div');
    drop.innerHTML = `<a class="dropdown-item" onclick=findFilter('${tov}')>${tov}</a>`;
    dropMenu[1].appendChild(drop);
}
;


const findFilter = (value) => {
    value = value + '';
    tov.innerHTML = '';
    console.log('ddddd ', value);
    for (let i = 0; i < tovar.length; i++) {
        if (value == tovar[i].category || value == tovar[i].firm || value == 'all') {
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
		          </h4>
		          
		          <p class="card-text"> ${tovar[i].category}
		          </p>
		         
		          <div class="card-footer px-1">
		            <span class="float-left font-weight-bold">
		              <strong>${tovar[i].cost}</strong>
		            </span>
		            <span class="float-right">
		              <button onclick="summa(tovar[${i}].cost);tovar[${i}].onCart++" class="btn btn-success" style="margin-top: 5px;">
						<i class="material-icons">shopping_cart</i>
				 	</button>
		            </span>
		          </div>
		        </div>		
      </div>
    `;
            tov.appendChild(tovCont);
        }
    }
}


const isOnCart = () => {
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
              </thead>
              
	`;
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
