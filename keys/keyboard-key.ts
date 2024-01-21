import { textReplace } from '@utils/text.ts';
import { unique } from './utils.ts';
import { KeyType, KeyAlias, KeyDimensions, KeyLegend, KeySym, KeyOptions } from './key-types.ts';

const MATCH_NOTHING = new RegExp(/^$/);
const REGEX_CHARS = new RegExp(/[|)(\]\[\\]+/);

const parseAlias = (alias: string) => {
  return {
    isNonAlphaChar: /^\W$/.test(alias),
    isAlphaChar: /^\w$/.test(alias),
    isDigitChar: /^\d$/.test(alias),
    hasSyntaxChars: REGEX_CHARS.test(alias),
  }
}

const validateAlias = (pattern: KeyAlias): boolean => {
  if (pattern instanceof RegExp) return true;

  if (pattern.length === 0) {
    console.warn(`Invalid key alias pattern: "${pattern}"`)
    return false;
  }

  const props = parseAlias(pattern);

  if (props.isNonAlphaChar || props.isDigitChar) {
    return false;
  }

  if (props.isAlphaChar) {
    return true;
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

  const props = parseAlias(pattern);

  if (props.hasSyntaxChars) {
    const regexChars = new RegExp(REGEX_CHARS, 'g');
    pattern = pattern.replaceAll(regexChars, substr => {
      return '\\' + substr;
    });
  }

  pattern = `^${pattern}$`;

  try {
    return new RegExp(pattern, 'i')
  } catch (e) {
    console.warn(`Invalid key alias pattern: "${pattern}"`)
    return MATCH_NOTHING;
  }
}

export const DEFAULT_DIMS: KeyDimensions = {
  default: {
    width: 7,
    height: 1,
    offset: 0
  }
}

const DEFAULT_LEGEND: KeyLegend = {
  cap: '{name}',
  kbd: '{name}'
}

export const DEFAULT_OPTS: Required<KeyOptions> = {
  name: 'unknown',
  id: 'unknown',
  type: 'fn' as const,
  hasLR: false,
  glyph: null,
  aliases: [],
  sizes: {},
  legend: DEFAULT_LEGEND
};


export default class KeyboardKey implements KeySym {

  private readonly _id: string;

  name: string;
  legend: KeyLegend;
  aliases: RegExp[];
  forms: string[];
  type: KeyType;
  sizes: KeyDimensions = {};

  glyph = '';
  hasLR = false;


  constructor(keyName: string, opts: KeyOptions = {}) {
    Object.assign(opts, {
      // fallback for id is arg name (required)
      id: opts.id || keyName,
      // fallback fro name is arg name (required)
      name: opts.name || keyName,
    });

    const mergedOpts = Object.assign({}, DEFAULT_OPTS, opts);

    const { id, name, type, legend, glyph, aliases, hasLR, sizes } = mergedOpts;

    this.name = name;
    this._id = id;
    this.type = type;

    this.aliases = unique(this._id, this.name, ...aliases)
      .filter(a => validateAlias(a))
      .map(a => symbolMatcher(a));

    const noRegexForms = aliases.filter(a => !validateAlias(a));

    this.forms = unique(
      this.name,
      this._id,
      this.id,
      ...noRegexForms
    );

    if (hasLR) {
      this.hasLR = true;
      this.forms = [ this.leftId, this.rightId, ...this.forms ];
    }

    if (glyph) {
      this.glyph = glyph;
      this.forms = unique(glyph, ...this.forms);
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

    this.sizes = Object.assign({}, DEFAULT_DIMS, sizes);
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
    if (symbol == '\\') {
      return false;
    }

    if (this.forms.includes(symbol)) {
      return true;
    } else {
      return this.aliases.find(a => a.test(symbol)) !== undefined;
    }
  }

  get width(): number {
    const profiles = Object.keys(this.sizes);
    return this.sizes[profiles[0]].width;
  }

  get height(): number {
    const profiles = Object.keys(this.sizes);
    return this.sizes[profiles[0]].height;
  }

  get offset(): number {
    const profiles = Object.keys(this.sizes);
    return this.sizes[profiles[0]].offset || 0;
  }

  toString() {
    return this.id;
  }

  valueOf() {
    return this.id;
  }
}
