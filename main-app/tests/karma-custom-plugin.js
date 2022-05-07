const applyCustomConfig = function(config) {
    config.customContextFile = require('path').join(__dirname, './karma-context.html');
}

module.exports = {
    'framework:karma-custom-env': ['factory', applyCustomConfig],
}
