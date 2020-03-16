function suma(){
	var s;
	const a = Number(document.getElementById("cheese").value);
	const b = Number(document.getElementById("cheese1").value);
	s = (a + b)* 25;
	document.getElementById("rezultat").innerHTML = s;
} 

function plus(){
	var a = Number(document.getElementById("cheese").value);
	a += 1;
    document.getElementById("cheese").value = a;
} 

function minus(){
    var a = Number(document.getElementById("cheese").value);
    a -= 1;
    document.getElementById("cheese").value = a;
}



// show cart


 (function(){
 	const cartInfo = document.getElementById('cart-info');
 	const cart = document.getElementById('cart');



 	cartInfo.addEventListener('click', function(){
      cart.classList.toggle('show-cart');
 	})
 })



//add items to cart