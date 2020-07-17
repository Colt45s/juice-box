import React, { useRef, useLayoutEffect } from 'react';
import { transpile } from '../../lib/transpile';

type Props = {
  code: string;
  packages: Map<string, { version: string; latest: string }>;
};

function makeIframe(option: {
  head?: string;
  body: string;
  sandboxAttributes?: string[];
}) {
  const html = parseToHTML(option);
  if (!html) return;
  const iframe: any = document.createElement('iframe');
  const blob = new Blob([html], { type: 'text/html' });

  // eslint-disable-next-line no-undef
  const U = typeof URL !== 'undefined' ? URL : webkitURL;
  iframe.src = U.createObjectURL(blob);

  const sandboxOption = option.sandboxAttributes
    ? option.sandboxAttributes.join(' ')
    : 'allow-script';

  iframe.sandbox = sandboxOption;

  return iframe;
}

function parseToHTML(option: { head?: string; body: string }): string {
  const head =
    typeof option.head === 'undefined'
      ? '<style type="text/css"> html, body { margin: 0; padding: 0; border: 0; } </style>'
      : option.head;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        ${head}
      </head>
      <body>
        ${option.body}
      </body>
    </html>`;
  return html;
}

export function Preview(props: Props) {
  const previewRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<any>(null);
  // const [errorState, updateErrorState] = useState({
  //   isError: false,
  //   message: ''
  // });

  useLayoutEffect(() => {
    const createPreview = async () => {
      if (previewRef.current) {
        let bodyTag = '';
        try {
          const transpiled = await transpile(props.code);
          const code = `<script type="text/javascript">${transpiled}</script>`;

          const cdn = Array.from(props.packages.values()).reduce(
            (acc, current) =>
              acc + `<script crossorigin src=${current.latest}></script>\n`,
            ''
          );

          bodyTag = `<div id="root" style="overflow: auto;"></div>${cdn}${code}`;
        } catch (error) {
          bodyTag = `<div style="color: red;">${error.toString()}</div>`;
        }

        previewRef.current.innerHTML = '';

        const iframe = makeIframe({
          body: bodyTag,
          sandboxAttributes: [
            'allow-forms',
            'allow-popups',
            'allow-scripts',
            'allow-same-origin',
            'allow-modals'
          ]
        });

        iframe.setAttribute('scrolling', 'yes');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = '0';

        iframeRef.current = iframe;

        // iframeRef.current.addEventListener('load', () => {
        //   if (iframeRef.current.contentWindow) {
        //     iframeRef.current.contentWindow.onerror = (
        //       errorMsg: string,
        //       url: string,
        //       lineNumber: any
        //     ) => {
        //       console.log(url);
        //       console.log(lineNumber);
        //       updateErrorState({
        //         isError: true,
        //         message: errorMsg
        //       });
        //       return true;
        //     };
        //   }
        // });

        previewRef.current.appendChild(iframeRef.current);

        // return () => {
        //   iframeRef.current.removeEventListener('load', () => {
        //     if (iframeRef.current.contentWindow) {
        //       iframeRef.current.contentWindow.onerror = (e: string) => {
        //         updateErrorState({
        //           isError: true,
        //           message: e
        //         });
        //       };
        //     }
        //   });
        // };
      }
    };

    createPreview();
  }, [props.code]);

  return (
    <div>
      <div ref={previewRef} />
    </div>
  );
}
