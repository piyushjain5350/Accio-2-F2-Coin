
const tableBody=document.getElementsByClassName("table-body")[0];
const searchBar=document.getElementById("search-input");
const sortByMkt=document.getElementById("sort-by-mkt-cap");
const sortByPer=document.getElementById("sort-by-percentage");


let coinData=[];


// Fetch data using .then and render the table
// fetchButton.addEventListener('click', () => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    .then(response => response.json())
    .then(data => {
      coinData = data.map(item => ({
        logo: item.image,
        name: item.name,
        id: item.symbol,
        currentPrice: item.current_price,
        marketCap: item.market_cap,
        percentageChange24h: item.market_cap_change_percentage_24h,
        volume:item.total_volume
      }));
      renderTable(coinData);
    })
    .catch(error => {
      console.error('Error:', error);
    });
// });

// Fetch data using async/await and render the table
async function fetchData() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    const data = await response.json();

    coinData = data.map(item => ({
      logo: item.image,
      name: item.name,
      id: item.symbol,
      currentPrice: item.current_price,
      marketCap: item.market_cap,
      percentageChange24h: item.market_cap_change_percentage_24h,
      volume:item.total_volume
    }));
    renderTable(coinData);
  } catch (error) {
    console.error('Error:', error);
  }
}

function renderTable(data){
    
    tableBody.innerHTML='';

    data.forEach(item=>{
        const row=document.createElement("tr");

        //Fisrt col
        const nameCol=document.createElement("td");
        nameCol.classList.add("name-container");

        const logo=document.createElement("img");
        logo.src=item.logo;
        logo.alt=item.name;
        logo.classList.add("image-section");

        const name=document.createElement("p");
        name.innerText=item.name;

        nameCol.appendChild(logo);
        nameCol.appendChild(name);

        row.appendChild(nameCol);

        //second col
        const idCell = document.createElement('td');
        idCell.textContent = item.id.toUpperCase();
        row.appendChild(idCell);

        //third col
        const currentPriceCell = document.createElement('td');
        currentPriceCell.textContent = '$'+item.currentPrice.toLocaleString();
        row.appendChild(currentPriceCell);

        //forth row
        const volume=document.createElement("td");
        volume.innerText=item.volume.toLocaleString();
        row.appendChild(volume);
        //fifth row
        const percentageChange=document.createElement('td');
        percentageChange.innerText=item.percentageChange24h.toFixed(2)+'%';

        if(item.percentageChange24h>0){
            percentageChange.style.color="green";
        }else{
            percentageChange.style.color="red";
        }
        row.appendChild(percentageChange);

        //sixth col
        const market_cap=document.createElement("td");
        market_cap.innerText="Mkt Cap: $"+item.marketCap.toLocaleString();
        row.appendChild(market_cap);

        tableBody.appendChild(row);

    })
}

//Filter zone

//Search
searchBar.addEventListener('input', () => {
    const searchValue = searchBar.value.toLowerCase();
    const filteredData = coinData.filter(coin => coin.name.toLowerCase().includes(searchValue));
    renderTable(filteredData);
  });

//sort by mkt cap
sortByMkt.addEventListener('click', () => {
    const sortedData = [...coinData].sort((a, b) => a.marketCap - b.marketCap);
    renderTable(sortedData);
  });

//sort by percentage
sortByPer.addEventListener('click', () => {
    const sortedData = [...coinData].sort((a, b) => a.percentageChange24h - b.percentageChange24h);
    renderTable(sortedData);
  });



// fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
//     .then(response=>response.json())
//     .then(data =>showInfo(data));
    
//     function showInfo(data){
//         console.log(data);
        
//         data.map((e)=>{
//             const tableContainer=document.getElementsByClassName("table-body")[0];
//             const tr=document.createElement("tr");
//             tr.innerHTML=`<td class="name-container"><img class="image-section" src="${e.image}" alt="${e.symbol}"> ${e.name}</td>
//             <td>${e.symbol}</td>
//             <td>&#36;${e.current_price}</td>
//             <td>${e.total_supply}</td>
//             <td class="percentage">${e.market_cap_change_percentage_24h}</td>
//             <td>Mkt Cap: &#36;${e.market_cap}</td>
//             `
//             tableContainer.appendChild(tr);
//         })
//     }

//     const percentage=document.getElementsByClassName("percentage");
    
    // if(percentage.value>0){
    //     percentage.style.color='green';
    // }else{
    //     percentage.style.color='red';
    // }
   