const valeurCellule = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;    
const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
)(valeurCellule(asc ? a : b, idx), valeurCellule(asc ? b : a, idx));

window.onload = function(){
    //Ajout des ecouteurs à chaque element th du tableau
    let ecouteurs = document.querySelectorAll('th').forEach(th => th.addEventListener('click',function(){sortColumnH(th);},false));
    colorationNote();
}

function sortColumnH(th)
{
    //On récupère la table
    const table = th.closest('table');  
    //On supprime la ligne de header qui est aussi constitue de td grâce à slice
    var delF = [].slice.call(table.querySelectorAll('tr:nth-child(n+1)'),1)
    let ligneParente = Array.from(th.parentNode.children).indexOf(th)
    //On compare la ligne parente pour effectuer le tri
    let tri = Array.from(delF).sort(comparer(ligneParente, this.asc = !this.asc))
    //Puis on pousse le fils à sa place
    tri.forEach(tr => table.appendChild(tr) );
}

function colorationNote()
{
    //Parcourir les cellules et ajouter une des trois classes : vert orange ou rouge
    let tetes = document.querySelectorAll('th')
    let indexNoteS1
    for(var j = 0; j<tetes.length;j++)
    {
        //On obtient l'index de la colonne contenant les notes
        if(tetes[j].innerHTML=="Note S1")
        {
            indexNoteS1=j
        }
    }

    //Le tableau
    let tableau = document.getElementById('T-1');
    //Les lignes du tableau
    let lignes = [].slice.call(tableau.getElementsByTagName('tr'),1)

    for(var i=0; i<lignes.length; i++)
    {   
        //On stock la note de la ligne i pour savoir quel style appliquer
        let laNote = lignes[i].children[indexNoteS1]
        if(laNote.innerHTML<8)
        {
            //On modifie l'attribut class de cette case.
            //Le css ira donc lire la classe inf8 et mettra la couleur à rouge
            laNote.setAttribute("class","inf8")
        }else if(laNote.innerHTML>=8 && laNote.innerHTML<=10)
        {
            laNote.setAttribute("class","eightToTen")   
        }else if(laNote.innerHTML>10 && laNote.innerHTML<=12){
            laNote.setAttribute("class","tenToTwelve")
        }else{
            laNote.setAttribute("class","supTwelve")
        }
    }
}