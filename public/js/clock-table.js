async function go() {
  let currentData = [];

  async function getTableData(url) {
    const res = await fetch(url, {
      mode: 'cors',
    });

    const data = await res.json();

    return data;
  }

  function createRow(item) {
    let row = `
      <div class="row">
      <div class="view">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
      class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd"
      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
      </svg>
      <p>View</p>
      </div>
      <div class="model">
      <p>${item.model}</p>
      </div>
      <div class="features">
      ${item.features.map((f) => `<p>${f}</p>`).join('')}
      </div>
      <div class="package">
      <p>${item.package}mm</p>
      </div>
      <div class="frequency">
      <p>${item.freq_lower} - ${item.freq_upper}MHz</p>
      </div>
      <div class="freq__stability">
      <p>±${item.freq_stability}ppm</p>
      </div>
      <div class="temp__range">
      <p>${item.temp_lower} to ${item.temp_upper}°C</p>
      </div>
      <div class="output">
      <p>${item.output}</p>
      </div>
      <div class="voltage">
      <p>${item.voltage}V</p>
      </div>
      <div class="image">
      <p>${item.image}</p>
      </div>
      <section class="expanded__row">
      <div>
      ${item.Load}
      </div>
      </section>
      </div>
      `;

    return row;
  }

  // set initial table data
  currentData = await getTableData(
    'http://localhost:7000/api/clock-oscillators'
  );

  const table = document.querySelector('.table__block .table');

  // create row for each item
  currentData.forEach((item) => {
    const row = createRow(item);
    table.innerHTML += row;
  });

  // set click event for each row to expand
  const views = document.querySelectorAll('.table__block .row .view');
  const expands = document.querySelectorAll('.table__block .expanded__row');

  views.forEach((view, i) => {
    view.addEventListener('click', () => {
      if (expands[i].style.display === 'block') {
        expands[i].style.display = 'none';
      } else {
        expands[i].style.display = 'block';
      }
    });
  });

  // set filter inputs
  const modelFilter = document.querySelector('.table__filters .model');
  currentData.forEach((item) => {
    modelFilter.innerHTML += `
      <input name="${item.model}" id="${item.model}" type="checkbox" />
    `;
  });
}
go();
