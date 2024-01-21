import KeyboardKey, { DEFAULT_OPTS, DEFAULT_DIMS } from './keyboard-key.ts';
import { KeySym, KeyType } from './key-types.ts';
import keys from './key-data.ts';

const isKeyType = (str: string): str is KeyType => {
  return [ 'alpha', 'mod', 'arrow', 'ws', 'fn', 'numpad'].includes(str);
}

const range = (start: number, stop: number, step = 1): number[] =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);


class SymbolMap {
  private symMap = new Map<string, KeyboardKey>();
  private symList: KeyboardKey[] = [];
  private unknownKey = new KeyboardKey('?', DEFAULT_OPTS);

  add(key: KeyboardKey): void {
    this.symMap.set(key.id, key);
    this.symList.push(key);
  }

  has(id: string): boolean {
    return this.symMap.has(id) || this.symMap.has(`{${id}}`);
  }

  get(id: string): KeySym {
    const _get = (id: string) => this.symMap.get(id)!;

    if (this.symMap.has(id)) return _get(id);
    if (this.symMap.has(`{${id}}`)) return _get(`{${id}}`);

    return this.unknownKey;
  }

  find(key: string, useUnknown = false): KeySym {
    key = key.trim();

    if (this.has(key)) {
      return this.get(key);
    }

    const match = this.symList.find(sym => sym.matches(key));

    if (match) {
      // console.debug(`Matched key ${key} to ${match.id}`);
      return match;
    }

    if (useUnknown) {
      return SYMBOL_MAP.unknownKey;
    }

    console.warn(`No KeyboardSymbol found for ${key}`);

    if (key.startsWith('{') && key.endsWith('}')) {
      key = key.replaceAll(/[{}]/g, '');
    }

    const newKey = new KeyboardKey(key, {
      ...DEFAULT_OPTS,
      id: key,
      name: key,
      aliases: [
        key.toLowerCase(), key.toUpperCase()
      ]
    });

    this.add(newKey);
    return newKey;
  }
}

export const SYMBOL_MAP = new SymbolMap();

Array.from(keys)
  .map(key => new KeyboardKey(key.name, key))
  .forEach(key => SYMBOL_MAP.add(key));

const fKeys = range(1,20)
  .map(num => `f${num}`)
  .map(key => new KeyboardKey(key, { ...DEFAULT_OPTS,
    id: key,
    name: key,
    type: 'fn',
    sizes: {
      default: {
        width: DEFAULT_DIMS.default.width,
        height: 0.70,
      }
    },
    aliases: [ key.toUpperCase() ]
  }));

const alphaKeys = range(97, 122)
  .map(num => String.fromCharCode(num))
  .map(alpha => new KeyboardKey(alpha, {
    ...DEFAULT_OPTS,
    id: `Key${alpha.toUpperCase()}`,
    name: alpha,
    type: 'alpha',
    legend: {
      cap: alpha.toUpperCase(),
      kbd: alpha.toUpperCase()
    }
  }));

const numPadDigits = range(0, 9)
  .map(num => new KeyboardKey(`numpad${num}`, {
    ...DEFAULT_OPTS,
    id: `numpad${num}`,
    name: `${num}`,
    type: 'numpad',
    sizes: {
      default: {
        width: num === 0 ? 14 : 7,
        height: 1
      }
    },
    aliases: [ num.toString(10) ]
  }));

const numPadKeys = 'eq|= add|+ subtract|- multiply|* divide|/'.split(' ')
  .map(k => {
    const [ id, sym ] = k.split('|');
    return new KeyboardKey(`num-${id}`, {
      ...DEFAULT_OPTS,
      id: `num-${id}`,
      name: sym,
      type: 'numpad'
    })
  });

const numRowKeys = '`~ 1! 2@ 3# 4$ 5% 6^ 7& 8* 9( 0) -_ =+'.split(' ');
const nonAlphaKeys = '[{ ]} \\| ;: \'\" ,< .> /?'.split(' ');


const charKeys = [ ...numRowKeys, ...nonAlphaKeys]
  .map(key => key.split(''))
  .map(([ key, shift ]) => new KeyboardKey(key, {
    ...DEFAULT_OPTS,
    id: key,
    name: `Key-${key}-${shift}`,
    type: 'alpha',
    aliases: [ shift ],
    glyph: shift,
    legend: {
      cap: key,
      kbd: key
    }
  }));

[ numPadDigits, numPadKeys, fKeys, alphaKeys, charKeys ]
  .flatMap(i => i)
  .forEach(key => SYMBOL_MAP.add(key));

export const getSymbolForKey = (key: string): KeySym => {
  return SYMBOL_MAP.find(key);
}

export const combinators = {
  space_or_plus: /(\s|\+)/g
};

export const mapKeySymbols = (keys: string[]): KeySym[] => {
  if (!keys) {
    return [];
  }

  const uniqKeys = Array.from(new Set(keys));

  return uniqKeys
    // filter out remaining combinator symbols
    .filter(key => /[^[\s+]/.test(key))
    .flatMap(key => SYMBOL_MAP.find(key));
}