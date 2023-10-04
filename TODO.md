# TODO

## Antoine

* slide type frise
  * les slides de la chronologie
* LZ
  * transition "on est 25 ans plus tard"
  * "et la on va jouer à mot compte moins"
  * on montre toute la phrase en mode texte lisible (on blague dessus)
  * on montre toute la phrase en mode scrabble (sans les scores)
  * Lempel et Ziv, leur idée, c'est de faire des pointeurs relatifs sur des bouts de texte qui se répète
  * Parenthèse sur l'image avec des blocks de pixels qui ont la même couleur
  * Dans ce texte, il y a plusieurs répétitions :p
  * Explication du système d'étiquette <distance,longueur> avec une autre phrase (plus petite) assez évidente (genre millefeuille)
    * MILLEFEUILLE 
    * MILLEFEU<7,4> 
    * pourquoi pas trouver un autre exemple
  * on remontre toute la phrase en mode scrabble (sans les scores)
    * chaque tuile est opacifié 0.25
    * on les révèle au fur et à mesure
    * à chaque lettre révélé (opacité 1) on construit l'ouput compressé en dessous
    * quand on commence à voir des trucs dans le gris (turfu) qui se répètent, on "souligne" (mot compte double)
    * une fois la répétition identifié, on génère l'étiquette dans l'ouput compressé en dessous
    * tuile "large" avec <distance,longueur> et le texte remplacé en tout petit (testé)
  * étapes :
    * étiquette n°1 : "ON PEUT TROMPER"
    * étiquette n°2 : " MILLE"
    * étiquette n°3 : " PERSONNE"
    * étiquette n°4 : " UNE"
    * étiquette n°5 : "FOIS."
    * étiquette n°6 : "ON "
      * 47,3
      * évocation des limites de petites répétitions qui sont "loin"
      * limit de gzip à 3
    * étiquette n°7 : " PEUT"
    * étiquette n°8 : " TROMPER MILLE PERSONNES"
    * étiquette n°9 : " MILLE"
    * étiquette n°10 : " FOIS."
  * recontextualiser la complixité de la compression de trouver "des répétitions/motifs"
  * expliquer que la décompression et hyper facile
  * on a éludé une partie du problème
    * on a moins tuiles mais avec des bits octets ça donne quoi ? on gagne ou pas ?
  * slide vide ou on propose un système à base de bits
  * on affiche une case "MOT COMPTE MOINS"

```
         A
0 01010100
  00110001
1 
```
  * on remontre le slide précédent
    * avec l'input avec score à 8 et total à 140 * 8
    * avec l'ouput avec score à 9 et total à ???
* slide poster

## Hubert

* huffman
  * (mettre en valeur les deux sous arbres qui font partie de l'étape)
  * contexte
  * A: prenons un mot au hasard !
  * H: affiche SABLONNIERE à l'écran en format texte
  * A: non mais un vrai mot, genre qui se joue au scrabble
  * H: mais c'est un vrai mot, on peut le jouer au scrabble
  * affichage des tuiles progressivement
  * A: non mais pas ça
  * afficher un autre mot sans le score "LE MOT"
  * ajouter un score de huit pour chaque lettre
  * puis afficher en dessous les représentation binaire (mentionner ASCII)
  * huffman il se dit que cette représentation binaire est linéaire (lettre * 8 = total du message) et il veut limiter le nombre de bits pour son message
  * constat : il veut représenter les caractères les + fréquents sur peu de bits et les moins fréquents sur bcp de bits et en moyenne, au doigt mouillé on doit gagné.
  * A: je crois qu'on les a perdu
  * mais non, en fait c'est comme au scrabble
  * bar chart dans l'ordre alpha a score = avec scores du scrabble
    * (bar chart de A à Z avec score du scrabble)
  * remontre le mot mais avec les scores du scrabble
  * "si on représentait chaque lettre avec le nombre de bits indiqué par son score de scrabble"
  * la somme est plus petit que quand on se baisait sur un octet par caractère
  * H : en gros huffman c'est ça quoi
  * A : non mais Hubert l'informatique c'est pas basée sur le scrabble
  * A : Huffman c'est un génie, le mec a 26 ans, anecdote exam vs papier, il invente un système pour trouver le meilleur codage binaire pour un ensemble de caractère et il prouve mathématiquement que c'est le meilleure codage binaire d'une série de caractère
  * "et ça il le fait pour échapper à un partiel"
  * "et en plus, il est dans la classe de Claude Shannon"
  * prend un autre mot
  * parle de log de 2 au lieu de 8
  * la première étape de l'algo, ça va être de compter la fréquence de chaque caractère
  * dérouler l'algo
  * visuel feuille de score avec les lettres différentes
  * afficher les 0 et les 1 sur l'arbre binaire
  * en parcourant l'arbre, on trouve la représentation binaire
  * et on complète au fur et à mesure les codes binaires de chacune en explicant le parcours de l'arbre
  * on indique que il n'y a pas de conflit "on sait quand s'arrêter"
  * switch sur un écran blanc et ensuite on réaffiche le mot en base 2 log2 et le mot en huffman avec les scores
  * ça marche pour n'importe quel suite de caractères
  * c'est l'algo le plus optimisé
  * on affiche une case "LETTRE COMPTE MOINS"

* slide chart
  * formattage des unités d'octets
  * formattage des unités de temps
  * meilleur affichage de celui de l'almanac avec les mime types
* exemple binaire de gzip en mode décompression
  * 

## ??

https://sherlock-holm.es/stories/html/cano.html

* demo serveur ralenti avec lorem
  * on montre une démo qui génère 1 MB de data (via des blocs en tout petit HTML)
  * idem mais on ralenti artificiellement le serveur pour envoyer 1K par Xms
  * on constate que même sans avoir la fin du HTML, le navigateur se débrouille
  * on ajoute le support de gzip
  * on montre la même démo au ralenti
  * on explique qu'on pourrait s'attendre à devoir attendre la fin pour décomprésser
  * et en fait non, même avant d'avoir la fin, le navigateur peut décomprésser le début et même parser l'HTML
  * c'est dingue non ?
  * faire une grosse pause au milieu
  * ça stream
  * il manque un diagram (rectangle gantt)
* slide poster
  * un grille de scrabble en fond assez transparente
  * un bloc rouge au milieu avec le titre en blanc
  * une grille de score (meme design que huffman) avec
    * DevFest Nantes (date)
    * Une colonne Prénom, Nom, Employeur
    * Une colonne Antoine, Caron, Scaleway
    * Une colonne Hubert, Sablonnière, Clever Cloud
* slide tip/rappel
* slide minification
  * pourcentage de gain à côté du poids
* LEXIQUE au lieu de DEFINIITON
* afficher le barchart de l'almanac en progressif
* PROTOCOLE => ??
* HTTP/1.1 sur le requête ?
  * on garde ?
* slide tip
  * etoile scrabble plus phrase
  * cumulatif ? jusqu'à la fin ?

## besoin composant tuile

* tuile rectangulaire avec texte en petit en haut et en dessous une distance longueur <-d,l>
* souligné (ça c'est une répete)
* shadow/darken (pas encore affiché)
