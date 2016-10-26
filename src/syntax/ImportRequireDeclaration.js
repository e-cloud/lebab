import BaseSyntax from './BaseSyntax';

/**
 * The class to define the ImportDeclaration syntax
 */
export default
class ImportRequireDeclaration extends BaseSyntax {
  constructor({specifiers, source}) {
    super('ImportRequireDeclaration');
    this.specifiers = specifiers;
    this.source = source;
  }
}
