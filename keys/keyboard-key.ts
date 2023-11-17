import { textReplace } from '@utils/text.ts';
import { KeyType, KeyAlias, KeyDimensions, KeyLegend, KeySym, KeyOptions } from './key-types.ts';

const validateAlias = (pattern: KeyAlias): boolean => {
  if (pattern instanceof RegExp) return true;

  if (pattern.length === 0) {
    console.warn(`Invalid key alias pattern: "${pattern}"`)
    return false;
  }

  if (pattern.length === 1) {
    return false;
  }

  return true;
}

const symbolMatcher = (pattern: KeyAlias): RegExp => {
  if (pattern instanceof RegExp) {
    return pattern;
  }

  if (pattern.startsWith('/')) {
    pattern = pattern.substring(1);
  }

  if (pattern.endsWith('/')) {
    pattern = pattern.substring(0, pattern.length - 1);
  }

  pattern = `^${pattern}$`;

  try {
    return new RegExp(pattern, 'i')
  } catch (e) {
    throw Error(`Invalid pattern: ${pattern}`, e);
  }
}

const DEFAULT_DIMS: KeyDimensions = {
  width: 4,
  height: 1
}

const DEFAULT_LEGEND: KeyLegend = {
  cap: '{name}',
  kbd: '{name}'
}

export const DEFAULT_OPTS: KeySym = {
  name: 'unknown',
  id: 'unknown',
  type: 'fn' as const,
  hasLR: false,
  glyph: null,
  aliases: [],
  forms: [],
  sizes: {
    default: DEFAULT_DIMS
  },
  legend: DEFAULT_LEGEND
};


export default class KeyboardKey implements KeySym {

  private readonly _id: string;

  name: string;
  legend: KeyLegend;
  aliases: RegExp[];
  forms: string[];
  type: KeyType;

  glyph = '';
  hasLR = false;
  sizes = {
    default: DEFAULT_DIMS
  };

  constructor(keyName: string, opts: KeyOptions = {}) {
    Object.assign(opts, {
      // fallback for id is arg name (required)
      id: opts.id || keyName,
      // fallback fro name is arg name (required)
      name: opts.name || keyName,
    });

    const { id, name, type, legend, glyph, aliases, hasLR } = Object.assign(
      {}, DEFAULT_OPTS, opts);

    this.name = name;
    this._id = id;
    this.type = type;

    this.aliases = [ this._id, this.name, ...aliases ]
      .filter(a => validateAlias(a))
      .map(a => symbolMatcher(a));

    this.forms = [
      this.name,
      this._id,
      this.id,
      ...this.aliases.map(a => a.toString())
    ];

    if (hasLR) {
      this.hasLR = true;
      this.forms = [ this.leftId, this.rightId, ...this.forms ];
    }

    if (glyph) {
      this.glyph = glyph;
      this.forms = [ glyph, ...this.forms ];
    }

    const params = {
      name: this.name,
      glyph: this.glyph,
      id: this.id,
      type: this.type
    }

    this.legend = {
      cap: textReplace(legend.cap, params),
      kbd: textReplace(legend.kbd, params),
    };
  }

  get idVariants(): string[] {
    return this.hasLR ? [ this.id, this.leftId, this.rightId ] : [ this.id ];
  }

  get id(): string {
    return `{${this._id}}`
  }

  get leftId(): string {
    return this.hasLR ? `{${this._id}left}` : this.id;
  }

  get rightId(): string {
    return this.hasLR ? `{${this._id}right}` : this.id;
  }

  matches = (symbol: string): boolean => {
    if (this.forms.includes(symbol)) {
      return true;
    } else {
      return this.aliases.find(a => a.test(symbol)) !== undefined;
    }
  }

  toJS(): KeySym {
    return { ...this };
  }

  toString() {
    return this.id;
  }

  valueOf() {
    return this.id;
  }
}
