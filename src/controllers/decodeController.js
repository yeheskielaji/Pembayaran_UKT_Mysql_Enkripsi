import decodeService from '../services/decodeService';

async function getPageForDecoding(req, res) {
    // Render halaman untuk melakukan proses dekode
    return res.render("decode.ejs", {
        errors: req.flash("errors"),
        user: req.user,
        decodedText: null,
    });
}

async function processDecoding(req, res) {
    try {
        if (!req.file) {
            throw new Error('No file uploaded');
        }

        const imagePath = `src/images/${req.file.filename}`;
        const decodedText = await decodeService.extractHiddenDataFromImage(imagePath);
        console.log(decodedText);

        return res.render('decode.ejs', { decodedText });
    } catch (error) {
        console.log(error);
        return res.status(500).send('Failed to extract hidden data');
    }
}

module.exports = {
    getPageForDecoding: getPageForDecoding,
    processDecoding: processDecoding,
};
