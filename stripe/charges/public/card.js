const pubkey = 'pk_test_51LSa6VSE7l0ULveFLJdxFyAtsyhjuuAo2IIEvi7TWYKADSnj7glGxD7VC4liUSz4upayva7TSgrFqJG6nzehRdI800YqaiIN2f'
const stripe = Stripe(pubkey)
const elements = stripe.elements()
let style = {
	base : {
		color:'#fab'
	}
}
const card = elements.create('card',{style})
card.mount('#card-element')
const form = document.querySelector('form')
const error = document.querySelector('#card-errors')
const TokenHandler = (token)=>{
	const hiddenInput = document.createElement('input');
	  hiddenInput.setAttribute('type', 'hidden');
	  hiddenInput.setAttribute('name', 'stripeToken');
	  hiddenInput.setAttribute('value', token.id);
	  form.appendChild(hiddenInput);

	  form.submit();
}
form.addEventListener('submit', e => {
  e.preventDefault();

  stripe.createToken(card).then(res => {
    if (res.error) error.textContent = res.error.message;
    else TokenHandler(res.token);
  })
})
