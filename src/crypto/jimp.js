// const Jimp = require('jimp');
// const path = require('path');
// const fs = require('fs');

// const encryptImage = async (imagePath) => {
//     const image = await Jimp.read(imagePath);
//     image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
//         // Manipulasi piksel atau enkripsi gambar di sini
//         this.bitmap.data[idx + 2] ^= 128; // Contoh: ubah bit terakhir dari warna biru
//     });
//     const encryptedImagePath = path.join(__dirname, '..', 'images', 'encrypted-' + path.basename(imagePath));
//     await image.writeAsync(encryptedImagePath);

//     return encryptedImagePath;
// };

// const decryptImage = async (imageBuffer) => {
//     // Fungsi untuk dekripsi gambar jika diperlukan
//     // ...
// };

// module.exports = {
//     encryptImage,
//     decryptImage,
// };



// // import Jimp from 'jimp';

// function encryptImage(imagePath) {
//     const image = Jimp.read(imagePath);
//     image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
//         const pixel = image.getPixelColor(x, y);
//         const { r, g, b } = Jimp.intToRGBA(pixel);
//         const newPixel = Jimp.rgbaToInt(r, g, b, 200);
//         image.setPixelColor(newPixel, x, y);
//     });
//     return image;
// };


// function decryptImage(encryptedImage) {
//     encryptedImage.scan(0, 0, encryptedImage.bitmap.width, encryptedImage.bitmap.height, (x, y, idx) => {
//         const pixel = encryptedImage.getPixelColor(x, y);
//         const { r, g, b, a } = Jimp.intToRGBA(pixel);
//         const newPixel = Jimp.rgbaToInt(r, g, b, 255);
//         encryptedImage.setPixelColor(newPixel, x, y);
//     });
//     return encryptedImage;
// };

// module.exports = {
//     encryptImage,
//     decryptImage,
// };
