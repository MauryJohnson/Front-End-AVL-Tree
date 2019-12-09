console.log("heLLO WORLD");

document.getElementById("AddButton").addEventListener("click",function(){
	//alert("Add Button Clicked");
	
	var Num = parseInt(prompt("Enter a Number to insert"));

	try{
		if(isNaN(Num)){
			alert("Invalid Number:"+Num);
		}
		else {
			insert({"Context":this,"Node":Root,"data":Num})
		}
	}
	catch(e){
		alert(e);
	}
	
})