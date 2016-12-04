import { PNG } from 'pngjs2';
import fs from 'fs';

const colorPromises = {};

// http://mikehadlow.blogspot.co.uk/2014/03/how-to-add-images-to-github-wiki.html

module.exports = function getImageDataForColor(colorValue, numberString) {
  if (!colorPromises[colorValue]) {
    colorPromises[colorValue] = new Promise((resolve) => {
      const png = new PNG({
        width: 12,
        height: 12,
      });

      const r = (colorValue >> 16);
      const g = (colorValue >> 8) & 255;
      const b = colorValue & 255;

      for (let y = 0; y < png.height; ++y) {
        for (let x = 0; x < png.width; ++x) {
          const idx = ((png.width * y) + x) << 2;

          if (x <= 1 || x >= png.width - 2 || y <= 1 || y >= png.height - 2) {
            // border

            png.data[idx] = 0x0;
            png.data[idx + 1] = 0x0;
            png.data[idx + 2] = 0x0;
            png.data[idx + 3] = 255;
          } else {
            png.data[idx] = r;
            png.data[idx + 1] = g;
            png.data[idx + 2] = b;
            png.data[idx + 3] = 255;
          }
        }
      }

      const filename = `images/${numberString}.png`;

      png.pack().pipe(fs.createWriteStream(`wiki/${filename}`));

      resolve(filename);
    });
  }

  return colorPromises[colorValue];
};
