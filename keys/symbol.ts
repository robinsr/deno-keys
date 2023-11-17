import KeyboardKey, { DEFAULT_OPTS } from './keyboard-key.ts';
import { KeySym, KeyType } from './key-types.ts';
import keys from './key-data.ts';

const isKeyType = (str: string): str is KeyType => {
  return [ 'alpha', 'mod', 'arrow', 'ws', 'fn', 'numpad'].includes(str);
}

const range = (start: number, stop: number, step = 1): number[] =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

export const SYMBOL_MAP: Record<string, KeyboardKey> = {
  'unknown': new KeyboardKey('?', DEFAULT_OPTS)
};

Array.from(keys).forEach(key => {
  SYMBOL_MAP[key.name] = new KeyboardKey(key.name, key)
});

const fKeys = range(1,20)
  .map(num => `f${num}`)
  .map(key => new KeyboardKey(key, { ...DEFAULT_OPTS,
    id: key,
    type: 'fn',
    aliases: [ key.toUpperCase() ]
  }));

const alphaKeys = range(97, 122)
  .map(num => String.fromCharCode(num))
  .map(alpha => new KeyboardKey(alpha, {
    ...DEFAULT_OPTS,
    id: alpha,
    type: 'alpha',
    aliases: [ alpha.toUpperCase() ]
  }));

const numPadKeys = range(0, 9)
  .map(num => new KeyboardKey(`numpad${num}`, { ...DEFAULT_OPTS,
    id: `numpad${num}`,
    type: 'numpad',
    aliases: [ num.toString(10) ]
  }));

const numRowKeys = '`~ 1! 2@ 3# 4$ 5% 6^ 7& 8* 9( 0) -_ =+'.split(' ');
const nonAlphaKeys = '[{ ]} \\| ;: \'\" ,< .> /?'.split(' ');


const charKeys = [ ...numRowKeys, ...nonAlphaKeys]
  .map(key => key.split(''))
  .map(([ key, shift ]) => new KeyboardKey(key, {
    ...DEFAULT_OPTS,
    id: key,
    type: 'alpha',
    glyph: shift,
    legend: {
      cap: key,
      kbd: key
    }
  }));

[ fKeys, alphaKeys, charKeys ].flatMap(i => i).forEach(key => SYMBOL_MAP[key.name] = key);

const SYMBOLS = Object.values(SYMBOL_MAP);

console.debug(SYMBOL_MAP);

export const getSymbolForKey = (key: string): KeySym => {
  key = key.trim();

  const match = SYMBOLS.find(sym => sym.matches(key));

  if (match) {
    // console.debug(`Matched key ${key} to ${match.id}`);
    return match.toJS();
  }

  console.warn(`No KeyboardSymbol found for ${key}`);

  if (key.startsWith('{') && key.endsWith('}')) {
    key = key.replaceAll(/[{}]/g, '');
  }

  const newKey = new KeyboardKey(key, {
    ...DEFAULT_OPTS,
    aliases: [
      key.toLowerCase(), key.toUpperCase() ]
  });

  SYMBOL_MAP[newKey.name] = newKey;
  SYMBOLS.push(newKey);

  return newKey;
}

export const mapKeySymbols = (keys: string): KeySym[] => {
  if (!keys) {
    return [];
  }

  const uniqKeys = Array.from(new Set(keys.split(/(\s|\+)/g)));

  return uniqKeys
    .filter(key => /[^[\s\+]/.test(key))
    .flatMap(getSymbolForKey)
}