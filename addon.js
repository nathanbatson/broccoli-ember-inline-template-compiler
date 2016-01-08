var checker = require('ember-cli-version-checker');
var inlineTemplateCompiler = require('./index');
var path = require('path');
// for ember-cli always use the bower version of the ember template compiler
var compiler;

module.exports = {
    name: 'broccoli-ember-inline-template-compiler',
    init: function() {
        compiler = require(path.join(this.project.root, './bower_components/ember/ember-template-compiler.js'));
    },
    _setupPreprocessorRegistry: function(type, registry) {
        registry.add('js', {
            name: 'broccoli-ember-inline-template-compiler',
            ext: 'js',
            toTree: function(tree) {
                return inlineTemplateCompiler(tree, {
                    compiler: compiler
                });
            }
        });
    },
    included: function(app) {
        this._super.included.apply(this, arguments);
        var enabled = (app.options.emberInlineTemplateCompiler && app.options.emberInlineTemplateCompiler.enabled) || false;
        if (enabled) {
            this._setupPreprocessorRegistry('parent', app.registry);
        }
    }
};
