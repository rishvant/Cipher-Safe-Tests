import PDFDocument from 'pdfkit';
import { PassThrough } from 'stream';

const generatePdf = () => {
    const doc = new PDFDocument();
    const stream = new PassThrough();

    doc.pipe(stream);

    doc.text('Content of pdf file', {
        align: 'center'
    });

    doc.end();

    return stream;
};

export default generatePdf;
