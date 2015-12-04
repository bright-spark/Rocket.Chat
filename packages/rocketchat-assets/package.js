Package.describe({
	name: 'rocketchat:assets',
	version: '0.0.1',
	summary: '',
	git: ''
});

Package.onUse(function(api) {
	api.versionsFrom('1.0');

	api.use([
		'coffeescript',
		'underscore',
		'webapp',
		'rocketchat:file',
		'rocketchat:lib@0.0.1'
	]);

	api.addFiles('server/assets.coffee', 'server');
});

Npm.depends({
	"image-size": "0.4.0"
});

Package.onTest(function(api) {

});
