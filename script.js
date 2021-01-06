const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillioneresBtn = document.getElementById('show-millioneres');
const sortBtn =document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data =  [];
//Fetch random user and money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random()*1000000)
    };
    
    addData(newUser);
}

//Double Money

function doubleMoney(){
    data = data.map(user => {
        return {...user, money: user.money * 2};
    });
    updateDOM();
}

//Sort users By richest
function sortByRichest(){
    data.sort((a,b) => b.money - a.money);

    updateDOM();

}




//Add new obj to data arr
function addData(obj){
    data.push(obj);

    updateDOM();
}

//Filet Only showMillioners
function showMillioneres(){
    data = data.filter(user => user.money > 1000000);

    updateDOM();
}


//Calculate the total wealth 
function calculateWealth(){
    const wealth = data.reduce((acc, user) => {
        return acc += user.money
    }, 0);
   
    const wealthEL = document.createElement('div');
    wealthEL.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong>`;
    main.appendChild(wealthEL);
}

//Update DOM 
function updateDOM(provideData = data){
    //Clear main div
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

    provideData.forEach((item) => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    })

   

}

// Format number ad money
function formatMoney(number) {
    return '$'+ number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}



//Event Listener 
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillioneresBtn.addEventListener('click', showMillioneres);
calculateWealthBtn.addEventListener('click',calculateWealth)






