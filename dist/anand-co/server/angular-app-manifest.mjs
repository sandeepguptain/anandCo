
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 7173, hash: '416eec2a718face21d05812a7cb1d685dd42bfd3c5ea995741a7076d6e9ae957', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1080, hash: '67f0517aba351862f9b7d6b36662f25b4969a37d1ef901f42436cbf462180145', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 50069, hash: 'b52e8df837bf7d7c49793b1e2742d31d5b29641875e9d18e646fcec8aef3f454', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-IV6N3KF2.css': {size: 402384, hash: '3ojMax1Mo24', text: () => import('./assets-chunks/styles-IV6N3KF2_css.mjs').then(m => m.default)}
  },
};
