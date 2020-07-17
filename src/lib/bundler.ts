import * as Babel from '@babel/standalone';
import * as Parser from '@babel/parser';
import traverse from '@babel/traverse';
import request from 'superagent';

export async function bundle(
  inputCode: string,
  packages: Map<string, { version: string; raw: string }>
) {
  const ast = Parser.parse(inputCode, {
    sourceType: 'module',
    plugins: ['jsx']
  });

  const transformed = Babel.transform(inputCode, {
    presets: ['es2015', 'react']
  }).code;

  let reqBody = {
    options: {
      debug: true
    },
    dependencies: {}
  };

  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      const packageName = node.source.value;
      const packageValue = packages.get(packageName);

      if (packageValue) {
        (reqBody.dependencies as any)[packageName] = 'latest';
      }
    }
  });

  request
    .post('https://wzrd.in/multi')
    .send(reqBody)
    .end((err, resp) => {
      if (err) {
        var errText = err.response && err.response.text;

        return errText;
      } else if (resp.status == 500) {
        return resp.text;
      }

      var bundled = resp.body;

      return `setTimeout(function(){${bundled}${transformed}}, 0)`;
    });
}
