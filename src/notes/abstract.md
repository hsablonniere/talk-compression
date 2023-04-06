# Abstract

## Problèmes constatés

* Les gens ne comprenent pas bien comment fonctionne la compression
* Les gens ne comprenent pas bien comment fonctionne les paquets TCP/HTTP
  * Et du coup, en quoi gagner N kB sur un payload a un impact ou pas sur les perfs utilisateur
* Les gens configurent mal (ou pas du tout) la compressions sur le Web
  * compression de trucs pas compressibles
  * résultat post compression + gros que la source
  * compression à la volée de fichiers statiques
  * mauvaise utilisation des niveaux de compression
  * que du gzip alors qu'il y a des nouveautés (zopfli, brotli)
* Les perfs ne sont pas aussi bonnes que ce qu'elles pourraient être

Si on n'avait pas de gzip sur le Web, ça ne tiendrait pas !!!

## Conclusion

Pour avoir des bonnes perfs utilisateur et des bonnes factures (en limitant ce qui passe dans les tuyaux), il faut bien comprendre comment la compression fonctionne et comment elle fait en sorte que le Web tient debout.

## Take away

Une personne qui a suivi la présentation repart avec :

* une connaissance des algos, des variantes etc...
* une compréhension de TPC/HTTP (petits trains)
* une vision claire de la nécessité de la compression dans le Web
* des bonnes pratiques
* des alertes sur les mauvaises pratiques

## Déroulé simplifié

* comment ça marche la compression ?
  * explication de LZ, huffman, gzip, brotli, zopfli
* il y a quoi dans le dictionnaire de brotli ?
* il y a quoi dans les transfos de brotli
* le fonctionnement de accept-encoding / content-encoding
* tout ne se compresse pas !
* compression vs minification !
* à partir de combien de KB ça sert à qqchose de compresser ?
* ça prend combien de temps à compresser/décomprésser vs à transférer le delta ?
* quel niveau utiliser ?
* expliquer les petits trains dans le réseau

* https://caniuse.com/sr_content-encoding-gzip

## Abstract

### FR

Toute la journée, dans la plus grande indifférence, nos réponses HTTP se font compresser par nos serveurs puis décompresser par nos navigateurs.
Ce mécanisme est omniprésent sur le Web et pourtant, ses subtilités nous échappent encore.
On compresse des formats qui n'en ont pas besoin, on compresse à la volée des fichiers statiques, on n'adopte pas les nouveaux algos...
Finalement, on remplit les tuyaux d'internet plus que nécessaire, au détriment des performances et de nos utilisateurs.

Au menu de cette session, nous vous proposons de (re)découvrir la compression pour le Web.
Nous reviendrons sur gzip, brotli, ainsi que les algos de base qui se cachent en dessous.
Nous parlerons de la négociation de contenu entre serveurs et navigateurs.
Enfin, nous aborderons les bonnes et mauvaises pratiques avec des exemples concrets et des mesures.

### EN

## Message pour le comité

### FR

Il s'agit d'une proposition toute neuve qui n'a jamais été présentée.
C'est un sujet qu'on creuse tous les deux à notre manière depuis plusieurs mois et qui nous intéresse beaucoup.
Nous voulons faire une présentation avec des slides interactifs, des démos et des exemples concrets.

Une personne qui a suivi la présentation repart avec :

* une connaissance des algos, des variantes etc...
* une compréhension de TPC/HTTP
  * TODO: préciser 
* une vision claire de la nécessité de la compression dans le Web
* des bonnes pratiques
* des alertes sur les mauvaises pratiques

Cette présentation s'adresse donc à des devs frontends, backend, novice pour de la découverte ou expert pour certains rappels.

### EN

## Idées de titre

Blagues avec le fait de "décompresser"

* La compression HTTP : un mystère levé !
  * Trop simple
* Libérez vos fichiers avec la compression Web !
  * Pas mal 
* Boostez vos performances avec la compression HTTP !
  * "boostez", ça fait trop fort pour un sujet aussi vieux
* Compression HTTP : tout ce que vous n'avez jamais osé demander !
  * un peu trop classique
* Compression HTTP : comment éviter les cauchemars de performance ?
  * "cauchemars", ça fait trop fort aussi
* Décompresser le web : de l'art de libérer les tuyaux
  * Pas mal, j'aime bien "libérer les tuyaux"
* La compression HTTP, c'est pas du pipeau !
  * pas mal du tout (mais il faut la ref à pied piper)
* Dépoussiérez vos algorithmes de compression
  * je pense pas que le terme "algo" nous aide
* Compression pour les nuls : les astuces à ne pas manquer !
  * classique
* La compression web : comment (re)prendre le contrôle ?
  * pas mal
