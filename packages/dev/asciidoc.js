const fs = require('fs');
const path = require('path');
const Asciidoctor = require('asciidoctor');

const asciidoctor = Asciidoctor()

const data = fs.readFileSync(path.resolve('./src/quickstarts-data/asciidoc/TEMPLATE_PROCEDURE.adoc'), 'utf8');
const html = asciidoctor.convert(data, {
    standalone: false,
    safe: 'safe',
    base_dir: path.resolve('./src/quickstarts-data/asciidoc/')
});

console.log(html);