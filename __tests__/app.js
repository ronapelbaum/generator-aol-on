'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-aol-on:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ main: 'MainClass' });
  });

  it('creates files', () => {
    assert.file(['package.json']);
    assert.file(['src/main-class.js']);
  });
});
