module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "mocha": true
    },
    "extends": ["eslint:recommended"],
    "parser": "babel-eslint",
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": [
            "error",{
                "allow": ["warn", "error", "info"]
            }
        ],
        "parserOptions": {
            "ecmaVersion": 6,
            "sourceType": "script"
        },
    }
};
// module.exports = {
//     "extends": ["eslint:recommended"],
//     "rules": {
//         "no-console": ["error", {
//         "allow": ["warn", "error", "info"]
//         }]
//     },
//     "parser": "babel-eslint",
//     "parserOptions": {
//         "ecmaVersion": 6,
//         "sourceType": "script"
//     },
//     "globals": {
//     },
//     "env": {
//         "node": true,
//         "es6": true,
//         "mocha": true
//     }
// };
