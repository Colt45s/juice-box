import * as Babel from '@babel/standalone';
import umd from '@babel/plugin-transform-modules-umd';
import env from '@babel/preset-env';

Babel.registerPreset('env', env);
Babel.registerPlugin('umd', umd);

export function transpile(code: string) {
  try {
    return Babel.transform(code, {
      presets: [
        [
          'env',
          {
            useBuiltIns: 'usage',
            corejs: 3
          }
        ],
        'es2015',
        'react'
      ],
      plugins: [
        [
          'umd',
          {
            exactGlobals: true
          }
        ]
      ]
    }).code;
  } catch (error) {
    throw new Error(error);
  }
}
