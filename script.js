/*Localisation des éléments HTML*/ 

let sasie = document.getElementById("champ")
let start = document.getElementById("commencer")
let accueil = document.getElementById("accueil")
let sasie_lettre = document.getElementById("champ_jeu")
let submit = document.getElementById("saisir_lettre")
let liste_bien = document.getElementById("vrai")
let liste_non = document.getElementById("faux")
let screen = document.getElementById("screen")
let dead = document.getElementById("loose")
let win = document.getElementById("win")
let errors = document.getElementById("errors")
let err_num = document.getElementById("err_num")
let champ_key = document.getElementById("champ_mot")
let valid = document.getElementById("saisir_mot")
let help = document.getElementById("aide")
let retrydead = document.getElementById("retrydead")
let retrywin =  document.getElementById("retrywin")
let scorewin =  document.getElementById("scorewin")
let scoredead =  document.getElementById("scoredead")

/*Rangement des bonnes/mauvaises réponses*/ 
let bad = []
let good = []

/*Mot clé vide par défaut */
let word = ""

/*Liste affichant des "_" et les lettres correctes */ 
let helplist = []

/* scores par défaut*/
let statdead = 0
let statwin = 0

/*Définition du mot clé */
start.addEventListener("click", (event)=>
{
    try{
        event.preventDefault(event)
        word = sasie.value.toLowerCase()

        /*vérifier qu'il n'y ai pas de vide*/
        if(sasie.value==="")
            {
                console.error("Veuillez définir un mot secret")
            }else{
                accueil.style.display="none"
                screen.style.display ="flex"
            }

           /*mise en place du nombre de "_" selon la longueur du mot secret*/
            for(i=0 ; i< word.length ; i++)
                {
                    helplist.push("_")
                    help.innerHTML = helplist.join(" ")
                }

            sasie.value = ""
        
    }catch(err)
    {
        console.error(err)
    }
})

/*évênements sur la saisie de lettre*/
submit.addEventListener("click",(event)=>
{
    try{
        event.preventDefault(event)
        let reponse = sasie_lettre.value.toLowerCase()
        /*Vérifier si le caractère est déjà utilisé */
        good.forEach((e)=>
            {
                if(reponse === e)
                    {
                        good.splice(-1, 1)
                        console.error("vous avez déjà rentré ce caractère")
                    }
            })
        /*Vérifier si le caractère est déjà utilisé */
        bad.forEach((e)=>
              {
                if(reponse === e)
                    {
                        bad.splice(-1, 1)
                        console.error("vous avez déjà rentré ce caractère")
                  }
                })

        if(reponse === "")
            {
                console.error("Veuillez sasir une lettre")
            }

        /*Vérifier les réponses*/

        if(word.includes(reponse))
         {
            good.push(sasie_lettre.value)
            liste_bien.innerHTML=""

            liste_bien.innerHTML = good.join(" ")     
            
            for(i = 0 ; i < word.length ; i++)
                {
                    if(reponse === word[i])
                        {
                            helplist.splice(i, 1 , sasie_lettre.value)
                            help.innerHTML = helplist.join(" ")
                        }
                }
         }
         else{
            bad.push(reponse)
            liste_non.innerHTML=""

          liste_non.innerHTML = bad.join(" ")

            if(bad.length > 10)
                {
                    screen.style.display="none"
                    dead.style.display="flex"
                }
         }
         
         err_num.textContent = bad.length
         sasie_lettre.value = ""

    }catch(err)
    {
        console.error(err)
    }
})

/*vérifier le mot entré par le joueur*/
valid.addEventListener("click",(event)=>
{
    event.preventDefault(event)
    let reponseMot = champ_key.value.toLowerCase()

    try{
        if(reponseMot === word)
        {
            screen.style.display="none"
            win.style.display="flex"
        }else{
            bad.push(reponseMot)
            liste_non.innerHTML=""

            let paragraphe = document.createElement("p")
            let contenu = document.createTextNode(bad)
            paragraphe.appendChild(contenu)
            liste_non.appendChild(paragraphe)
        }

        if(reponseMot === "")
            {
                bad.splice(-1 , 1)
                console.error("Veuillez saisir une réponse")
            }

        err_num.textContent = bad.length

        if(bad.length > 10)
            {
                screen.style.display="none"
                dead.style.display="flex"
            }
            champ_key.value = ""

    }catch(err){
        console.error(err)
    }
})

/*affichage de l'écran de mort*/
retrydead.addEventListener("click",(event)=>
{
    event.preventDefault(event)
    dead.style.display="none"
    accueil.style.display="flex"

    /*rajoute 1 dans le score des morts*/
    statdead +=1
    scoredead.textContent = statdead
})

/*affichage de l'écran de victoire*/
retrywin.addEventListener("click",(event)=>
    {
        event.preventDefault(event)
        win.style.display="none"
        accueil.style.display="flex"
        word=""
        helplist = []
        bad= []
        good = []
        liste_bien.innerHTML=""
        liste_non.innerHTML=""

        /*rajoute 1 dans le score des victoires*/  
        statwin += 1
        scorewin.textContent = statwin
    })
    