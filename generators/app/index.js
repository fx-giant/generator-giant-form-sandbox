'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const formPackFolder = "source";

module.exports = class extends Generator {
	prompting() {
		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the cat\'s meow ' + chalk.red('generator-giant-form-sandbox') + ' generator!'
		));

		const prompts = [{

			name: 'formPackName',
			message: 'Give a name to your form pack (camel case)',
			default: 'sampleFormPack'
		}];

		return this.prompt(prompts).then(props => {
			// To access props later use this.props.someAnswer;
			this.props = props;
		});
	}

	writing() {
		var justCopy = [
			'package.json',
			'packs/.gitkeep',
		];
		var copyWithRender = [
			'packer.js',
			'config.json',
			'forms',
		];

		var formName = this.props.formPackName;
		var formId = guid();
		var templateValues = {
			formName: formName,
			formId: formId,
		};
		for (var i = 0; i < justCopy.length; i++) {
			var file = justCopy[i];
			this.fs.copy(
				this.templatePath(file),
				this.destinationPath(formName + "/" + file)
			)
		}
		for (var i = 0; i < copyWithRender.length; i++) {
			var file = copyWithRender[i];
			this.fs.copyTpl(
				this.templatePath(file),
				this.destinationPath(formName + '/' + file).replace(new RegExp('{{formName}}', 'g'), formName),
				templateValues
			);
		}

		function guid() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000)
					.toString(16)
					.substring(1);
			}
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
				s4() + '-' + s4() + s4() + s4();
		}
	}

	install() {

	}

};