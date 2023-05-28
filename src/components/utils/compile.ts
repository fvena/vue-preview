import { compile } from 'sass.js';
import type { SFCStyleBlock } from '@vue/compiler-sfc';

type CompileResult = {
  code: string;
  error?: string;
}

export type StylesResult = {
  styles: SFCStyleBlock[];
  errors: string[];
}

/**
 * Compile a scss|sass string to css string
 * 
 * @param scss - scss string
 * @returns css string
 */
function compileScss(scss: string): Promise<CompileResult> {
  return new Promise((resolve) => {
    compile(scss, (result: any) => {
      if (result.status === 0) {
        resolve({ code: `\n${result.text}` })
      } else {
        resolve({ code: '', error: result.message })
      }
    })
  })
}

async function compileStyles(styles: SFCStyleBlock[]): Promise<StylesResult> {
  const compiles = await Promise.all(
    styles.map(async (style) => {
      let error

      if (style.lang === 'scss') {
        const result = await compileScss(style.content)
        style.content = result.code
        error = result.error
        delete style.attrs.lang
      }

      return { style, error }
    })
  )

  return compiles.reduce((acc, { style, error }) => {
    acc.styles.push(style)
    if (error) acc.errors.push(error)
    return acc
  }, { styles: [], errors: [] } as StylesResult)
}

export { compileStyles }