/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#1E1E1E',
        'electric-blue': '#6B9DFF',
        'electric-blue-hover': '#5A8EFF',
        'text-primary': '#111827',
        'text-secondary': '#6B7280',
        'border-color': '#E5E7EB',
      },
      fontFamily: {
        sans: ['Cabin', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'h1': ['36px', { lineHeight: '44px', fontWeight: '700' }],
        'h2': ['28px', { lineHeight: '36px', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '20px', fontWeight: '400' }],
      },
      borderRadius: {
        'button': '8px',
        'card': '12px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
      },
      backgroundColor: {
        'primary': '#FFFFFF',
        'secondary': '#F4F6F8',
      },
      padding: {
        'hero': '60px',
      },
    },
  },
  plugins: [],
}
