module.exports = {
    presets: [
        '@vue/app'
    ],
    plugins: [
        ['babel-plugin-remove-attribute', {
            attribute: 'data-jest',
        }],
        ["module-resolver", {
            "alias": {
                "@": "./src",
            }
        }],
    ],
}
