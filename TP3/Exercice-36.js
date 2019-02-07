const valeurCellule = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;
const comparer = (idx, asc) => (a, b) => ((v1, v2) =>
v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
)(valeurCellule(asc ? a : b, idx), valeurCellule(asc ? b : a, idx));

window.onload = function(){

    //Coloration de l'arbre
    colorationNote();
    //Suppression des span arbo
    deleteArbo()

    let matchMinScreen = window.matchMedia('(max-width: 800px)')
    if(matchMinScreen.matches){
        //On récupère toutes les UE
        let ue = document.querySelectorAll('tr.UE')
        //On leur ajoute leur matières respective
        ue.forEach(tr => matiereParUE(tr,ue))
    }
    //Ajout des ecouteurs à chaque element th du tableau
    document.querySelectorAll('th').forEach(th => th.addEventListener('click',function(){sortColumnH(th);},false));
}

function matiereParUE(tr,ue){

    //Matieres par UE
    let matUE = Array()
    let elementCourant = tr.
    //On parcours les matières tant que le n'atteind pas une autre UE
    while(elementCourant.getAttribute('class')==null)
    {
        //On ajoute la matière courante au tableau
        matUE.push(elementCourant)
        elementCourant = elementCourant.nextElementSibling
    }
    console.log(matUE)
     //On ajoute les listeners dessus
    let trFamily = {
        ligne : tr,
        matieres : matUE
    };
    //Sur la ligne on ajoute un listener avec les matières à afficher/cacher
    trFamily.ligne.addEventListener('click', function(){deplierUE(trFamily);},false)
}

function deplierUE(family){

    family.matieres.forEach(function(td){
        //On passe en table row si les matieres ne sont pas visible
        if(td.style.display='none')
        {
            td.style.display='table-row'
        }
        //TODO : if display is table row then hid
        
    });
    
}

function deleteArbo(){
    //cellules
    let cellules = document.getElementById('T-1').getElementsByTagName('td')
    for(var i =0; i<cellules.length; i++)
    {
        //Si la cellule contient un span alors on le supprime du dom
        if(cellules[i].querySelector('span')!=null)
        {
            cellules[i].removeChild(cellules[i].querySelector('span'))
        }
    }

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
