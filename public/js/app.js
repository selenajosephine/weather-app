const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = search.value;
    messageTwo.textContent = 'Loading...';
    messageOne.textContent = '';
    fetch('http://localhost:3000/weather?address=' + location).then(res => {
        res.json().then((data) => {
            if (data.error) {
                messageTwo.textContent = data.error;
                messageOne.textContent = '';
            }
            else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    }).catch(err => {
        console.log(err);
    });

})