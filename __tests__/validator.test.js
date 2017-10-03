var validator = require('../lib/json-structure-validator');

describe('JSON Structure Validator', () => {

  it('should validate simple structures', () => {
    const structureTemplate = {
      id: '',
      foo: '',
      bar: '',
      baz: ''
    };

    const structureToTest = {
      id: '',
      foo: '',
      bar: '',
      baz: ''
    };

    expect(validator(structureTemplate, structureToTest)).toBeTruthy();
  });

  it('should validate nested structures', () => {
    const structureTemplate = {
      id: '',
      foo: '',
      bar: '',
      baz: {
        id: '',
        foo: ''
      },
      test: ''
    };

    const structureToTest = {
      id: '',
      foo: '',
      bar: '',
      baz: {
        id: '',
        foo: ''
      },
      test: ''
    };

    expect(validator(structureTemplate, structureToTest)).toBeTruthy();
  })

  it('should validate positive despite extra keys', () => {
    const structureTemplate = {
      baz: {
        id: '',
        foo: ''
      },
      test: ''
    };

    const structureToTest = {
      id: '',
      foo: '',
      bar: '',
      baz: {
        id: '',
        foo: ''
      },
      test: ''
    };

    expect(validator(structureTemplate, structureToTest)).toBeTruthy();
  });

  it('should validate using rich objects', () => {
    const structureTemplate = {
      id: 1,
      foo: 'some string',
      bar: 'ba',
      baz: {
        id: '',
        foo: 15
      },
      test: 0.1
    };

    const structureToTest = {
      id: 19,
      foo: '',
      bar: '',
      baz: {
        id: 'hello',
        foo: ''
      },
      test: ''
    };

    expect(validator(structureTemplate, structureToTest)).toBeTruthy();
  });
});


