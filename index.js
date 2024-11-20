fetch('https://climate-api.open-meteo.com/v1/climate?latitude=34.0522&longitude=-118.2437&start_date=1950-01-01&end_date=2050-12-31&models=CMCC_CM2_VHR4,FGOALS_f3_H,HiRAM_SIT_HR,MRI_AGCM3_2_S,EC_Earth3P_HR,MPI_ESM1_2_XR,NICAM16_8S&daily=temperature_2m_max')
  .then(response => response.json())
  .then(data => {
    // Access the temperature data from the response
    const temperatureData = data.daily.temperature_2m_max;

    // Display the data on the webpage (e.g., in a table or chart)
    const table = document.getElementById('climate-data');
    temperatureData.forEach(temperature => {
      const row = document.createElement('tr');
      const dateCell = document.createElement('td');
      const tempCell = document.createElement('td');
      dateCell.textContent = temperature.time;
      tempCell.textContent = temperature.temperature_2m_max;
      row.appendChild(dateCell);
      row.appendChild(tempCell);
      table.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });