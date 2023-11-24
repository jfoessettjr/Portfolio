document.addEventListener("DOMContentLoaded", function () {
    let page = 1; // Initial page
    const perPage = 10; // Number of items per page
  
    // Initial data load
    fetchData(page, perPage);
  
    // Load more button click event listener
    document.getElementById("loadMoreBtn").addEventListener("click", function () {
      page++;
      fetchData(page, perPage);
    });
  
    // Search button click event listener
    document.getElementById("searchBtn").addEventListener("click", function () {
      const searchInput = document.getElementById("searchInput").value;
      if (searchInput.trim() !== "") {
        // If the search input is not empty, fetch data based on the search term
        searchBreweries(searchInput);
      } else {
        // If the search input is empty, reload the initial data
        page = 1;
        fetchData(page, perPage);
      }
    });
  });
  
  async function fetchData(page, perPage) {
    try {
      const response = await fetch(`https://api.openbrewerydb.org/v1/breweries?page=${page}&per_page=${perPage}`);
      const data = await response.json();
      displayData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  async function searchBreweries(searchTerm) {
    try {
      const response = await fetch(`https://api.openbrewerydb.org/v1/breweries/search?query=${searchTerm}`);
      const data = await response.json();
      displayData(data);
    } catch (error) {
      console.error("Error fetching search data:", error);
    }
  }
  
  function displayData(breweries) {
    const tableBody = document.getElementById("breweryTableBody");
    // Clear existing data in the table
    tableBody.innerHTML = "";
  
    breweries.forEach(brewery => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${brewery.name}</td>
        <td>${brewery.brewery_type}</td>
        <td>${brewery.city}</td>
        <td>${brewery.state}</td>
        <td>${brewery.country}</td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  