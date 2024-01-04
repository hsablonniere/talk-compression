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

Saviez-vous que toute la journée, nos serveurs compressent nos réponses HTTP et que nos navigateurs les décompressent ?
C'est comme si on passait notre temps à plier des T-shirts et à les déplier.
Cette compression est partout sur le Web, et pourtant ses subtilités nous échappent souvent.
On compresse des formats qui n'en ont pas besoin, on compresse à la volée des fichiers statiques, on n'adopte pas les nouveaux algorithmes...
Parfois, on oublie carrément d'activer la compression.
Bref, on remplit les tuyaux d'internet plus que nécessaire, comme si on remplissait notre valise de chaussettes en boule.

Mais rassurez-vous, il y a de l'espoir !
Dans cette session, nous allons (re)découvrir la compression pour le Web.
Nous vous présenterons les principaux algorithmes et techniques qui se cachent sous les formats gzip et brotli.
Nous aborderons également la négociation de contenu entre serveurs et navigateurs.

Ça sera l'occasion de rappeler les termes, d'évoquer des ordres de grandeur, de faire des démos et aussi de partager quelques astuces pour améliorer les performances de votre site web.
Car, oui, optimiser la compression de vos données, c'est un peu comme optimiser votre valise avant de partir en vacances : vous gagnez de la place, vous êtes plus efficace, et vous évitez de criser sur cette satanée fermeture éclair qui ne veut pas se fermer !

### EN

## Abstract court (140 caractères)

### FR

(Re)Découvrez les techniques de compression Web : gzip, brotli, négociation de contenu et bonnes pratiques pour améliorer les performances.

### EN

## Message pour le comité

### FR

Nous avons donné cette présentation au DevFest Nantes et nous avons eu de bons retours.
Depuis nous l'avons donné en interne chez Clever Cloud en ajoutant une démo sur la nouvelle spec de dictionnaires partagés.
Il s'agit donc d'un "back to basics" mais avec un peu de nouveauté dedans.
C'est un sujet qui nous passionne et que nous avons creusé tous les deux à notre manière depuis plus d'un an.
Notre présentation inclue des petites démos et des slides interactifs pour expliquer les algos.

Une personne qui a suivi la présentation repart avec :

* une vision claire de la nécessité de la compression dans le Web avec des ordres de grandeur
* une connaissance des algos à la base de gzip et brotli (code de Huffman et LZ77)
* une compréhension de la négociation de contenu HTTP entre serveurs et navigateurs
* quelques conseils de réglages à appliquer sur un serveur (niveaux, formats...)

Cette présentation s'adresse donc à des devs frontend, backend, novice pour de la découverte ou expert pour certains rappels.

### EN

## Idées de titre

=> La compression Web : comment (re)prendre le contrôle ?

Autres idées :

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
