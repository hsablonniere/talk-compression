echo js-math-example.js
echo brut : $(cat js-math-example.js | wc -c) brut
echo minifié : $(cat js-math-example.min.js | wc -c) min
echo compressé : $(cat js-math-example.js | gzip | wc -c) compressed
echo "minifié<br>& compressé : $(cat js-math-example.min.js | gzip | wc -c)" gzip

echo jquery-3.7.1.js
echo brut : $(cat jquery-3.7.1.js | wc -c) brut
echo minifié : $(cat jquery-3.7.1.min.js | wc -c) min
echo compressé : $(cat jquery-3.7.1.js | gzip | wc -c) compressed
echo "minifié<br>& compressé : $(cat jquery-3.7.1.min.js | gzip | wc -c)" gzip

echo lodash.4.17.21.js
echo brut : $(cat lodash.4.17.21.js | wc -c) brut
echo minifié : $(cat lodash.4.17.21.min.js | wc -c) min
echo compressé : $(cat lodash.4.17.21.js | gzip | wc -c) compressed
echo "minifié<br>& compressé : $(cat lodash.4.17.21.min.js | gzip | wc -c)" gzip

echo bootstrap.css
echo brut : $(cat bootstrap.css | wc -c) brut
echo minifié : $(cat bootstrap.min.css | wc -c) min
echo compressé : $(cat bootstrap.css | gzip | wc -c) compressed
echo "minifié<br>& compressé : $(cat bootstrap.min.css | gzip | wc -c)" gzip

echo hibernate_user_guide.html
echo brut : $(cat hibernate_user_guide.html | wc -c) brut
echo minifié : $(cat hibernate_user_guide.min.html | wc -c) min
echo compressé : $(cat hibernate_user_guide.html | gzip | wc -c) compressed
echo "minifié<br>& compressé : $(cat hibernate_user_guide.min.html | gzip | wc -c)" gzip

echo firefox.svg
echo brut : $(cat firefox.svg | wc -c) brut
echo minifié : $(cat firefox.min.svg | wc -c) min
echo compressé : $(cat firefox.svg | gzip | wc -c) compressed
echo "minifié<br>& compressé : $(cat firefox.min.svg | gzip | wc -c)" gzip

echo departements-region.json
echo brut : $(cat departements-region.json | wc -c) brut
echo minifié : $(cat departements-region.min.json | wc -c) min
echo compressé : $(cat departements-region.json | gzip | wc -c) compressed
echo "minifié<br>& compressé : $(cat departements-region.min.json | gzip | wc -c)" gzip
