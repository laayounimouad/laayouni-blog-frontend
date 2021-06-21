

var addForm ;
var modifyForm ;


function add(){
    const form = document.querySelector(".ajout");
    form.innerHTML=`
    <div class="container">
<div class="row">
<div class="col-md-8 offset-md-2">
  <form action="http://localhost:3001/users" method="POST" id="form-user-add">
    <div class="control-group">
      <div class="form-group floating-label-form-group controls">
        <label>Username</label>
        <input type="text" name="username" placeholder="Username" class="form-control" required>
      </div>
    </div>
    <div class="control-group">
      <div class="form-group floating-label-form-group controls">
        <label>Email</label>
        <input type="email" name="email" placeholder="Email" class="form-control" required>
      </div>
    </div>
    <div class="control-group">
      <div class="form-group floating-label-form-group controls">
        <label>Password</label>
        <input type="password" name="password" placeholder="Password" class="form-control" required>
      </div>
    </div>
    <div class="control-group">
        <div class="form-group floating-label-form-group controls">
          <label class="form-label">Role</label>
          <select id="role" name="role" class="form-select" required>
          <option value="" selected disabled hidden>Choose here</option>
            <option value="admin">admin</option>
            <option value="author">author</option>
            <option value="guest">guest</option>
          </select>
        </div>
      </div>
      
    <div class="form-group my-4 text-center">
      <button type="submit" onclick="refresh(1)" class="btn btn-primary">Enregistrer</button>
      
    </div>
  </form>
</div>
</div>
</div>
    `

    addForm = document.getElementById("form-user-add");
    addForm.addEventListener("submit", handleFormSubmit);
}
async function modify(id){
    const response =await( await fetch(`http://localhost:3001/users/${id}`) ).json();

    const form = document.querySelector(".ajout");
    var admin =""
    var author=""
    var guest=""
    if(response.role == "admin") admin = "selected"
    else admin =""
    if(response.role == "author") author = "selected"
    else author =""
    if(response.role == "guest") guest = "selected"
    else guest =""
    
    form.innerHTML=`
    <div class="container">
<div class="row">
<div class="col-md-8 offset-md-2">
  <form action="http://localhost:3001/users" method="PUT" id="form-user-modify">
 
  <div class="control-group">
  <div class="form-group floating-label-form-group controls">
    <label>id </label>
    <input  name="id" value="${id}" readonly>
  </div>
</div>
    <div class="control-group">
      <div class="form-group floating-label-form-group controls">
        <label>Username</label>
        <input type="text" name="username" placeholder="Username" class="form-control" value="${response.username}" required >
      </div>
    </div>
    <div class="control-group">
      <div class="form-group floating-label-form-group controls">
        <label>Email</label>
        <input type="email" name="email" placeholder="Email" class="form-control" value="${response.email}">
      </div>
    </div>
    <div class="control-group">
      <div class="form-group floating-label-form-group controls">
        <label>Password</label>
        <input type="password" name="password" placeholder="Password" class="form-control" value="${response.password}">
      </div>
    </div>
    <div class="control-group">
        <div class="form-group floating-label-form-group controls">
          <label class="form-label">Role</label>
          <select id="role" name="role" class="form-select" >
            <option value="admin" ${admin}>admin</option>
            <option value="author" ${author}>author</option>
            <option value="guest" ${guest}>guest</option>
          </select>
        </div>
      </div>
      
    <div class="form-group my-4 text-center">
      <button type="submit"  class="btn btn-primary">Enregistrer</button>
      
    </div>
  </form>
</div>
</div>
</div>
    `
    modifyForm = document.getElementById("form-user-modify");
    modifyForm.addEventListener("submit", handleFormSubmit);
}
async function supprimer(id){
    var data = JSON.stringify({id:id})
    const form = document.querySelector(".ajout");
    await fetch("http://localhost:3001/users", {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          "Accept": "application/json"
        },
        body: data
      });
      form.innerHTML = `<h3 style="margin-left: 40%;"> utilisateur a été supprimer</h3`

}
async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;

    const url = form.action;
    const method = form.method

    try {
    
        const formData = new FormData(form);
        const responseData = await postFormDataAsJson({ url, formData, method });
        console.log(responseData)
        var forme = document.querySelector(".ajout");
  forme.innerHTML = `<h3 style="margin-left: 40%;"> the user has been succesfully added/modified</h3`

    } catch (error) {
        console.error(error);
        var forme = document.querySelector(".ajout");
  forme.innerHTML = `<h3 style="margin-left: 40%;"> !!ERROR!! verify the informations</h3`+form.innerHTML
    }
    
}
 
async function postFormDataAsJson({ url, formData, method }) {
    if(method == 'get') method = 'PUT'
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);
    const fetchOptions = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: formDataJsonString,
    };
    var response = await fetch(url, fetchOptions);
/*
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
*/

    const form = document.querySelector(".ajout");
    if(method == "POST") form.innerHTML = `<h3 style="margin-left: 40%;"> utilisateur ajouté avec succés</h3`
    if(method == "PUT") form.innerHTML = `<h3 style="margin-left: 40%;"> utilisateur modifié avec succés</h3`

    return response
}