import { transformSlides } from './src/slides-transformer.mjs';
import fs from 'fs';

export default {
  port: 8080,
  hostname: '0.0.0.0',
  nodeResolve: true,
  watch: true,
  plugins: [{
    serverStart ({ fileWatcher }) {
      fileWatcher.add('*.slides.md');
    },
    serve (context) {
      const path = (context.path === '/')
        ? '/index.slides.html'
        : context.path;
      if (path.endsWith('.slides.html')) {
        const slidesMdPath = '.' + path.replace(/\.slides\.html$/, '.slides.md');
        const fileContent = fs.readFileSync(slidesMdPath, 'utf8');
        return {
          type: 'html',
          body: transformSlides(fileContent),
        };
      }
    },
  }],
};
