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

## thématique

* briques de lego avec couleurs
* train, valises, avion, tapis roulant de bagage d'aéroport
  * ça marche pour une métaphore par ci par là mais pas une thématique globale
* "Chérie j'ai rétrécie les gosses" https://www.allocine.fr/video/player_gen_cmedia=19588975&cfilm=5408.html
* Arthur et les minimoys 
* Ant man
* Talk en duo TEDx sur l'orthographe https://www.ted.com/talks/arnaud_hoedt_jerome_piron_la_faute_de_l_orthographe?language=fr


* https://github.com/privatenumber/minification-benchmarks
