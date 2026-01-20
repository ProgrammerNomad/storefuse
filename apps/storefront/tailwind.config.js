const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'app/**/*.{js,ts,jsx,tsx,mdx}'),
    join(__dirname, 'components/**/*.{js,ts,jsx,tsx,mdx}'),
  ],
};
