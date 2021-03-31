// DOM manipulations to get the date&currency inputs

const startInput = document.getElementById("start");
const endInput = document.getElementById("end");

const currencyInput = document.getElementById("currency");

//

let start;
let end;
let currency = currencyInput.value;

const baseUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";

// Add event listener to date&currency inputs

startInput.addEventListener("change", (event) => {
  start = event.target.value;
  getHistoricalData();
});

endInput.addEventListener("change", (event) => {
  end = event.target.value;
  getHistoricalData();
});

currencyInput.addEventListener("change", (event) => {
  currency = event.target.value;
  bitcoinPriceTracker();
});

// Function, that holds all the logic for choosing date

function getHistoricalData() {
  if (!end || !start) {
    return;
  }
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (endDate < startDate) {
    return `Go Home You're Drunk`;
  }
  // Axios gets data from external API link
  axios
    .get(`${baseUrl}?start=${start}&end=${end}&currency=${currency}`)
    .then((axiosResponse2) => {
      const labels = Object.keys(axiosResponse2.data.bpi);
      const data = Object.values(axiosResponse2.data.bpi);
      drawChart(labels, data);
    });
}

// axios
//   .get("http://api.coindesk.com/v1/bpi/historical/close.json")
//   .then((response) => {
//     console.log(response);
//   });

function bitcoinPriceTracker() {
  axios.get(`${baseUrl}?currency=${currency}`).then((axiosResponse) => {
    console.log("axiosResponse:", axiosResponse.data);
    const labels = Object.keys(axiosResponse.data.bpi);
    const data = Object.values(axiosResponse.data.bpi);
    drawChart(labels, data);
  });
}

// Function, that holds the drawing chart logic

function drawChart(labels, data) {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "Bitcoin Pricess",
          data,
          // data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
  });
}

bitcoinPriceTracker();
