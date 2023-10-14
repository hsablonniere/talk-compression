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

* reprend LZ pour le coté interactif
* exemple binaire de gzip en mode décompression
* affiner la démo Firefox devtools
* affiner la démo Sherlock stream
* pourquoi pas réutiliser le dump binaire du math example à la fin au lieu de la cité de la peur
* Logo des langages sur les barchart du début
  * j'ai essayé et c'est pas ouf
* Logo de jquery sur la fin

## besoin composant tuile

* tuile rectangulaire avec texte en petit en haut et en dessous une distance longueur <-d,l>
* souligné (ça c'est une répete)
* shadow/darken (pas encore affiché)
