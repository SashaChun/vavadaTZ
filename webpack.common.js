const path = require('path');

module.exports = {
  entry: {
    app: './js/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './js/app.js',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp|svg|ico)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][hash][ext]',
        },
      },
    ],
  },
};
