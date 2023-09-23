# ideas

## divers

* les gens doivent comprendre le fait que ces algos doivent être streamable (et donc décompressible en temps réel)
* exemple avec un gros HTML compression qui se charge très lentement
  * streaming de la compression
  * streaming de la décompression mais aussi du parsing et affichage HTML
* aujourd'hui tout n'est pas fait magiquement, il faut s'intéresser à la question pour que ça marche au mieux
* il faudra un slide take way
  * 10 take away disséminés pendant tout le talk
    * avec des couleurs par notion
* Un peu comme ma ligne de metro qui se complète progressivement
* brotli c'est le présent
* story telling : Antoine qui s'émerveille davant "des matheux qui font des trucs sans penser informatique..."
  * (recherche fondamentale...) 
* il nous faut des exemples live ou on tape du texte
* Hubert : storytelling du CSS plus petit avec les services
  * et antoine qui arrive en "sachant"
* Intercaler des anecdotes et de l'historique entre les parties algo
* Aucun algo de compression n'est meilleur dans toutes les situations (on cherche les algo qui sont moyennement bon et sui ne tombent pas dans des minimum locaux https://www.mathworks.com/help/examples/graphics/win64/ViewSetAzimuthElevationAsTwoArgsExample_01.png)
* le truc des petits train
  * plier un short dans une valise, ça sert à rien
  * essayer de traffiquer la taille des paquets IP et jouer avec ça
    * 10k 19k => 11k
* montrer l'impact réel de gzip sur un site Web

## random

* Il faut faire un petit rappel sur la compression avec perte de donnée vs compression sans perte au début
* enchainer avec la différence compression / minification
  * exemple JS => exemple JS min => exemple JS compresser
  * ordre de grandeur de compression et minification + combo
* navigateur / serveur (accept encoding...)
  * curl
  * démo
  * explication sans parler de streaming dans un premier temps
  * plusieurs algo
    * ordre de grandeur raw, gzip, brotli (react, bootstrap..., HTML)
* temps de compression versus temps de transfert
  * demo avec bitrate théorique
  * ordre de grandeur sur les temps de compression et décompression
* on parle de la bufferisation (histoire des paquets)
  * demo streaming HTML
* tout n'est compressible

* Parler du fait que les navigateurs intègrent gzip et brotli mais n'y donne pas Accès, du coup, il est parfois nécessaire d'avoir une implem JS 
  * => c'est en train de changer avec des propositions de Google sur les streams

* Un système de compression doit avant tout preseverver l'info, et si possible la rendre plus petite
* Ratio de compression : s/c(s)
* Parfois la version compressée est plus grosse
* La compression c'est un zero sum game, si tu gagnes sur certains input, tu dois perdre sur d'autres...
* On vise une bonne compression sur des vraies donneipas sur du bruit aléatoire

* parler des familles de schemes LZ*
* parler des brevets sur LZW, LZ78 était aussi sous brevet
* Les gif, c'est du LZW

* Plein de petits fichiers compressent moins bien qu'un gros fichier

* zip bomb

* LZ77 vs LZSS (même si la doc de deflate parle de LZ77, deflate est plutôt basé sur LZSS)
* deflate inventé pour les .zip via PKZIP et ensuite utilisé sur gzip
* on peut backreference avec un peu de futur
* expliquer les backreference dans le futur pour les répétitions
* gz c'est un format de conteneur
* Expliquer pour quoi on le combine avec tar
* gzip est censé gérer plusieurs algo de compression mais en fait ça gère que deflate

* Gzip a un header (10 bytes) et un footer (8 bytes) avec le deflate bitstream au milieu sous forme de blocks
  * Le header peut être un peu plus grand
  * RFC 1952 défini le format
  * Il peut y avoir plusieurs membres dans un gzip mais en réalité, personne ne fait ça

* Block type zero, on peut tester si zlib fait ça avec des jpeg ou des images
* Pourquoi gzip et pas juste deflate sur le web ?
  * deflate, c'est pas juste deflate, c'est zlib un plus petit conteneur
    * mais un pb IIS fait que personne ne l'utilise

* En fait deflate utilise du prefix coding plus qu'un vrai huffman code vu qu'il faut le limiter à 15bits
* Gzip 32768 past characters even cross block et 258 dans le futur

* On parle morse ?
* On parle dentropie ?

* Anecdote où jake et surma disent qu'ils code golf leur deps et se rendent compte que le résultat post gzip est pluq gros
* Un histogramme pour montrer la fréquence des lettres

## story telling

* antoine est le sachant, il explique, il pop des trivas de ouf, des métaphores
* hubert digère, pose des questions, implémente et matérialise ce qu'on m'explique
  * ouvre des axes de réflexions et antoine y répond
* mais pour autant on évite le théâtre de guignol
  * on évite le "ah bon" ?

* le point départ de nombreuses discussions (Paris-Web et autre)
* hubert connait le web
* antoine connait la compression
* ensemble pour comprendre on a besoin de déconstruire et construire

* conclusion "quand t'as une idée à la con, essaie là, creuse là, tu vas apprendre des choses"
* "en regardant de plus près, on a la vue macro la plus précise"

* visuel en tête de antoine
  * réseau
  * producteur et lecteur de texte compressé

* Idée pour l'intro : qui a déjà essayé de zipper un point zip ?
* license winrar

* Story telling huffman étudiant

## thématique

* briques de lego avec couleurs
* train, valises, avion, tapis roulant de bagage d'aéroport
  * ça marche pour une métaphore par ci par là mais pas une thématique globale
* "Chérie j'ai rétrécie les gosses" https://www.allocine.fr/video/player_gen_cmedia=19588975&cfilm=5408.html
* Arthur et les minimoys 
* Ant man
* Talk en duo TEDx sur l'orthographe https://www.ted.com/talks/arnaud_hoedt_jerome_piron_la_faute_de_l_orthographe?language=fr
* scrabble
  * "Le mot le plus court"
  * "Mot compte 30%" => LZ
  * "Lettre compte 50%" => HUFFMAN
  * El bbars (scrabble à l'envers)
  * On montre un chevalet de 7 lettres au départ, on demande aux gens s'ils ont une idée de mot à 7 lettres, on révèle la solution à la fin
