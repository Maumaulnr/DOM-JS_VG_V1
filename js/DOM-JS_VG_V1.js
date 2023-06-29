/* *************************ETAPE 5************************* */ 
// pour optimiser le code on met l'algorithme dans une fonction
// La fonction elle-même a été nommée dans le même esprit, pour décrire au mieux sa procédure (elle mélange les enfants d'un élément parent donné, rien d'autre). La fonction est placée en début de code par convention.
// La situation de départ du jeu est mise en place, il ne reste plus qu'à le rendre jouable.
function shuffleChildren(parent) {
    let children = parent.children
    let i = children.length, k , temp
    while (--i > 0) {
        k = Math.floor(Math.random() * (i+1))
        temp = children[k]
        children[k] = children[i]
        parent.appendChild(temp)
    }
}

/* *************************ETAPE 11************************* */
// Visuellement et ergonomiquement, les boites de dialogue affichées en utilisant la fonction alert() de JavaScript sont désuètes et "cassent" le rythme du jeu.
// Ajoutons une fonction, que nous nommerons showReaction(), dans notre script
// Lorsque l'utilisateur provoquera un clic sur une boite, la fonction showReaction() sera appelée pour provoquer une réaction visuelle sur cette même boite.
// type (une chaine de caractères) correspondant au type de réaction souhaité
// clickedBox (HTMLElement) étant la boite sur laquelle l'effet sera appliqué
// La fonction setTimeout() de JavaScript permet de retarder l'exécution d'une ou plusieurs instructions (la fonction callback en premier paramètre) du délai voulu (le nombre en second paramètre, exprimé en millisecondes).
function showReaction(type, clickedBox) {
    clickedBox.classList.add(type)
    if(type !== "success") {
        setTimeout(function(){
            clickedBox.classList.remove(type)
        }, 800)
    }
}

/* *************************ETAPE 1************************* */ 
// ici notre code JS
const box = document.createElement("div")
box.classList.add("box")

/* *************************ETAPE 2************************* */ 
// appendChild() est une méthode qui place un élément du DOM à la fin du contenu de l'élément visé. Pour ajouter du contenu au début, on utilisera la méthode prepend().
const board = document.querySelector("#board")
// board.appendChild(box)
// box.innerText = 1

/* *************************ETAPE 8************************* */
// on déclare une variable nb qui représentera le numéro de la boite attendue et qui s'incrémentera en cas de clic valide ! LIGNE 54 (nb++)
let nb = 1

/* *************************ETAPE 3************************* */ 
// Nous effectuons une boucle for, de 1 à 10 (vous pouvez changer ce nombre à votre convenance), pour générer autant de boites à l'écran.
// si nous n'avions pas procédé à une copie de l'élément box, nous aurions à chaque tour de boucle modifié et déplacé LE MEME ELEMENT !!!
for(let i = 1; i <= 10; i++) {
    // let newbox = box.cloneNode() // version 1 sans fonction
    const newbox = box.cloneNode()
    newbox.innerText = i
    board.appendChild(newbox)

    /* *************************ETAPE 6************************* */ 
    // Le jeu nécessite que le joueur clique sur les boites, et le clic sera l'unique façon d'interagir avec le jeu.
    // Ces interactions avec la page sont appelées en JavaScript des évènements.
    // Pour associer un évènement, JavaScript fournit une méthode appelée "addEventListener" à tout élément du DOM.
    // addEventListener à l'intérieur de la boucle, ce qui permet de ne pas avoir à effectuer une autre boucle sur toutes les boites pour leur adjoindre l'évènement.
    newbox.addEventListener("click", function() {
        // console.log("Boite n°"+ i +", click !")
        /* *************************ETAPE 7************************* */ 
        // au clic en modifiant visuellement la case cliquée, ainsi le joueur repère directement si la case est valide
        // newbox.classList.add("box-clicked")

        /* *************************ETAPE 8************************* */
        // on vérifie d'abord si la boite sur laquelle le clic s'effectue possède le même numéro que ce que contient la variable nb. Si c'est le cas, on ajoute la classe CSS "box-valid" et on incrémente nb.
        if(i == nb) {
            newbox.classList.add("box-clicked")
            /* *************************ETAPE 9************************* */
            // 1 : Si nb est égal au nombre de boites du jeu, c'est que le dernier clic était sur la dernière boite → victoire du joueur ! (Il ne faut pas incrémenter nb avant !)
            if(nb == board.children.length) {
                // alert("VICTOIRE !") // ancien affichage
                /* *************************ETAPE 12************************* */
                // remplacer chaque alert() par l'appel à la fonction showReaction()
                board.querySelectorAll(".box").forEach(function(box){
                    showReaction("success", box)
                })
            }
            nb++
        }
        // 2 : Si le numéro de la boite est supérieur à nb, c'est que le joueur a cliqué une boite trop élevée → game over !
        else if(i > nb) {
            // alert("Erreur, recommencez !") // ancien affichage
            showReaction("error", newbox)
            nb = 1
            /* *************************ETAPE 10************************* */
            // L'idée est que le jeu redémarre
            // La fonction callback à l'intérieur de forEach() supprime tout simplement la classe CSS "box-valid" des attributs de la boite courante "validBox", reprenant ainsi son aspect initial.
            board.querySelectorAll(".box-clicked").forEach(function(validBox) {
                validBox.classList.remove("box-clicked")
            })
        }
        // 3 : Dernière possibilité : le joueur a cliqué sur une boite déjà grisée. On l'informe simplement de cela, le jeu ne redémarre pas.
        else {
            // alert("Case déjà cliquée !") // ancien affichage
            showReaction("notice", newbox)
        }
    })
} // FIN BOUCLE FOR

// pour la 2e version avec la FONCTION shuffleChildren
// FAIT PARTIE DE L'ETAPE 5
shuffleChildren(board)

/* *************************ETAPE 4************************* */ 
// La prochaine étape du code consiste à mélanger aléatoirement les boites à l'écran, et ainsi obtenir un ordre différent des numéros à chaque rafraichissement de la page.
// Le mélange de Fisher-Yates, aussi appelé mélange de Knuth, est un algorithme pour générer une permutation aléatoire d'un ensemble fini, c'est-à-dire pour mélanger un ensemble d'objets.
// Pour mélanger un tableau a de n éléments (indicés de 0 à n-1), l'algorithme est le suivant:

//  Pour i allant de n − 1 à 1 faire :
//  j ← entier aléatoire entre 0 et i
//  échanger a[j] et a[i]

// let i = board.children.length, k , temp
// while (--i > 0) { // on boucle tant que 1 oté de i est toujours positif
    // k stocke un nombre aléatoire basé sur i
    // k = Math.floor(Math.random() * (i+1))
    // temp pointe temporairement l'élément à la position k dans board
    // temp = board.children[k] // version 1 sans fonction
    // remplace l'élément à la position k par l'élément à la position i
    // board.children[k] = board.children[i] // version 1 sans fonction
    // place l'élément k pointé temporairement à la fin du contenu de board
    // board.appendChild(temp) // version 1 sans fonction
// }
// 2e VERSION AVEC LA FONCTION QUI DOIT ETRE MISE AU DESSUS DES AUTRES ALGO

/* *************************ETAPE 6************************* */ 
// Le jeu nécessite que le joueur clique sur les boites, et le clic sera l'unique façon d'interagir avec le jeu.
// Ces interactions avec la page sont appelées en JavaScript des évènements.