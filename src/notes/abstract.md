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
* expliquer les petits trains dans le réseau

* https://caniuse.com/sr_content-encoding-gzip

## Abstract

### FR

...

### EN

## Message pour le comité

### FR

...

### EN

## Idées de titre

Blagues avec le fait de "décompresser"
