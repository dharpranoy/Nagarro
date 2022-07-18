 let qwert="";
function runcode(){
    let res;
    try{					
	res=eval(qwert);
	qwert=res.toString()
    }catch{
	res='Syntax Error'
	qwert=""
	console.log('err')
    }
   document.getElementById("display").innerHTML=res;
}
function action(ele){
    qwert+=ele;
    document.getElementById("display").innerHTML=qwert;
}
function back(){
    qwert=qwert.substring(0,qwert.length-1);
    document.getElementById("display").innerHTML=qwert;
    
}
function clean(){
    qwert="";
    document.getElementById("display").innerHTML=qwert;
}
