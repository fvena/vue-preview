import type { SFCDescriptor, SFCBlock } from '@vue/compiler-sfc';

/**
 * Type guard to check if a value is not null or undefined
 */
function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  if (value === null || value === undefined) return false;
  return true;
}

/**
 * Convert a SFCDescriptor to a string
 * 
 * @param sfcDescriptor
 */
function toString(sfcDescriptor: SFCDescriptor): string {
  const {
    template,
    script,
    scriptSetup,
    styles,
    customBlocks
  } = sfcDescriptor;

  return [template, script, scriptSetup, ...styles, ...customBlocks]
    // remove empty blocks
    // some blocks are optional and may be undefined (e.g. scriptSetup, template, ...)
    .filter(notEmpty)
    // generate open and close tags
    .map(block => {
      return Object.assign({}, block, {
        openTag: makeOpenTag(block),
        closeTag: makeCloseTag(block)
      });
    })
    // generate sfc source
    .reduce((sfcCode, block) => {
      return sfcCode
        + block.openTag
        + block.content
        + block.closeTag;
    }, '');
}

/**
 * Generate an open tag from a SFCBlock
 */
function makeOpenTag(block: SFCBlock): string {
  let source = '<' + block.type;

  source += Object.keys(block.attrs)
    .sort()
    .map(name => {
      const value = block.attrs[name];

      if (value === true) {
        return name;
      } else {
        return `${name}="${value}"`;
      }
    })
    .map(attr => ' ' + attr)
    .join('');

  return source + '>';
}

/**
 * Generate a close tag from a SFCBlock
 */
function makeCloseTag(block: SFCBlock): string {
  return `</${block.type}>\n`
}

export { toString }