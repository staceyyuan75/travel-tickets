let data = [];
const list = document.querySelector(".ticketCard-area");
const resultText = document.querySelector("#searchResult-text");

function renderHTML() {
  let str = "";
  let resultNum = data.length;
  data.forEach(item => {
    str += printCard(item);
  })
  list.innerHTML = str;
  resultText.textContent = printResultText(resultNum);
}

function printCard(item) {
  let content = `<li class="ticketCard">
  <div class="ticketCard-img">
    <a href="#">
      <img src="${item.imgUrl}" alt="">
    </a>
    <div class="ticketCard-region">${item.area}</div>
    <div class="ticketCard-rank">${item.rate}</div>
  </div>
  <div class="ticketCard-content">
    <div>
      <h3>
        <a href="#" class="ticketCard-name">${item.name}</a>
      </h3>
      <p class="ticketCard-description">
        ${item.description}
      </p>
    </div>
    <div class="ticketCard-info">
      <p class="ticketCard-num">
        <span><i class="fas fa-exclamation-circle"></i></span>
        剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
      </p>
      <p class="ticketCard-price">
        TWD <span id="ticketCard-price">$${item.price}</span>
      </p>
    </div>
  </div>
</li>`;

  return content;
}

function printResultText(num) {
  resultText.textContent = `本次搜尋共 ${num} 筆資料`;
}

axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
.then(function (response) {
  data = response.data.data;
  renderHTML();
})
