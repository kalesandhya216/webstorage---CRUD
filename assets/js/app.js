
let cl = console.log;

// CRUD >> 
// Create
// Read
// Update
// Delete

let studentForm = document.getElementById("studentForm");
let fname = document.getElementById("fname");
let lname = document.getElementById("lname");
let email = document.getElementById("email");
let contact = document.getElementById("contact");
let tbody = document.getElementById("stdInfo");
let submitBtn = document.getElementById("submitBtn");
let updateBtn = document.getElementById("updateBtn");


let stdarr = [];

cl(stdarr);
// templating(stdarr);
if(getDataFromLS()){
    stdarr = getDataFromLS();
    templating(stdarr);
}

function getDataFromLS(){
    return JSON.parse(localStorage.getItem("studentInfo"));
}

function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  


const onSubmitHandler = (e) => {
    e.preventDefault();
    cl(e);
    let obj = {
        FirstName : fname.value,
        LastName : lname.value,
        Email : email.value,
        Contact : contact.value,
        id :  uuidv4()         
    }

    cl(obj);
    stdarr.push(obj);
    cl(stdarr);
    localStorage.setItem("studentInfo", JSON.stringify(stdarr));
    studentForm.reset();
    templating(stdarr);
}



function templating(arr){
    let result = "";

arr.forEach((element, i) => {
    result += `<tr>
                 <td>${i + 1}</td>
                 <td>${element.FirstName}</td>  
                 <td>${element.LastName}</td>  
                 <td>${element.Email}</td>  
                 <td>${element.Contact}</td>
                 <td><button class="btn btn-success" data-id="${element.id}" onclick="onEditHandler(this)">Edit</button></td>
                 <td><button class="btn btn-danger" data-id="${element.id}" onclick="onDeleteHandler(this)">Delete</button></td>  
             </tr>`;
})

tbody.innerHTML = result;

}

const onEditHandler = (ele) => {
//    cl("edit", ele);
    let getId = ele.dataset.id;
    localStorage.setItem("setId", getId)
    let getLocalData = getDataFromLS();
    cl(getLocalData);
    let getObj = getLocalData.filter((e) => e.id === getId);
    // cl(getObj);
    fname.value = getObj[0].FirstName;
    lname.value = getObj[0].LastName;
    email.value = getObj[0].Email;
    contact.value = getObj[0].Contact;
    updateBtn.classList.remove("d-none");
    submitBtn.classList.add("d-none");
}

const onUpdateHandler = () => {
    cl("update");
    let getId = localStorage.getItem("setId");
    cl(getId);
    let getLocalData = getDataFromLS();
    getLocalData.forEach(element => {
        if(element.id === getId){
            element.FirstName = fname.value;
            element.LastName = lname.value;
            element.email = email.value;
            element.contact = contact.value;
        }
    })
    localStorage.setItem("studentInfo", JSON.stringify(getLocalData));
    templating(getLocalData);
    studentForm.reset();
    updateBtn.classList.add("d-none");
    submitBtn.classList.remove("d-none");
}

const onDeleteHandler = (ele) => {
    cl("Delete", ele);
    let getId = ele.getAttribute("data-id");
    cl(getId);
    let getLocalData = getDataFromLS();
    let newLocalData = getLocalData.filter(element => element.id != getId);
    templating(newLocalData);
    localStorage.setItem("studentInfo", JSON.stringify(newLocalData));
}



studentForm.addEventListener("submit", onSubmitHandler);
updateBtn.addEventListener("click", onUpdateHandler);


// stdarr = JSON.parse(localStorage.getItem("studentInfo"));

