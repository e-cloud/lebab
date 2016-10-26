/* eslint-disable */
// hack ast-types
const Type = require("ast-types").Type
const def = require("ast-types").Type.def
const or = require("ast-types").Type.or
const use = require("ast-types").use
const defaults = use(require("ast-types/lib/shared")).defaults;
const types = use(require('ast-types/lib/types'))

//Type.log()

def("ImportRequireDeclaration")
  .bases("Declaration")
  .build("specifiers", "source")
  .field("specifiers", [
    or(
      def("ImportSpecifier"),
      def("ImportNamespaceSpecifier"),
      def("ImportDefaultSpecifier")
    )
  ], defaults.emptyArray)
  .field("source", def("Expression"))

types.finalize()

//console.log('\n\n\n///////////////////////////////////////\n\n\n')
//Type.log()

// hack babel-generator
const jsesc = require('jsesc')
const babelTypes = require('babel-generator/lib/generators/types')
const t = require('babel-types')
babelTypes.StringLiteral = function StringLiteral(node, parent) {
  let val = jsesc(node.value, {
    quotes: t.isJSX(parent) ? "double" : this.format.quotes,
    wrap: true
  });

  return this.token(val);
}

// hack espree
const nodeTypes = require('espree/lib/ast-node-types')
nodeTypes.ImportRequireDeclaration = 'ImportRequireDeclaration'

// hack estraverse
const estraverse = require('estraverse')
const visitorKeys = estraverse.VisitorKeys
const syntax = estraverse.Syntax
visitorKeys.ImportRequireDeclaration = ['specifiers', 'source']
syntax.ImportRequireDeclaration = 'ImportRequireDeclaration'

// hack recast printer
require('./printer')
