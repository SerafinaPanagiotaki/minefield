src="minefield.js"


document.getElementById("easy").addEventListener("click",startGame);	
document.getElementById("advanced").addEventListener("click",startGame);
document.getElementById("professional").addEventListener("click",startGame);
document.getElementById("screen2").addEventListener("click", showScreen2);
document.getElementById("reset").addEventListener("click", newGame);
document.getElementById("about").addEventListener("click", aboutGame);
document.getElementsByClassName("field").value.addEventListener("click", function(){			
	play(this.value);
});
			
var bombs, hits=0, miss=0, tries=3, blocks=10;
const trapField = [bombs];

function startGame(){ 
	document.getElementById("message").style.visibility = "hidden";
	showInfo();
	showScreen();
	if (this.value=="Easy"){
		bombs=5;
	}else if(this.value=="Advanced"){
		bombs=8;
	}else if(this.value=="Professional"){
		bombs=10;
	}
	for(let i=0; i<bombs; i++){ 
		console.log(trapField[i]);
	}
	for(let i=0; i<bombs; i++){  //γεννήτρια τυχαίων αριθμών μεταξύ 1 και 36, εδώ θα τοποθετηθούν οι νάρκες.
		trapField[i]=Math.floor(1+Math.random() * 36);
		for(j=0; j<i; j++){  //debugging, για την περίπτωση να δώσει η γεννήτρια ίδιο τυχαίο αριθμό με κάποιον προηγούμενο.
			while(trapField[i]==trapField[j]){
				trapField[i]=Math.floor(1+Math.random() * 36);
			}
		}
		console.log(trapField[i]);
	}
}

function play(x){
	showScore();
	hits=0, miss=0, tries=3, blocks=10;
	while(hits<10){
		for(let i=0; i<bombs; i++){
			if(this.value==trapField[i]){
				miss++;
				tries--;
				this.src="blast.jpg";
				break;
			}else{
				hits++;
				blocks--;
				this.src="ok_image.jpg";
			}
		}
		showScore(bombs, hits, miss, tries);
		if(tries==0){
			document.getElementById("side22").innerHTML="<b>Oh, no!!! You just lost the game... </b>";
			document.getElementById("side23").style.visibility="hidden";
			document.getElementById("side24").style.visibility="hidden";
			document.getElementById("side25").style.visibility="hidden";
			document.getElementById("side26").style.visibility="hidden";
			showField();
			break;
		}
		if(hits==10){
			document.getElementById("side22").innerHTML="<b>Congratulations, you won!!!"+"</br>"+"Great job, well done!!! </b>";
			document.getElementById("side23").style.visibility="hidden";
			document.getElementById("side24").style.visibility="hidden";
			document.getElementById("side25").style.visibility="hidden";
			document.getElementById("side26").style.visibility="hidden";
			showField();
			break;
		}
	}
}	
		
function showField(){
	for(let i=0; i<37; i++){
		for(let j=0; j<bombs; j++){
			if(document.getElementsByClassName("field").value==trapField[j]){
				console.log(trapField[j]);
				this.src="blast.jpg";
			}else{
				this.src="ok_image.jpg";
			}
		}
	}
}

function showInfo(){
	document.getElementById("side1").style.visibility="visible";
	document.getElementById("side21").style.visibility="visible";
}
			
function hideInfo(){
	document.getElementById("side21").style.visibility="hidden";
	document.getElementById("side1").style.visibility="hidden";
	document.getElementById("side22").style.visibility="hidden";
	document.getElementById("side23").style.visibility="hidden";
	document.getElementById("side24").style.visibility="hidden";
	document.getElementById("side25").style.visibility="hidden";
	document.getElementById("side26").style.visibility="hidden";
}
			
function showScreen(){
	document.getElementById("screen").style.display = "block";
	document.getElementById("screen2").style.display = "none";	
}
			
function hideScreen(){
	document.getElementById("screen").style.display = "none";
	document.getElementById("screen2").style.display = "block";
}

function showScreen2(){
	document.getElementById("message").style.visibility = "visible";
	document.getElementById("message").innerHTML = "<b>Select difficulty level from above:</b>";
	document.getElementById("message").style.color="#cc00cc";
}
			
function showScore(bombs, hits, miss, tries){				
	document.getElementById("side21").innerHTML='<b>Current Score:</b>';
	document.getElementById("side26").style.visibility="visible";
	document.getElementById("side22").style.visibility="visible";
	document.getElementById("side23").style.visibility="visible";
	document.getElementById("side24").style.visibility="visible";
	document.getElementById("side25").style.visibility="visible";
	document.getElementById("side26").innerHTML="<b>Hidden bombs:    </b>"+bombs;
	document.getElementById("side22").innerHTML="<b>Hits:    </b>"+hits;
	document.getElementById("side23").innerHTML="<b>Failures:    </b>\t"+miss;
	document.getElementById("side24").innerHTML="<b>Tries remaining:    </b>\t"+tries;
	document.getElementById("side25").innerHTML="<b>Blocks to win:    </b>\t"+blocks;
}
			
function newGame(){
	trapField.splice(0, trapField.length);
	for(let i=0; i<trapField.length; i++){
		console.log(trapField[i]);
	}
	hideInfo();
	hideScreen();
	bombs=hits=miss=0;
	tries=3;
	blocks=10;
}
			
function aboutGame(){
	alert("Programmed, designed and developed by Shery Panagiotaki,\n@copyright 2022\n\nBuilt with HTML5, CSS and Javascript");
}
	