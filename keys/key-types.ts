export type Maybe<T> = T | null;

export type Shortcut = {
  label: string;
  keys: string;
}

export type HotKey = Shortcut & {
  symbols: KeySym[];
  id: string
};

export type ItemGroup<T> = {
  name: string;
  groups: {
    [group: string]: T[]
  }
}

export type ShortcutGroup = ItemGroup<Shortcut>;
export type HotKeyGroup = ItemGroup<HotKey>;


export type KeyCodeEvent = {
  key: string
  keyCode: number
  which: number
  code?: string
  location?: number
  description?: string
  unicode?: string
  altKey?: boolean
  ctrlKey?: boolean
  metaKey?: boolean
  shiftKey?: boolean
  repeat?: boolean
  path?: string
}

export type KeyType = 'alpha' | 'mod' | 'arrow' | 'ws' | 'fn' | 'numpad';

/*
  Currently only supports rectangular keys
 */
export type KeyDimensions = {
    width: number;
    height: number;
  }

export type KeyLegend = {
  cap: string;
  kbd: string;
}

export type KeyEvent = {
  key: string;
  code: string;
}

export type KeyAlias = string | RegExp;

export type KeyOptions = {
  id?: string;
  type?: KeyType;
  legend?: KeyLegend;
  name?: string;
  aliases?: KeyAlias[];
  forms?: string[];
  glyph?: string | null;
  hasLR?: boolean;
  sizes?: {
    [profile: string]: KeyDimensions
  }
}

export type KeySym = Required<KeyOptions>;

type KeyToken = KeySym | string;

export type KeyboardConfig = {
  layout: {
    default: string[];
    shift?: string[];
  },
  display?: {
    [key: string]: string
  }
}

