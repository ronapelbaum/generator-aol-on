'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const toDash = str => str
.replace(/^([A-Z])/g, $1 => $1.toLowerCase())
.replace(/(\s)/g, $1 => "-")
.replace(/([A-Z])/g, $1 => "-"+$1.toLowerCase());

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the fabulous ' + chalk.red('generator-aol-on') + ' generator!'
      ));

    const prompts = [
    {
      type: 'input',
      name: 'name',
      message: 'Your project name',
    //Defaults to the project's folder name if the input is skipped
    default: this.appname
  },
  {
    type: 'input',
    name: 'main',
    message: 'Main class name',
    //Defaults to the project's folder name if the input is skipped
    default: 'MainClass'
  }];

  return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
}

writing() {
  let main = this.props.main,
  mainFile = toDash(main);
  this.fs.copyTpl(
    this.templatePath('script.js'),
    this.destinationPath(`src/${mainFile}.js`),
    { main: main }
    );
  //this.fs.copyTpl(
    // this.templatePath('.npmrc'),
    // this.destinationPath('.npmrc')
    // );
  this.fs.copyTpl(
    this.templatePath('package.json'),
    this.destinationPath('package.json'),
    { appname: toDash(this.props.name),
      mainFile: mainFile }
      );
}

install() {
  this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });

  this.npmInstall([
  //   'aol-on-infra-utils',
    'eslint',
    'eslint-config-o',
    'istanbul',
    'jasmine-core',
    'karma',
    'karma-chrome-launcher',
    'karma-cli',
    'karma-closure',
    'karma-coverage',
    'karma-generic-preprocessor',
    'karma-htmlfile-reporter',
    'karma-jasmine',
    'karma-junit-reporter',
    'karma-phantomjs-launcher',
    'phantomjs-prebuilt',
    ], { 
      'save-dev': true,
      'registry': 'https://artifactory-prod.vidible.aolcloud.net/artifactory/api/npm/libs-npm',
      'email': 'npm-push@teamaol.com'
    });


  

}
};
