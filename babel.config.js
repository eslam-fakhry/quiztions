module.exports = function (api) {
    let alias;

    if (!api.env("test")) {
        alias = {
            "@": "./src",
        };
    }

    api.cache(true);

    return {
        presets: [
            '@vue/app'
        ],
        plugins: [
            ['babel-plugin-remove-attribute', {
                attribute: 'data-jest',
            }],
            ["module-resolver", {
                "alias": alias,
                "extensions": [".js", ".vue"]
            }],
        ],
    }
}
