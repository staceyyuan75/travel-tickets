let data = [];
const list = document.querySelector(".ticketCard-area");
const resultText = document.querySelector("#searchResult-text");

function renderC3() {
  let areaObj = {};
  data.forEach(function (item) {
    if (areaObj[item.area] == undefined) {
      areaObj[item.area] = 1;
    } else {
      areaObj[item.area]++;
    }
  });

  let newData = [];
  Object.keys(areaObj).forEach(function (area) {
    let ary = [];
    ary.push(area);
    ary.push(areaObj[area]);
    newData.push(ary);
  });

  let chart = c3.generate({
    bindto: "#chart", // HTML 元素綁定
    data: {
      columns: newData,
      type: "donut", // 圖表種類
      colors: {
        高雄: "#E68618",
        台中: "#5151D3",
        台北: "#26BFC7"
      }
    },
    donut: {
      title: "套票地區比重",
      label: {
        show: false
      },
      width: 12
    }
  });
}

function renderHTML() {
  let str = "";
  let resultNum = data.length;
  data.forEach(item => {
    str += printCard(item);
  });
  list.innerHTML = str;
  printResultText(resultNum);
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

function init() {
  axios
    .get(
      "https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json"
    )
    .then(function (response) {
      data = response.data.data;
      renderC3();
      renderHTML();
    })
    .catch(function (error) {
      console.log(error);
    });
}

init();
