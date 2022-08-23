get=()=>{
            let dom = document.getElementById("low");
            dom.innerHTML="";
            let par = document.createElement('form');
            par.setAttribute('action','/reset/gen');
            par.setAttribute('method','post');
            let tx = document.createElement('input');
            tx.setAttribute('type','email');
            tx.setAttribute('placeholder','Enter your registered mail id');
            tx.setAttribute('name','mail');
            let su = document.createElement('input');
            su.setAttribute('type','submit');
	    su.setAttribute('required','');
            su.setAttribute('value','generate otp');
            par.appendChild(tx);
            par.appendChild(su);
            dom.appendChild(par);
        }
