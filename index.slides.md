---
author: 
author-twitter: 
author-company: 
event: DevFest Nantes
date: 19 octobre 2023
---

# La compression Web : comment (re)prendre le contrôle ?

## blank
> @00:00:00@

## todo
chevalet avec 7 lettres

## todo fade-from
intro avec des questions
> Qui a déjà essayé de zipper un point zip ?
> Qui a acheté sa license winrar ?
> Qui connait par coeur les flags de la commande tar ?

## blank black

## poster
> Bonjour

## todo
Nommage et ordre de grandeur

## todo
Compression : avec perte de données et sans perte de donnée
> nous on va parler principalement sans perte

## todo
* Minifaction vs compression

<!-- Pour les codes suivants, on mettre en évidence le nombre de chars -->
## code todo
```js
const order = [];
function asyncTimeout(duration){
  return new Promise((resolve) => {
    setTimeout(() => {
      order.push(duration)
      resolve()
    }, duration)
  })
};
async function fastestSortingAlgorithm(numberList){
  await Promise.all(numberList.map(number => asyncTimeout(number)))
  console.log(order)
};

fastestSortingAlgorithm([10000, 10, 100, 1000, 1]);
```

## code todo
slide d'avant mais avec les caractères inutiles mis en avant

## code todo
slide sans les caractères inutiles

## code todo
slide d'avant mais avec les trucs qu'on peut mangle mis en avant

## code todo
slide post mangling

## code todo
slide binaires (ne pas oublier d'afficher le poits)

## todo
histogramme de poids (pur, min, gzip, minzip) avec l'exemple d'avant

## todo
histogramme de poids (pur, min, gzip, minzip) bootstrap/tailwind

## todo
histogramme de poids (pur, min, gzip, minzip) jquery/react

## blank

## text
timings

## todo
histogramme de temps de chargement (pur, min, gzip, minzip) bootstrap/tailwind
un groupe de 4 barres pour le slow 3G
un groupe de 4 barres pour le fast 4G

## todo
histogramme de temps de chargement (pur, min, gzip, minzip) jquery/react
un groupe de 4 barres pour le slow 3G
un groupe de 4 barres pour le fast 4G

## todo
TIP/RECAP #? La minification va de pair avec la compression

## todo
almanac ratio servi sans compression
> expliquer ce que c'est l'almanac

## blank

## text
comment ça marche sur le web ?

## code
```http type="request"
GET /index.html HTTP/1.1
accept-encoding: gzip, deflate, br
```
```http type="response"
HTTP/1.1 200 OK
content-encoding: gzip
```
> c'est un peu magique
> le navigateur et le serveur travaillent ensemble pour gérer ça tout seul
> ça marche aussi automatiquement quand on fait un `fetch`

## todo
demo firefox
> montrer transfer size
> resource size (entre parenthèses)
> post-compression dans l'en-tête content-length

## text
ça existe depuis quand ça ?

## media todo
caniuse gzip

## blank

## todo
c'est petit mais est-ce que ça bloque ?

## demo
demo HTML streaming sans compression (au ralenti, simulé en local)
avec doc d'hibernate

## demo
demo HTML streaming sans compression (au ralenti, simulé en local)
fake long de vrai texte avec div de 10x10px qui font 1k ou 10k

## demo
demo HTML streaming avec compression (au ralenti, simulé en local)
fake long de vrai texte avec div de 10x10px qui font 1k ou 10k

## todo
TIP/RECAP #? le HTML ça se stream et la compression aussi

## blank

## text
plus petit sur le papier niveau octets

## text
plus rapide pour l'utilisateur niveau temps ?

## todo
on parle des valises et tshirt en boule ou pliés
(demander à Geoffroy comment mettre en place une démo)
> streamer, c'est bien, mais sur le réseau, il y a des paquets et "une valise à moitié vide, pas besoin de plier les tshirts"

## todo
transition
on vient de comprendre que compresser c'est indispensable
ça l'est toujours dans un monde de fibre, de 5G, de CPU M2
ça a encore un impact sur nos utilisateurs et sur l'environnement
mais ça date pas d'hier
ça fait combien de temps qu'on se pose cette question ? 
56K

<!--
Remonter le temps avec un seul slide à chaque fois
un thème daté (police, fond, couleur...)
la date
le nom de l'algo / outil
le nom des gens
la photo des gens
-->

## timeline year=2023 fade-from
Aujourd'hui, 2023

## timeline year=2010 fade-from fade-to animated
Bien avant bootstrap

## timeline year=2000 fade-from fade-to animated
Bien avant les années 2000

## timeline year=1980 fade-from fade-to animated
PKZIP, 1986, Phil Katz, <img src="src/img/katz.png" />
GZIP, 1992, Jean-Loup Gailly / Mark Adler, <img src="src/img/adler-gailly.png" />

## timeline year=1970 fade-from fade-to animated
LZ77, 1977, Abraham Lempel and Jacob Ziv, <img src="src/img/lempel-ziv.png" />

## timeline year=1950 fade-from fade-to animated
Code de Huffman, 1951, David A. Huffman, <img src="src/img/huffman.png" />

## todo
section comment ça marche

## todo
lettre compte triple

## todo
Code de Huffman
> le but de huffman c'est d'encoder les caractères en fonction de la fréquence
> c'est comme le scrabble !
> à l'époque ce n'est qu'un papier du MIT
> storytelling de exam vs paper
> classe de Claude Shannon
> le plus ouf c'est qu'il trouve l'algo pour la meilleure solution
> et qu'il le prouve mathématiquement
> ex: HUBERT ET ANTOINE (ou autre)
> on montre la l'algo avec la construction d'un arbre
> résultat : tableau de correspondance
> HUBERT ET ANTOINE
> 17*8 = 136
> HUBERT ET ANTOINE
> 54434443444334433 = 63

## todo
LZ
> L'idée c'est l'étiquetage
> exemple : la cité de la peur
> là tel mot là... ça se répète de ouf
> les étiquettes il y a plein de manière de faire
> LZ78 via des dictionnaire dynamiques
> LZ77 via des marqueurs relatifs
> arbre des familles avec le nom de plusieurs outils
> c'est LZ77 qui a gagné
> et on montre étage par étage l'exemple avec la cité de la peur
> on évoque la complexité de trouver la meilleure répétition dans le passé en regardant un peu dans le futur

## todo
deflate / pkzip v2
Phil Katz
(v1 1986 / v2 ?) (30 ans)

## todo
gzip
Jean-loup Gailly and Mark Adler
1992 (30 ans)
> exemple binaire de gzip en mode décompression

## todo
et maintenant ?

## todo
zopfli

## todo
brotli
> stats et ordre de grandeur
> huffman de l'espace (context modeling)
> taille des fenetres LZ
> dictionnaire statique qui reflète le Web ou plus ou moins (montrer)
> transformations de dico (montrer)

## todo
plus on est vieux => plus on est abstrait
plus on est récent => plus on connait ce qu'on compresse (pour gagner sur les derniers %)

## todo
compression statique et ordre de grandeur
si c'est pas temps réel, sur le web, c'est compliqué

## todo
maintenant que vous voyez comment ça compresse
quel sort on réserve au gens qui compresse du JPEG ?
explications

## todo
almanac

## todo
ouverture

## todo
zstd

## todo
dictionnaire

## poster
Merci beaucoup !

## credits

Section 1 :

* text : https://example.com

Section 2 :

* text 2 : https://example.com
