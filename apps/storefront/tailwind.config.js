const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'app/**/*.{js,ts,jsx,tsx,mdx}'),
    join(__dirname, '../../packages/themes/*/src/**/*.{js,ts,jsx,tsx,mdx}'),
    join(__dirname, '../../packages/modules/*/src/**/*.{js,ts,jsx,tsx,mdx}'),
    join(__dirname, '../../packages/core/src/**/*.{js,ts,jsx,tsx,mdx}'), 
  ],
};
