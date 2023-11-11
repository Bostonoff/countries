let searchText = "";
const countries = document.querySelector("#countries");
let countriesData = [];
const input = document.getElementById("input");

const loading = document.querySelector("#loading");

const infoModal = new bootstrap.Modal(document.getElementById("infoModal"), {
  keyboard: false,
});

const myBodyModal = document.getElementById("myBodyModal");
const getCountries = async (name) => {
  const res = await axios.get(
    name === "all"
      ? "https://restcountries.com/v3.1/all"
      : `https://restcountries.com/v3.1/region/${name}`
  );
  return res.data;
};

// Render Countrires
const renderCountries = () => {
  countries.innerHTML = "";
  // countries = loading;
  countriesData
    .filter((item) => {
      return item?.name?.common
        ?.toLowerCase()
        .includes(searchText.toLowerCase());
    })
    .slice(0, 10)
    .map((item) => {
      countries.innerHTML += ` <div class="col-md-6 col-lg-4">
      <div class="shadow rounded-3 h-100 text-center"  style = "background: radial-gradient(#efe2e2, transparent);"
          >
              <img class="images rounded-3 mt-3" src="${
                item.flags.png || item.flags.svg
              }" alt="sos!" style = "width:300px; height:150px; object-fit:cover;" />
              <div class="text-center">
              <p class="fw-bold py-3 text-primary">${item.name.common}</p>
             
              <div class="d-flex align-items-center gap-4 justify-content-end py-2 pe-3 mb-2">
              <button class="border-0 rounded-2"  style = "background:#59a5fc;" onclick = "showInfoModal('${
                item.name.official
              }')">
                <i class="fa-solid fa-eye "></i>
              </button>
              <button class="border-0 rounded-2" onclick ="putModal('${
                item.name.common
              }')" style = "background:#3eff47;">
              <i class="fa-solid fa-pencil"></i>
            </button>
            </div>
              `;
    });
};

// Set Countries
const setCountries = async (name) => {
  try {
    const data = await getCountries(name);
    countriesData = data;
    renderCountries();
  } catch (error) {
    console.log(error);
  }
};
// Get Countries
const getCountry = async (name) =>
  (await axios.get(`https://restcountries.com/v3.1/name/${name}`)).data;
const showInfoModal = async (name) => {
  const country = (await getCountry(name))[0];
  infoModal.show();
  const addImg = document.getElementById("imgAdd");
  // document.querySelector("#infoModal .modal-title").innerHTML = name;
  addImg.innerHTML = ` <h1 class="modal-title fs-5" id="exampleModalLabel">${name}</h1> 
  `;
  myBodyModal.innerHTML = `<div class="row  gap-2">
  <div class = "col-md-5 text-center">
  <img class="modal_images rounded-3 object-fit-cover w-100" style = "width:190px;" src="${
    country.flags.png
  }" alt="" />
  <p class = "text-primary m-0 pt-2">Coat of arms</p>
  <img src="${
    country.coatOfArms.png || country.coatOfArms.svg
  }" alt="sos!" class="title-img" style = "width:200px" />
  </div>
 
  <div class = "col-md-3">
  <p class = "text-center fw-bold m-0">Borders: <p class="text-center text-primary m-0" style = "line-break:anywhere">${
    country.borders
  }</p></p> 
  <p class = "text-center fw-bold m-0">Timezones: <p class="text-center text-primary m-0">${
    country.timezones
  }</p></p>
  <p class = "text-center fw-bold m-0">Population: <p class="text-center text-primary m-0">${
    country.population
  }</p></p>
  <p class = "text-center fw-bold m-0">Car Signs: <p class="text-center text-primary m-0">${
    country.car.signs
  }</p></p>
  <p class = "text-center fw-bold m-0">Cars drive: <p class="text-center text-primary m-0">${
    country.car.side
  }</p></p>
  <p class = "text-center fw-bold m-0">Top-Level Domain: <p class="text-center text-primary m-0">${
    country.tld
  }</p></p>
  </div>
  
  <div class = "col-md-3">
          <p class="fw-bold">Continents: <span class="text-primary">${
            country.region
          }</span></p>
  <p class = "fw-bold">Capital: <span class="text-primary">${
    country.capital
  }</span></p>
  <p class = "fw-bold">Languages : <span class = "text-primary">${Object.values(
    country.languages
  ).join(", ")}</span></p> 
  <p class="fw-bold" >Maps: <a href="${
    country.maps.googleMaps
  }" class="fw-bold text-primary text-decoration-none"target="_blank">Maps</a></p>
  <p class="fw-bold">Region: <span class = "text-primary">${
    country.region
  }</span></p>
  <p class="fw-bold">Subregion: <span  class = "text-primary">${
    country.subregion
  }</span></p>
  <p class="fw-bold">Start of Week: <span  class = "text-primary">${
    country.startOfWeek
  }</span></p>
  <p class="fw-bold">FIFA: <span class = "text-primary">${
    country.fifa
  }</span></p>
  <p class="fw-bold">Independent: <span class = "text-primary">${
    country.independent
  }</span></p>
  
  </div>
  </div>`;
};

// Searching
const search = (e) => {
  searchText = e.target.value;
  renderCountries();
  input.value = "";
};

// Init onload to body
const init = () => {
  setCountries("all");
  document
    .querySelector("input[placeholder = 'search']")
    .addEventListener("change", search);
};

const postModalShow = new bootstrap.Modal(
  document.getElementById("postModal"),
  {
    keyboard: false,
  }
);
const postInput = () => {
  postModalShow.show();
};

const addModalInputs = document.getElementById("addModal");
addModalInputs.innerHTML = `<div class = " row g-3">
<div class="d-flex gap-4 g-3" id = "inputsValue">
<input
  type="text"
  class="form-control inputClear"
  placeholder="Name of Country"
  id="inputPost1"/>
<input
  type="text"
  class="form-control inputClear"
  placeholder="Capital Of Country"id="inputPost2"
/>
</div>
<div class="d-flex gap-4">
<input
  type="number"
  class="form-control inputClear"
  placeholder="Population"
  id="inputPost3"/>
<input type="text" class="form-control inputClear" placeholder="FIFA" id="inputPost4"/>

</div>
<div class="d-flex gap-4">
<input
  type="text"
  class="form-control inputClear"
  placeholder="Region"
  id="inputPost6"/>
<input type="text" class="form-control inputClear" placeholder="Borders" id="inputPost7"/>
</div>
<div class="text-center">
<p class = "text-primary py-2 p m-0">Choose a flag image:</p>
<input
  type="file"
  class="form-control inputClear"
  id="inputPost5"/>
</div></div>`;

// edit section like Put-Data
const editModal = new bootstrap.Modal(document.getElementById("editModal"), {
  keyboard: false,
});
const bodyModalEdit = document.getElementById("MyModal");
const putModal = async (item) => {
  try {
    const respons = await axios.get(
      `https://restcountries.com/v3.1/name/${item}`
    );
    const editHead = document.getElementById("editHead");
    editHead.innerHTML = `<h4>Edit This Country: ${
      respons.data[0].name.common
    } </h4>
    <span><img src="${
      respons.data[0].flags.png || respons.data[1].flags.svg
    }" alt="so!"class = "rounded-2"  style = "width:100px"  /></span>`;
    bodyModalEdit.className = "text-center";
    bodyModalEdit.innerHTML = `  
    <img src="${respons.data[0].coatOfArms.png}" alt="sos!" style = "width:50px" />
    <h3>${respons.data[0].name.official}</h3>
 `;

    document.querySelector("#inp1").value = respons.data[0].name.official;
    document.querySelector("#inp2").value = respons.data[0].capital;
    document.querySelector("#inp3").value = respons.data[0].population;
    document.querySelector("#inp4").value = respons.data[0].region;
    document.querySelector("#inp5").value = respons.data[0].fifa;
    document.querySelector("#inp6").value = respons.data[0].subregion;
    document.querySelector("#inp7").value = respons.data[0].tld;
    document.querySelector("#inp8").value = respons.data[0].borders;
  } catch (error) {
    console.log("Katta Xato" + error);
    console.log(bodyModalEdit);
  }
  editModal.show();
};
const savePutData = () => {
  const formData = {
    nameOfCountry: document.querySelector("#inp1").value,
    nameOfCapital: document.querySelector("#inp2").value,
    population: document.querySelector("#inp3").value,
    region: document.querySelector("#inp4").value,
    fifa: document.querySelector("#inp5").value,
    subregion: document.querySelector("#inp6").value,
    tld: document.querySelector("#inp7").value,
    borders: document.querySelector("#inp8").value,
  };
  axios
    .put("https://restcountries.com/v3.1/create", formData)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log("oshibka : " + error);
    });

  editModal.hide();
};
const editHead = document.getElementById("editHeader");

// local Storage
const localModal = new bootstrap.Modal(
  document.getElementById("localStorage"),
  {
    keyboard: false,
  }
);
const history = () => {
  localModal.show();
};

// Save change when you click Add button and added to country like POST DATA
const saveChanges = () => {
  const formData = {
    nameOfCountry: document.querySelector("#inputPost1").value,
    nameOfCapital: document.querySelector("#inputPost2").value,
    population: document.querySelector("#inputPost3").value,
    fifa: document.querySelector("#inputPost4").value,
    file: document.querySelector("#inputPost5").value,
    region: document.querySelector("#inputPost6").value,
    border: document.querySelector("#inputPost7").value,
  };

  // Create object the form data
  const countryData = {
    formData: formData,
    modalAnswer: "some answer",
  };

  // Save the country data to local storage
  const countryArray = JSON.parse(localStorage.getItem("countryData")) || [];
  countryArray.push(countryData);
  const array = [...countryArray];
  localStorage.setItem(key, JSON.stringify(array));
  localStorage.setItem("countryData", JSON.stringify(countryArray));

  // Call renderList to update the table with the save data
  renderList();

  axios
    .post("https://restcountries.com/v3.1/create", formData)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log("oshibka : " + error);
      const inputClear = document.getElementsByClassName("inputClear");
      inputClear.value = "";
    });
  postModalShow.hide();
};

// local storage final code
const key = "history";
const tbody = document.getElementById("tbody");
const renderList = () => {
  const countryArray = JSON.parse(localStorage.getItem("countryData")) || [];

  // Render the table with the save data
  tbody.innerHTML = "";
  let count = 1;
  for (let i = 0; i < countryArray.length; i++) {
    const row = countryArray[i];
    tbody.innerHTML = `<tr>
    <td class = "text-center">${count++}</td>
      <td class = "text-center">${row.formData.nameOfCountry}</td>
      <td class = "text-center">${row.formData.nameOfCapital}</td>
      <td class = "text-center">${row.formData.population}</td>
      <td class = "text-center">${row.formData.fifa}</td>
      <td class = "text-center">${row.formData.file}</td>
      <td lass = "text-center">${row.formData.region}</td>
      <td lass = "text-center">${row.formData.border}</td>
    </tr>`;
  }
};
