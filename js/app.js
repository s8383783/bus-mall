// Global Variables
let saleItems = [];
let itemValues = [];

let myCatalog = document.querySelector('section')
// let myButton = document.querySelector('section + div');
let image1 = document.querySelector('section  img:first-child');
let image2 = document.querySelector('section  img:nth-child(2)');
let image3 = document.querySelector('section  img:nth-child(3)');
let clicks = 0;
let clicksAllowed = 2;
// Functions
function Item(name, src) {
  this.name = name
  this.src = src
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
// name array
new Item('bag', './images/bag.jpg')
new Item('banana', './images/banana.jpg')
new Item('bathroom', './images/bathroom.jpg')
new Item('boots', './images/boots.jpg')
new Item('breakfast', './images/breakfast.jpg')
new Item('bubblegum', './images/bubblegum.jpg')
new Item('chair', './images/chair.jpg')
new Item('cthulhu', './images/cthulhu.jpg')
new Item('dog-duck', './images/dog-duck.jpg')
new Item('dragon', './images/dragon.jpg')
new Item('pen', './images/pen.jpg')
new Item('pet-sweep', './images/pet-sweep.jpg')
new Item('scissors', './images/scissors.jpg')
new Item('shark', './images/shark.jpg')
new Item('sweep', './images/sweep.png')
new Item('tauntaun', './images/tauntaun.jpg')
new Item('unicorn', './images/unicorn.jpg')
new Item('water-can', './images/water-can.jpg')
new Item('wine-glass', './images/wine-glass.jpg')

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
    myCatalog.removeEventListener('click', handleClick);
    renderChart();
    storeItem();
  }
}




//

function renderChart() {
  let itemNames = [];
  for (let i = 0; i < saleItems.length; i++) {
    itemNames.push(saleItems[i].name)

  };
  let itemClicks = [];
  for (let i = 0; i < saleItems.length; i++) {
    itemClicks.push(saleItems[i].clicks)

  };

  let itemViews = [];
  for (let i = 0; i < saleItems.length; i++) {
    itemViews.push(saleItems[i].views)

  };
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: itemNames,
      datasets: [{
        label: '# of Views',
        data: itemViews,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },
      {
        label: '# of Clicks',
        data: itemClicks,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function storeItem() {
  let storedItems = JSON.stringify(saleItems);
  localStorage.setItem('items', storedItems)
}
function getStoreItem() {
  let potentionalItems = localStorage.getItem('items')
  if (potentionalItems) {
    let restoredItems = JSON.parse(potentionalItems);
    console.log(restoredItems);
    for (let item of restoredItems) {
      let name = item.name
      let src = item.src
      let newItem = new Item(name, src);
      newItem.views = item.views
      newItem.clicks = item.clicks


      console.log(newItem);
    }
  }


}

getStoreItem();
renderCatalog();
myCatalog.addEventListener('click', handleClick);


// renderCatalog();
// myButton.addEventListener('click', renderResults);