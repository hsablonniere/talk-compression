# TODO

## Antoine

* slide type frise
  * les slides de la chronologie
* LZ
  * on montre toute la phrase en mode texte lisible (on blague dessus)
  * on montre toute la phrase en mode scrabble (sans les scores)
  * Lempel et Ziv, leur idée, c'est de faire des pointeurs relatif sur des bouts de text qui se répète
  * Parenthèse sur l'image avec des blocks de pixels qui ont la même couleur
  * Dans se texte, il y a plusieurs répétitions :p
  * Explication du système d'étiquette <distance,longueur> avec une petite phrase assez évidente
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

```
         A
0 01010100
  00110001
1 
```
  * on remontre le slide précédent
    * avec l'input avec score à 8 et total à 140 * 8
    * avec l'ouput avec score à 9 et total à ???

## Hubert

* slide chart
* huffman
  * mettre en valeur les deux sous arbres qui font partie de l'étape
* exemple binaire de gzip en mode décompression

## ??

* demo serveur ralenti avec lorem
