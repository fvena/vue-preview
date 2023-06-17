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
  //
  // Agrupa los estilos por lang
  //
  const stylesGroup = styles.reduce((acc: SFCStyleBlock[], style: SFCStyleBlock) => {
    // Encuentra el índice del objeto con el mismo lang en el acumulador
    const index = acc.findIndex(item => item.lang === item.lang);

    if (index !== -1) {
      // Si se encuentra, concatena el contenido
      acc[index].content += style.content;
    } else {
      // Si no se encuentra, agrega un nuevo objeto
      acc.push(style);
    }
    return acc;
  }, [])

  //
  // Compila los estilos scss
  //
  const errors: string[] = []
  const compiles = await Promise.all(
    stylesGroup.map(async (style) => {
      if (style.lang === 'scss') {
        const result = await compileScss(style.content)
        if (result.error) errors.push(result.error)
        else style.content = result.code
        delete style.attrs.lang
      }

      return style
    })
  )

  return { styles: compiles, errors }
}

export { compileStyles }