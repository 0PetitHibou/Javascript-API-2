import { myData} from "/fetch.js";
const data = await myData();
let newArray = [];
newArray.push(data);





// function colorChange() {
//     const toggleColor = document.querySelector("h1");
//     return toggleColor.style.color = "red";
// }

// function addTitle(){
    
//     const title = document.querySelector(".container");
//     const h1 = document.createElement("h1");
//     title.appendChild(h1);
//     h1.textContent = "Coucou";
// }

//-------------------------------------------------------------
// tableau par json

  // const container = document.querySelector(".containerJson")
  // fetch('/data.json') //on récupère les données
    
  //   .then( res => res.json()) //la réponse arrive en .json et est convertis en js
  //   .then( data => {
  //     data.forEach( post => { //forEach permet de lire chaque objets
  //       container.insertAdjacentHTML('beforeend' , `<li>${post.name} , ${post.type}</li>`) //post => ... le met en tableau d'objet
  //     })
  //   })

//-------------------------------------------------------------

export async function display() {
  
  const text = document.querySelector(".table");
  newArray[0].forEach(element => {
    let div = document.createElement("div");
    
    div.innerHTML +=`
      <div>
        <p>${element.title}</p>
        <p>${element.manufacturer}</p>
        <p>${element.typ}</p>
        <p>${element.speed} mph</p>
        <p>${element.price} $</p>
      </div>
    `;

    let btn = document.createElement("button")
    let btn2 = document.createElement("button")

    btn.onclick = async () => {
      try {
        const response = await fetch(`http://localhost:8080/cars/${element.id}` , {method : 'DELETE'}); //wait for the data to arrive
        const output = await response.text();
        location.reload();
        return output;
      } catch(error) {
        console.log(error);
      }
    }

    btn.innerText = "DELETE";
    btn2.innerText = "EDIT";

    div.appendChild(btn);
    div.appendChild(btn2);

    btn2.onclick = () => { 
      editCar() ; 
      let btn = document.querySelector('#editBtn');
      btn.onclick = () => carSubmit(element.id);
    }

    text.appendChild(div);

  });

}

// export async function edit() {
//   const textEdit = document.querySelector(".table");
//   textEdit.appendChild(div);
//   let btnEdit = document.createElement("button");
//   btnEdit.onclick = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/${element.id}` , {method : 'PUT'});
//       const output = await response.json();
//       return output;
//     } catch(error) {
//       console.log(error);
//     }
//   }
//   btnEdit.innerText = "EDIT"
//   div.appendChild(btnEdit);


// }

export async function sorting() {
    data.sort((a , b) => b.topSpeed - a.topSpeed);
    let div = document.querySelector(".fast");
    div.innerHTML =`<p> La voiture la plus rapide est la ${data[0].title}, elle peut monter jusqu'a ${data[0].speed}</p>`;
}


// ----------------------------------------------------------------------------------DELETE
// export async function displayName() {

//   // let formData = document.querySelector('.carForm').value;
//   let formName = document.querySelector('#cName').value;
//   let formManufacturer = document.querySelector('#cManufacturer').value;
//   let formType = document.querySelector('#cType').value;
//   let formSpeed = document.querySelector('#cSpeed').value;
//   let formPrice = document.querySelector('#cPrice').value;
//   console.log(formName, formManufacturer, formType, formSpeed, formPrice);
// }
 
export const getValue = id => document.querySelector(id).value;
export async function displayName() {
  const [title, manufacturer, typ, price, speed] = ['#cName' , '#cManufacturer' , '#cType' , '#cSpeed' , '#cPrice'].map(getValue);
  const data = { title, manufacturer, typ, speed, price };
  sendData(data);
  
}

export function sendData(data) {
  fetch("http://localhost:8080/cars", {
    method : "POST",
    headers : {
      "content-type" : "application/json",
    },
    body: JSON.stringify(data),
  })
}
// ----------------------------------------------------------------------------------EDIT


export function editCar() {
  document.querySelector('.editForm').style.display = 'block';
}


export function carSubmit(id){
  let title = document.querySelector('#eName').value;
  let manufacturer = document.querySelector('#eManufacturer').value;
  let typ = document.querySelector('#eType').value;
  let price = document.querySelector('#eSpeed').value;
  let speed = document.querySelector('#ePrice').value;


  const data = {title ,manufacturer ,typ ,price ,speed};
  
  editData(data, id);
  // location.reload();
}

export function editData(data, id) {

  fetch(`http://localhost:8080/cars/${id}`, { //requête 
    method : "PUT", //liens vers app.js (endpoint)
    headers : {
      "content-type" : "application/json",
    },
    body: JSON.stringify(data),
  })
}


// ----------------------------------------------------------------------------------SEARCH


export async function search() {
  let search = document.querySelector("#search").value;   
     const text = document.querySelector(".table");

  text.innerHTML = " ";

  data.forEach(element => {
    let carTitle = element.title ;
    search = search.replace(/\s+/g, '').toLowerCase();
    carTitle = carTitle.replace(/\s+/g, '').toLowerCase();

    if(search === carTitle) {
      
      text.innerHTML +=
        `<div>
          <p>${element.title}</p>
          <p>${element.manufacturer}</p>
          <p>${element.typ}</p>
          <p>${element.speed} mph</p>
          <p>${element.price} $</p>
        </div>`;

    }
  })
}



// window.colorChange = colorChange;
// window.addTitle = addTitle;
window.display = display;
window.sorting = sorting;
window.displayName = displayName;
window.carSubmit = carSubmit;
window.search = search;

display();