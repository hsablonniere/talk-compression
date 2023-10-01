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

## section todo
Nommage

## todo
Compression : avec perte de données et sans perte de donnée
> nous on va parler principalement sans perte

## todo
* Minifaction vs compression

<!-- Pour les codes suivants, on mettre en évidence le nombre de chars -->

## code todo
```js
const order = [];

function asyncTimeout (duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      order.push(duration)
      resolve()
    }, duration)
  })
};

async function fastestSortingAlgorithm (numberList) {
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

## section todo
Mesures

## barchart
petit-example.js
brut : 404 o
minifié : 235 o
compressé : 260 o
minifié<br>& compressé : 191 o

## barchart
jquery.js
brut : 278.7 Ko
minifié : 90.1 Ko
compressé : 82.0 Ko
minifié<br>& compressé : 30.3 Ko

## barchart
no compress
JS : 12.7%
CSS : 14.2%
HTML : 56.0%
JSON : 31.8%
SVG : 36.0%

## todo
histogramme de poids (pur, min, gzip, minzip) avec l'exemple d'avant

## todo
histogramme de poids (pur, min, gzip, minzip) bootstrap/tailwind

## todo
histogramme de poids (pur, min, gzip, minzip) jquery/react

## blank

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

## section todo
Procotole

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

## todo demo
demo HTML streaming sans compression (au ralenti, simulé en local)
avec doc d'hibernate

## todo demo
demo HTML streaming sans compression (au ralenti, simulé en local)
fake long de vrai texte avec div de 10x10px qui font 1k ou 10k

## todo demo
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
> streamer, c'est bien, mais sur le réseau, il y a des paquets et "une valise à moitié vide, pas besoin de plier les
> tshirts"

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
> #AC# Mais tout ça, ça ne date pas d'hier.
> Il va falloir sortir la DeLorean mon cher Hubert
> Quand on parle de Gzip, on parle pas d'un truc qui date d'hier.

## timeline year=2010 animated
Bien avant bootstrap
> #HS# On est bien avant Bootstrap, bien avant react

## timeline year=2000 animated
Bien avant les années 2000
> #AC# On est bien avant le web des années 2000 avec les compteurs de visiteurs
> Les design métaliques qui me manquent un peu

## timeline year=1980 animated
PKZIP, 1986, Phil Katz, <img src="src/img/katz.png" />
GZIP, 1992, Jean-Loup Gailly / Mark Adler, <img src="src/img/adler-gailly.png" />
> #HS# Il faut remonter à 1992 pour retrouver la RFC de GZIP par Jean-Loup Gailly et Mark Adler
> RFC 1952
> Tu faisais quoi en 1992 toi Antoine ?
> #AC# 😅
> Ils posent les bases d'un modèle de compression basés et inspirés de traveaux de PKZIP par Phil Katz quelques années
> avant.
> On parle du Web 56k de l'époque, économiser autant de bits, c'était une révolution.
> Mais pour faire PKZIP et GZIP, ils ne sont pas partis de rien
> Il ont été piocher d'abord dans des travaux des années 70 et même des années 50

## timeline year=1970 animated
LZ77, 1977, Abraham Lempel and Jacob Ziv, <img src="src/img/lempel-ziv.png" />
> #AC# Oulà oui on parle de travaux fait 20 ans avant.
> Tu faisais quoi en 1977 toi Hubert ?
> #HS# 😅
> Travaux de deux scientifiques Abraham Lempel and Jacob Ziv qui proposent en 1977 un algortithme de compression de
> texte nommé LZ77
> _LZ77 mais qu'est-ce que ça peut pouvoir dire ? ça reste encore un mystère_

## timeline year=1950 animated
Code de Huffman, 1951, David A. Huffman, <img src="src/img/huffman.png" />
> #HS# Oui mais PKZIP et GZIP n'ont pas été piocher que dans les travaux des années 70
> Ils ont été reprendre de travaux publiés en 1951 par Mr Huffman.
> Le codage de huffman, on est là bien avant les problématiques de l'interweb
> #AC# Donc, ce qu'on est en train de dire, c'est que la recherche fondamentale
> ça peut avoir des impacts considérables sur l'évolution de la technologie des années après?
> 40 ans séparent PKZIP du codage d'Huffman et plus de 30 ans séparent GZIP de 2023.
> #HS# Oui allez Antoine, on est content mais il faut qu'on avance et qu'on leur explique comment ça marche

## todo
section comment ça marche

## todo
lettre compte triple

## section todo
Code de  Huffman
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

## blank
> #HS# Prenons un mot au hasard !

## text
sablonnière
> _Hubert affiche le mot "sablonnière" à l'écran._
> #AC# Hubert ?

## huffman todo score=auto
SABLONNIERE
> #HS# Non, mais c'est un vrai mot, on peut le jouer au Scrabble.
> #AC# Hubert !

## blank
> #HS# Bon, d'accord, de toute façon, j'ai jamais réussi à le placer.

## huffman todo
COMPRESSION
> #HS# Prenons un mot au hasard !
> Quand on stocke le mot "COMPRESSION" dans un fichier texte, on obtient un fichier de 9 octets, un octet par caractère.

## huffman todo score=8
COMPRESSION
> Chaque octet contient les 8 bits nécessaires pour représenter le code ASCII en binaire.

## media terminal
<img src="src/img/terminal-ascii.png">
table ASCII ou alors avec la commande `ascii`
> Si vous êtes nul en code ASCII comme moi,
> vous pouvez utiliser la commande `ascii -b` sous Linux pour avoir la table de correspondance.

## media terminal
<img src="src/img/terminal-ascii-b.png">

## media terminal
<img src="src/img/terminal-ascii-b-annotate.png">

## huffman todo score=8 bits=auto
COMPRESSION
> En 1952, Huffman, constate que cette représentation binaire est linéaire.
> Le nombre total de bits est...

## huffman todo  score=8 bits=auto total-score
COMPRESSION
> ...directement proportionnel au nombre de caractères,
> et lui, il veut limiter ce nombre de bits.
> Pour ça, il va se baser sur la fréquence (entropie ?).
> En codant les caractères qui apparaissent le plus souvent avec peu de bits,
> et en codant les caractères qui apparaissent le moins souvent avec beaucoup de bits,
> en moyenne, on devrait réduire le nombre de bits total et gagner de la place.
> #AC# J'crois qu'on les a perdus.
> #HS# Mais non, en fait,

<!--
## barchart
Score des lettres au Scrabble
A : 1
E : 1
I : 1
L : 1
N : 1
O : 1
R : 1
S : 1
T : 1
U : 1
D : 2
G : 2
M : 2
B : 3
C : 3
P : 3
F : 4
H : 4
V : 4
J : 8
Q : 8
K : 10
W : 10
X : 10
Y : 10
Z : 10
> c'est comme au Scrabble.
> Les lettres qui apparaissent le plus souvent ont un petit score
> et les lettres qui apparaissent le moins souvent ont un plus gros score.
-->

<!--
IDEE :
on mets les lettres dans l'ordre alpha
mais on fait apparaitre les scores 1 d'abord, puis 2, puis 3, 4, 8 et 10
-->

## barchart
Score des lettres au Scrabble (français)
// A : 1
// B : 3
// C : 3
// D : 2
// E : 1
// F : 4
// G : 2
// H : 4
// I : 1
// J : 8
// K : 10
// L : 1
// M : 2
// N : 1
// O : 1
// P : 3
// Q : 8
// R : 1
// S : 1
// T : 1
// U : 1
// V : 4
// W : 10
// X : 10
// Y : 10
// Z : 10

## barchart
Score des lettres au Scrabble (français)
A : 1
// B : 3
// C : 3
// D : 2
E : 1
// F : 4
// G : 2
// H : 4
I : 1
// J : 8
// K : 10
L : 1
// M : 2
N : 1
O : 1
// P : 3
// Q : 8
R : 1
S : 1
T : 1
U : 1
// V : 4
// W : 10
// X : 10
// Y : 10
// Z : 10

## barchart
Score des lettres au Scrabble (français)
A : 1
// B : 3
// C : 3
D : 2
E : 1
// F : 4
G : 2
// H : 4
I : 1
// J : 8
// K : 10
L : 1
M : 2
N : 1
O : 1
// P : 3
// Q : 8
R : 1
S : 1
T : 1
U : 1
// V : 4
// W : 10
// X : 10
// Y : 10
// Z : 10

## barchart
Score des lettres au Scrabble (français)
A : 1
B : 3
C : 3
D : 2
E : 1
// F : 4
G : 2
// H : 4
I : 1
// J : 8
// K : 10
L : 1
M : 2
N : 1
O : 1
P : 3
// Q : 8
R : 1
S : 1
T : 1
U : 1
// V : 4
// W : 10
// X : 10
// Y : 10
// Z : 10

## barchart
Score des lettres au Scrabble (français)
A : 1
B : 3
C : 3
D : 2
E : 1
F : 4
G : 2
H : 4
I : 1
// J : 8
// K : 10
L : 1
M : 2
N : 1
O : 1
P : 3
// Q : 8
R : 1
S : 1
T : 1
U : 1
V : 4
// W : 10
// X : 10
// Y : 10
// Z : 10

## barchart
Score des lettres au Scrabble (français)
A : 1
B : 3
C : 3
D : 2
E : 1
F : 4
G : 2
H : 4
I : 1
J : 8
// K : 10
L : 1
M : 2
N : 1
O : 1
P : 3
Q : 8
R : 1
S : 1
T : 1
U : 1
V : 4
// W : 10
// X : 10
// Y : 10
// Z : 10

## barchart
Score des lettres au Scrabble (français)
A : 1
B : 3
C : 3
D : 2
E : 1
F : 4
G : 2
H : 4
I : 1
J : 8
K : 10
L : 1
M : 2
N : 1
O : 1
P : 3
Q : 8
R : 1
S : 1
T : 1
U : 1
V : 4
W : 10
X : 10
Y : 10
Z : 10

<!--
## barchart
Score des lettres au Scrabble (anglais)
A : 1
B : 3
C : 3
D : 2
E : 1
F : 4
G : 2
H : 4
I : 1
J : 8
K : 5
L : 1
M : 3
N : 1
O : 1
P : 3
Q : 10
R : 1
S : 1
T : 1
U : 1
V : 4
W : 4
X : 8
Y : 4
Z : 10
-->

## huffman todo score=auto
COMPRESSION
> Si on représentait chaque lettre en utilisant le score au Scrabble pour le nombre de bits,

## huffman todo total-score score=auto
COMPRESSION
> on obtiendrait un nombre total de bits plus petit.
> En gros, l'idée de Huffman c'est ça.
> #AC# Oui, sauf qu'avec un seul bit, t'as 0 et 1,
> tu vas pas pouvoir coder "R", "A", "I" et "E".
<!-- pourquoi pas mettre des séquences de bits en dessous de chaque lettre et mettre des ? en dessous de I et E -->
> Et en plus, là t'as utilisé une fréquence de lettres qui est plus ou moins basée sur des moyennes de la langue
> française alors que t'as qu'un tout petit mot.

## media contain black
<img src="src/img/huffman2_upscayl_crop.jpg">
> #AC# Huffman c'est un génie, le mec a 26 ans, anecdote exam vs papier, il invente un système pour trouver le meilleur
> codage binaire pour un ensemble de caractère et il prouve mathématiquement que c'est le meilleure codage binaire d'une
> série de caractère
> "et ça il le fait pour échapper à un partiel"
> "et en plus, il est dans la classe de Claude Shannon"
<!-- lunettes thug life sur son visage au moment ou tu dis, il choisi l'exam -->
<!-- parler de log de 2 au lieu de 8 -->

## media contain black thug-life="0.1,-0.05,14,5"
<img src="src/img/huffman2_upscayl_crop.jpg">

## huffman todo
COMPRESSION
> Pour la première étape de l'algo du codage de Huffman,

## huffman todo step=1
COMPRESSION
<!--
<br> (huffman tree 1/16)
<br> lettre en dessous par ordre de fréquence avec le nombre d'occurence en haut de chaque lettre
-->
> on va compter la fréquence de chaque caractère dans la séquence qu'on essaye de coder

## huffman todo step=2
COMPRESSION

## huffman todo step=3
COMPRESSION

## huffman todo step=4
COMPRESSION

## huffman todo step=5
COMPRESSION

## huffman todo step=6
COMPRESSION

## huffman todo step=7
COMPRESSION

## huffman todo step=8
COMPRESSION

## huffman todo step=9
COMPRESSION

## huffman todo step=10
COMPRESSION

## huffman todo step=11
COMPRESSION

## huffman todo step=12
COMPRESSION

## huffman todo step=13
COMPRESSION

## huffman todo step=14
COMPRESSION

## huffman todo step=15
COMPRESSION

## huffman todo step=16
COMPRESSION

## huffman todo step=17
COMPRESSION

## huffman todo step=18 score-sheet
COMPRESSION
> on indique que il n'y a pas de conflit "on sait quand s'arrêter"
<!-- est-ce qu'on montre la logique de décompression pour expliquer qu'on sait voir les caractères et les lire ? -->

## huffman todo step=19
COMPRESSION
> <br> mode scrabble
> <br> score base  / score de huffman
> <br> avec score total
> ça marche pour n'importe quel suite de caractères
> c'est l'algo le plus optimisé

## huffman todo step=19 total-score
COMPRESSION

## huffman todo step=0 score=4 total-score bits=inc
COMPRESSION

## text todo
une case "LETTRE COMPTE MOINS"

## section todo
LZ77
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
arbo de la famille LZ
> mode trivia qui détend

## section todo
Deflate

## todo
deflate / pkzip v2
Phil Katz
(v1 1986 / v2 ?) (30 ans)
> dans les années 90, tout le monde a essayé d'optimisé pour que ça marche bien pour du texte

## section todo
GZIP

## todo
gzip
Jean-loup Gailly and Mark Adler
1992 (30 ans)
> exemple binaire de gzip en mode décompression

## todo
et maintenant ?
> à la recherche du pouillème
> pourquoi ? 1% c'est beaucoup de moula
> cloudflare qui a un fork de zlib

## todo
zopfli
> complexité de la recherche de motifs
> meilleure taux mais moins bonne perf
> MEME FORMAT OMG !!

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

## section todo
Futur ?

## todo
zstd

## todo
dictionnaire brouillon WICG

## poster
Merci beaucoup !

## credits
Section 1 :

* text : https://example.com

Section 2 :

* text 2 : https://example.com
