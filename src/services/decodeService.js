const steganografi = require('../crypto/steganografi');

async function extractHiddenDataFromImage(imagePath) {
    try {
        const extractedMessage = await steganografi.extractMessageFromImage(imagePath);
        return extractedMessage;
    } catch (error) {
        throw new Error('Gagal extract message text');
    }
}

module.exports = {
    extractHiddenDataFromImage: extractHiddenDataFromImage,
};
