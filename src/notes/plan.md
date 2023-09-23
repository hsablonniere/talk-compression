# Plan

## Intro

* Qui a déjà essayé de zipper un point zip ?
* Qui a acheté sa license winrar ?
* Qui connait par coeur les flags de la commande tar ?

## Bonjour



## Nommage et ordre de grandeur

* Compression : avec perte de données et sans perte de donnée
* Minifaction vs compression
  * ordre de grandeur compression / minification / combos
  * demo (exemples foo.js, foo.min.js, foo.js.gz, foo.min.js.gz)
* échanges navigateur/serveur
  * curl, navigateur vieux mobile...
  * accept-encoding / content-encoding
  * ordre de grandeur raw, gzip, brotli (react, bootstrap..., HTML)
  * demo
  * (parle pas de streaming)
* temps de compression vs. temps de transfert
  * demo avec bitrate théorique
  * ordre de grandeur sur les temps de compression et décompression
* on explique que la compression ça se stream
  * demo avec une page HTML qui se stream
  * demo avec une page HTML qui se stream + compression
  * c'est d'ailleurs pas possible avec n'importe quel algo de compression
  * gzip, brotli sont fait pour compresser en temps réel et donc parfait pour le Web
* on parle des petits trains
  * streamer, c'est bien, mais sur le réseau, il y a des paquets et "une valise à moitié vide, pas besoin de plier les tshirts" 

* graphs alamanac http

## Les algos

* maths, trivia, les algos, les dates et les inventeurs
* réduire la quantité d'info, c'est pas nouveau => les algos
* huffman 52'
  * étudiant, exam ou papier
  * limitation de huffman => autre besoin (CSS ou JS)
* LZ77 77'
  * exemple humain cite de la peur
* il y a quoi dans gzip ?
  * visuellement
* zopfli
* brotli
* expliquer precompression (fichiers statiques)
  * ordre de grande temps compression de décompression

* caniuse gzip

* Ratio de compression : s/c(s)
* tout ne se compresse pas !

## Tips

Bonnes et mauvaises pratiques
quel niveau utiliser ?

## Conclusion

Terminer avec un gzip de gzip qui gagne un peu
