// Global Variables
let saleItems = [];
let itemValues = [];

let myCatalog = document.querySelector('section')
let myButton = document.querySelector('section + div');
let image1 = document.querySelector('section  img:first-child');
let image2 = document.querySelector('section  img:nth-child(2)');
let image3 = document.querySelector('section  img:nth-child(3)');
let resultsButton = document.getElementById('resultsButton');
let clicks = 0;
let clicksAllowed = 25;
// Functions
function item(name, fileLocation = 'jpg') {
  this.name = name
  this.src = `images/${name}.${fileLocation}`;
  this.views = 0;
  this.clicks = 0;
  saleItems.push(this);
}
function selectItem() {
  return Math.floor(Math.random() * saleItems.length);
}
function renderCatalog() {
  let rItem1 = selectItem();
  let rItem2 = selectItem();
  let rItem3 = selectItem();
  // itemValues.push(rItem1, rItem2, rItem3)


  while (rItem1 === rItem2 || rItem1 === rItem3 || rItem2 === rItem3) {
    rItem3 = selectItem();
    rItem2 = selectItem();
  }
  image1.src = saleItems[rItem1].src;
  image2.src = saleItems[rItem2].src;
  image3.src = saleItems[rItem3].src;
  image1.alt = saleItems[rItem1].name;
  image2.alt = saleItems[rItem2].name;
  image3.alt = saleItems[rItem3].name;


  saleItems[rItem1].views++;
  saleItems[rItem2].views++;
  saleItems[rItem3].views++;
}
function handleClick(event) {
  event.preventDefault();
  if (event.target === myCatalog) {
    alert('Please click on an image');
  };
  clicks++;

  let clickItem = event.target.alt;
  console.log(clickItem);

  for (let i = 0; i < saleItems.length; i++) {

    if (clickItem === saleItems[i].name) {

      saleItems[i].clicks++;

      break;


    }
  }

  renderCatalog();
  if (clicks === clicksAllowed) {
    resultsButton.style.display = 'block';
    resultsButton.addEventListener('click', handleViewResults);
    myCatalog.removeEventListener('click', handleClick);

  }
}

function handleViewResults (e){
  e.preventDefault();
  renderResults();
  resultsButton.removeEventListener('click', handleViewResults);
}

function renderResults() {
  let ul = document.querySelector('ul');
  for (let i = 0; i < saleItems.length; i++) {
    let li = document.createElement('li')
    li.textContent = `${saleItems[i].name} had ${saleItems[i].views} views and was clicked ${saleItems[i].clicks} times.`;
    ul.appendChild(li);
  }
}
new item('bag')
new item('banana')
new item('bathroom')
new item('boots')
new item('breakfast')
new item('bubblegum')
new item('chair')
new item('cthulhu')
new item('dog-duck')
new item('dragon')
new item('pen')
new item('pet-sweep')
new item('scissors')
new item('shark')
new item('sweep', 'png')
new item('tauntaun')
new item('unicorn')
new item('water-can')
new item('wine-glass')

console.log(saleItems);


myCatalog.addEventListener('click', handleClick);
renderCatalog();
// myButton.addEventListener('click', renderResults);