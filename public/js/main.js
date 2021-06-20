{
    /**
     * fill the table
     * @param {*} root 
     */
    var page = 1;
    var url;
    async function fillTable(root,url){
        const table = root.querySelector('.table-affichage_table');
        
        const response =await( await fetch(url) ).json();
        const data =  response.results;

        if(response.next){
            document.getElementById('next').setAttribute("onclick", "nextPage()");
            document.getElementById('next').classList.remove("disabled");
        }
        else{
            document.getElementById('next').removeAttribute("onclick");
            document.getElementById('next').classList.add("disabled");
        }

        if(response.previous){
            document.getElementById('previous').setAttribute("onclick", "previousPage()");
            document.getElementById('previous').classList.remove("disabled");
        }
        else{
            document.getElementById('previous').removeAttribute("onclick");
            document.getElementById('previous').classList.add("disabled");
        }

        table.innerHTML = `
        <thead>
        <tr></tr>
        </thead>
        <tbody>
        </tbody> 
    `;
        
       var col = [];     
            for (var key in data[0]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                    table.querySelector(`thead tr`).insertAdjacentHTML("beforeend",`<th>${key}</th>`);
                }
            }
            table.querySelector(`thead tr`).insertAdjacentHTML("beforeend",`<th>actions</th>`);
      
            for (var i = 0; i < data.length; i++) {

                tr = table.insertRow(-1);
    
                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = data[i][col[j]];    
                }
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML =
                ` 
                <button type="button" onclick="modify(${data[i][col[0]]});" class="btn btn-success">Modify</button>
                <button type="button" onclick="supprimer(${data[i][col[0]]});" class="btn btn-danger">Delete</button>
                `
            }
    }

        const root = document.querySelector(".table-affichage[data-url]");
        const table =document.createElement("table");
        url = root.dataset.url;
        table.classList.add('table-affichage_table');
        table.innerHTML = `
            <thead>
            <tr></tr>
            </thead>
            <tbody>
            <tr>
            <td>Loading</td>
            </tr>
            </tbody> 
        `;
        root.append(table);
        fillTable(root,url);

    function previousPage(){
        page = parseInt(page)-1;
        url = `http://localhost:3001/users?page=${page}&limit=10`;
        console.log(`url :::: ${url}`);
        fillTable(root,url);
    }
    function nextPage(){
        page = parseInt(page)+1;
        url = `http://localhost:3001/users?page=${page}&limit=10`;
        console.log(`url :::: ${url}`);
        fillTable(root,url);
    }
}