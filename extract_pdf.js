const fs = require('fs');
const pdf = require('pdf-parse');

async function extract() {
    try {
        console.log('Reading files...');
        const beforeBuffer = fs.readFileSync('public/Before Book.pdf');
        const mainBuffer = fs.readFileSync('public/Main Book.pdf');

        console.log('Parsing Before Book...');
        const before = await pdf(beforeBuffer);

        console.log('Parsing Main Book...');
        const main = await pdf(mainBuffer);

        console.log('Writing output...');
        fs.writeFileSync('extract_output.json', JSON.stringify({
            before: before.text,
            main: main.text
        }, null, 2));

        console.log('Extraction complete!');
    } catch (e) {
        console.error('Error extracting PDF:', e);
    }
}

extract();
