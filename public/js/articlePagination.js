{
    /**
     * fill the table
     * @param {*} root 
     */
    var page = 1;
    var url;

    const root = document.getElementById("article-affichage");
        fillTable(root,"http://localhost:3001/articles?page=1&limit=10");
        

    async function fillTable(root,url){
        var htmlTemp=``;
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
        for(article of data){
            var date=new Date(article.createdAt).toDateString()
            const user =await( await fetch(`http://localhost:3001/users/${article.UserId}`) ).json();
            htmlTemp += `
            <div class="post-preview">
                <a href="/articles/${article.id}">
                    <h2 class="post-title">
                        ${article.title}
                    </h2>
                </a>
            <p class="post-meta">Posted by
            <a href="#">${ user.username }</a>
                on ${ date } <br>
                <B>Tags : </B>
            `
        const tags =await( await fetch(`http://localhost:3001/articles/${article.id}/tags`) ).json();  
            //boucle 2 :
            for(tag of tags){
                htmlTemp += `&rarr;${tag.name}`;
            }
                
            //fin boucle 2/
            htmlTemp += ` </p>
        </div>
        <hr>
        `;
            
        }
            root.innerHTML=htmlTemp;
    }

        
    function previousPage(){
        page = parseInt(page)-1;
        url = `http://localhost:3001/articles?page=${page}&limit=10`;
        console.log(`url :::: ${url}`);
        fillTable(root,url);
    }
    function nextPage(){
        page = parseInt(page)+1;
        url = `http://localhost:3001/articles?page=${page}&limit=10`;
        console.log(`url :::: ${url}`);
        fillTable(root,url);
    }
}