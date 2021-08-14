// Global Variables
let saleItems = []; 
let myCatalog = document.querySelector('section')
let myButton = document.querySelector('section + div');
let image1 = document.querySelector('section  img:first-child');
let image2 = document.querySelector('section  img:nth-child(2)');
let image3 = document.querySelector('section  img:nth-child(2)');
let clicks = 0;
let clickssAllowed = 25;
// Functions
function item(name, fileLocation = 'jpg'){
    this.name = name
    this.src = `images/${name}.${fileLocation}`;
    this.views = 0;
    this.clicks = 0;
    saleItems.push(this);
}
function selectItem(){
    return Math.floor(Math.random() * saleItems.length);
}
function renderCatalog() {
    let rItem1 = selectItem();
    let rItem2 = selectItem();
    let rItem3 = selectItem();
   
    while (rItem1 === rItem2 || rItem3) {
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
function handleClick(e){
    if (e.target === myCatalog) {
        alert('Please click on an image');
      }

      clicks++;

      let clickItem = e.target.alt;
      console.log(clickItem);
      for (let i = 0; i < saleItems.length; i++) {
        if (clickItem === saleItems[i].name) {
          saleItemsArray[i].votes++;
          break;
        }
    }

renderItems();
if (clicks === clicksAllowed) {
    myButton.className = 'clicks-allowed';
    myContainer.removeEventListener('click', handleGoatClick);
  }
}
function renderResults() {
    let ul = document.querySelector('ul');
    for (let i = 0; i < saleItems.length; i++) {
      let li = document.createElement('li')
      li.textContent = `${saleItems[i].name} had ${saleItems[i].views} view and was clicked ${saleItems[i].clicks} times.`;
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
new item('cthulu')
new item('dog-duck')
new item('dragon')
new item('pen')
new item('pet-sweep')
new item('scissors')
new item('shark')
new item('sweep')
new item('tauntaun')
new item('unicorn')
new item('water-can')
new item('wine-glass')

  console.log(saleItems);
renderItems();

myCatalog.addEventListener('click', handleClick);
myButton.addEventListener('click', renderResults);