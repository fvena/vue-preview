import * as defaultCompiler from 'vue/compiler-sfc'
import { toString } from './descriptor-to-string';
import { compileStyles } from './compile';
import type { CompilerError } from '@vue/compiler-sfc';

export type ParseResult = {
  code: string;
  errors?: CompileError[];
};

export type CompileError = {
  line?: number;
  message: string;
}

/**
 * Parse a Vue component string
 * 
 * @param vueComponentString - Vue component string
 * @returns 
 */
async function parseVueComponent(vueComponentString: string): Promise<ParseResult> {
  //
  // parse string component
  //
  const compiler = defaultCompiler
  const { errors, descriptor } = compiler.parse(vueComponentString)

  if (errors.length) {
    const compileErrors = errors.map(error => ({
      line: (error as CompilerError).loc?.start.line,
      message: error.message
    }))

    return {
      code: '',
      errors: compileErrors
    }
  }

  //
  // Compile scss|sass styles
  //
  const { errors: errorsStyles, styles } = await compileStyles(descriptor.styles)

  if (errorsStyles.length) {
    const compileStylesErrors = errorsStyles.map(error => ({
      message: error
    }))

    return {
      code: '',
      errors: compileStylesErrors
    }
  }

  descriptor.styles = styles

  //
  // Compile pug template
  //
  const templateLang = descriptor.template?.lang
  const templateContent = descriptor.template?.content

  if (templateContent && templateLang === 'pug') {
    // console.log('Template content PUG:', templateContent)
  }

  //
  // Return code
  //
  return {
    code: toString(descriptor),
  }
}

export { parseVueComponent }