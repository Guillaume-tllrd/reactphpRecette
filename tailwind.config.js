/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        pinyon: ['"Pinyon Script"', 'cursive'],
        scope: ['"Scope One"', 'cursive'],
      },
    },
  plugins: [],
}
}