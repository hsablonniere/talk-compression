import { parseArgs } from 'util';
import path from 'path';
import fs from 'fs';

export function getParams () {

  const args = parseArgs({
    allowPositionals: true,
    options: {
      decompress: {
        type: 'boolean',
        short: 'd',
        default: false,
      },
    },
  });

  const [filepath] = args.positionals;
  const absoluteFilePath = (filepath != null)
    ? path.join(process.cwd(), filepath)
    : 0;
  const input = Array.from(fs.readFileSync(absoluteFilePath));

  return {
    options: args.values,
    input,
  };
}
