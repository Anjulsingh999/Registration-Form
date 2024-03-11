
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyMCKNLAo5j3JQvYENbjW3ZfKorUQi_7ht-zP8LTxcnrRWNdqkBMShfF9_5zBVAkQxT/exec'
  const form = document.forms['submit-to-google-sheet']
  const msg=document.getElementById("conform-msg")

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
        msg.innerHTML="Submit Succesfully !"

        setTimeout(function(){
          msg.innerHTML=""
        },5000)
      })
      .catch(error => console.error('Error!', error.message))
  })
