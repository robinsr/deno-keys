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
  [profile: string]: {
    width: number;
    height: number;
    offset?: number
  }
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
  aliases?: string[];
  glyph?: string | null;
  hasLR?: boolean;
  sizes?: KeyDimensions
}

export type KeySym = {
  id: string;
  type: KeyType;
  legend: KeyLegend;
  name: string;
  idVariants: string[];
  width: number;
  height: number;
  offset: number;
  matches(symbol: string): boolean;
}

/**
 * KEYBOARD TYPES
 */
type KeyToken = KeySym | string;

export type KeyboardRow = KeySym[];

export type ItemPosition = {
  row: number;
  col: number;
}

export type ItemGrid = {
  cols: number;
  rows: number;
}

export type SectionLayout = {
  name: string;
  rows: KeyboardRow[];
  position: ItemPosition;
  grid?: ItemGrid;
}

export type KeyboardSpec = {
  sections: {
    [id: string]: SectionLayout
  }
  grid: ItemGrid
}



