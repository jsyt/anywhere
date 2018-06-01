module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "parser": "babel-eslint",
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
        // "semi": [
        //     "error",
        //     "always"
        // ],
        "no-console": [
            "error",{
                "allow": ["warn", "error", "info"]
            }
        ],
        "parser": "babel-eslint"
    }
};
