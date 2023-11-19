const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

// Function to hide a message in an image using LSB technique
async function hideMessageInImage(paymentData, imagePath) {
    try {
        const img = await loadImage(imagePath);
        const canvas = createCanvas(img.width, img.height);
        const ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // pesan yang disisipkan (hanya boleh berjumlah 21 karakter)
        const message = 'bukti_pembayaran_asli';

        // Convert the message into an array of bits
        const binaryMessage = message.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('');

        // Hide message in the image using LSB
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let messageIndex = 0;
        for (let i = 0; i < data.length; i += 4) {
            for (let j = 0; j < 3; j++) {
                if (messageIndex < binaryMessage.length) {
                    data[i + j] = (data[i + j] & ~1) | parseInt(binaryMessage[messageIndex], 2);
                    messageIndex++;
                } else {
                    break;
                }
            }
        }
        ctx.putImageData(imageData, 0, 0);

        // Save the modified image, replacing the original image
        const outputImagePath = imagePath; // Use the same path as the original image
        const out = fs.createWriteStream(outputImagePath);
        const stream = canvas.createPNGStream();
        stream.pipe(out);

        return outputImagePath; // Return the path to the modified image
    } catch (err) {
        throw new Error('Failed to hide message in the image');
    }
}

async function extractMessageFromImage(imagePath) {
    try {
        const img = await loadImage(imagePath);
        const canvas = createCanvas(img.width, img.height);
        const ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Extracting message from the image using LSB
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let binaryMessage = '';
        for (let i = 0; i < data.length; i += 4) {
            for (let j = 0; j < 3; j++) {
                binaryMessage += (data[i + j] & 1).toString();
            }
        }

        // Convert the binary message to characters, considering only printable ASCII characters
        let extractedMessage = '';
        let printableCharsCount = 0;
        for (let i = 0; i < binaryMessage.length; i += 8) {
            const byte = binaryMessage.substr(i, 8);
            const charCode = parseInt(byte, 2);
            if (charCode >= 32 && charCode <= 126) { // Filtering printable ASCII characters
                extractedMessage += String.fromCharCode(charCode);
                printableCharsCount++;
                if (printableCharsCount === 21) {
                    break;
                }
            }
        }

        return extractedMessage;
    } catch (err) {
        throw new Error('Failed to extract message from the image');
    }
}

module.exports = {
    hideMessageInImage: hideMessageInImage,
    extractMessageFromImage: extractMessageFromImage,
};
