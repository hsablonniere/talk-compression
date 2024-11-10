---
authors:
  - name: Antoine Caron
    title: Engineering manager Frontend
    avatar: https://pbs.twimg.com/profile_images/1633242263860965376/iw95gEVA_400x400.jpg
    bio: développeur frontend passionné qui essaie de faire du code de qualité tout en s'amusant. Il a une expertise solide en développement Web, React et frontend, et a travaillé chez M6web/Bedrock Streaming depuis 2017 en tant que Lead Frontend Developer. Il a enseigné également à Polytech Lyon. Très impliqué dans les communauté open source mais également les communautés locales, Antoine a repris avec quelques amis les rênes du Meetup LyonJS depuis 2020.
  # @TODO:Hubert Je te laisse remplir ta bio
  - name: Hubert Sablionnière
    title: Engineering manager Backend
    avatar:
    bio:
---

# La compression web

Alors que vous lisez ces lignes des millions de requêtes HTTP sont échangées sur le web.
Des millions de clients s'affèrent à décompresser leurs contenu alors que des millions de serveurs ont de leur coté compressés.
Et ça, pour nous Hubert et Antoine, ça nous facine, alors on a passé beaucoup de temps à étudier ce sujet afin de vous en partager l'essentiel ici.
On risque de glisser quelques discrètes références au jeu du Scrabble.

## Le lexique

Avant de creuser un peu le sujet il est imporant de bien comprendre les termes utilisés.
Quand on parle de compression, le monde se divise en deux catégories :

- La compression sans perte de données
- La compression avec perte de données

En général, on associe la compression avec perte de données à des formats d'images ou d'audio/vidéo : JPEG, MP3 ou MPEG.
Mais en fait, sur le Web, on retrouve également de la compression avec perte de données, sur du JavaScript, du CSS ou encore du HTML.
Et dans ces cas là, on parle de **minification**.

Prenons un exemple simple avec ce code JavaScript :

```javascript
export function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

// Recursive FTW!
export function factorial(number) {
  if (number === 0) {
    return 1;
  }
  return number * factorial(number - 1);
}
```

Pour l'instant, le fichier fait 228 octets, le **minifier** va le transformer car il connait la syntaxe du langage.
Il va retirer les points-virgules, les commentaires qui ne changent pas le comportement du code.

```javascript
export function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

export function factorial(number) {
  if (number === 0) return 1;

  return number * factorial(number - 1);
}
```

On gagne déjà quelques octets en passant à 203 octets.
Mais le minifieur va aller bien plus loin que ça, en ajustant la syntaxe javascript de manière bien plus fine.

Par exemple ici:

- Il va transformer un `if` en une ternaire
- Supprimer les sauts de lignes
- Supprimer les espaces inutiles

Pour arriver à un résultat le plus petit possible sans changer le fonctionnement du code.

```javascript
export function add(f, s) {
  return f + s;
}
export function factorial(n) {
  return n === 0 ? 1 : n * factorial(n - 1);
}
```

Et ça, c'est qu'un exemple assez simple des transformations qu'un minifieur moderne est capable de faire.
Une fois qu'on a atteint les limites de ce qu'on peut faire avec la minification, on va appliquer de la **compression**.

Le compresseur, _l'outil dont on va se servir pour compresser le contenu du fichier sans perte_, ne connait pas la syntaxe du langage du fichier qu'il va compresser.
Il va lui agire directement sur les octets du fichier, en utilisant des algorithmes de compression.
Sur l'exemple précédent, en appliquant la minification on est passé à 98 octets, et en appliquant la compression on passe à un fichier de 89 octets.
Belle économie, non ?

Nous vous l'accordons, cet exemple n'est pas très représentatif, voyons donc sur des exemples plus représentatifs.

<!-- @TODO: Hubert
J'aurai bien inséré les SVG des charts directement dans le dom en ajoutant les bons attribut html pour la description
Tu en penses quoi ?
Sinon on peut exporter le svg avec un alt ou fig/figcaption
-->

<!-- Insérer barchat JQUERY-->
<!-- Insérer barchat DOC Hibernate-->

Sur ces graphiques, on comprends que la minification apporte de bons résultats.
Cela dépend quand même du format du fichier, sur un fichier HTML il y a souvent peut de code inutile à supprimer.
Cependant ce qu'il faut retenir et noter c'est que **la compression apporte toujours des meilleurs résulats quand elle est précédée d'une étape de minification**.

## Quels impact pour les utilisateurs·rices ?

- Exemple de la page du Scrabble de wiki
- Un site c'est un ensemble de requetes en cascades
- Montrer les webpage test dans différentes conditions
- expliquer qu'en 2024 il faut encore compresser
- montrer l'almanac du web
- graph des résulats de 2022

## Dans les tuyaux

<!-- @TODO: Hubert Si t'as des idées de comment structurer/résumer cette partie -->

## Un peu d'histoire

## Huffman

## LZ77

## Et concretement ?

## À la recherche du pouillème

## Au dela du poullième

## Conclusion

Dans cet article nous avons essayé de faire de le tour de ce qui nous parait essentiel pour comprendre la compression dans le monde du Web.
Bon, nous avons aussi inséré discrètement quelques références au Scrabble.
Retenez donc ces neufs rappels et principes.

1. La compression va de pair avec la minification.
2. La compression est encore nécessaire en 2024.
3. La compression est natif au fonctionnement du Web.
4. La compression n'interrompt pas le flux.
5. L'algorithme de Huffman c'est un peu comme c _lettre compte moins_.
6. C'est _mot compte moins_.
7. La compression dans le web ça marche mieux avec brotli.
8. Les fichiers statiques se compressent une seule fois au build.
9. La compression n'a pas d'effet sur les fichiers déjà compressés.

Si cet article vous a plu il existe plusieurs captations d'une conférence que nous avons donné dans différentes villes de France.
En voici une donnée en 2023 à Nantes.

https://www.youtube.com/watch?v=JARVYdwNSrI
