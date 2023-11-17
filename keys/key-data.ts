import { KeyOptions } from './key-types.ts';

export type NamedKeyOpt = Omit<Required<KeyOptions>, 'forms'>;

const cmd: NamedKeyOpt = {
  name: 'cmd',
  id: 'meta',
  type: 'mod',
  glyph: '⌘',
  aliases: [
    'command', 'super'
  ],
  hasLR: true,
  legend: {
    cap: '{name} {glyph}',
    kbd: '{glyph}'
  },
  sizes:{
    default: {
      width: 6,
      height: 1
    }
  }
}

const alt: NamedKeyOpt = {
  name: 'alt',
  id: 'alt',
  type: 'mod',
  glyph: '⌥',
  aliases: [
    'opt', 'option'
  ],
  hasLR: true,
  legend: {
    cap:  '{name} {glyph}',
    kbd:  '{glyph}'
  },
  sizes: {
    default:  {
      width: 8,
      height: 1
    }
  }
}

const ctrl: NamedKeyOpt = {
  name: 'ctrl',
  id: 'ctrl',
  type: 'mod',
  glyph: '⌃',
  aliases: [
    'control'
  ],
  hasLR: true,
  legend: {
    cap:  '{name} {glyph}',
    kbd:  '{glyph}'
  },
  sizes: {
    default:  {
      width: 10,
      height: 1
    }
  }
}

const shift: NamedKeyOpt = {
  name: 'shift',
  id: 'shift',
  type: 'mod',
  glyph: '⇧',
  aliases: [],
  hasLR: true,
  legend: {
    cap:  '{name} {glyph}',
    kbd:  '{glyph}'
  },
  sizes: {
    default:  {
      width: 15,
      height: 1
    }
  }
}

const tab: NamedKeyOpt = {
  name: 'tab',
  id: 'tab',
  type: 'ws',
  glyph: '⇥',
  aliases: [],
  hasLR: false,
  legend: {
    cap:  '{name} {glyph}',
    kbd:  '{glyph}'
  },
  sizes: {
    default:  {
      width: 10,
      height: 1
    }
  }
}

const capslock: NamedKeyOpt = {
  name: 'capslock',
  id: 'capslock',
  type: 'fn',
  glyph: '⇪',
  aliases: [
    'caps', 'cl'
  ],
  hasLR: false,
  legend: {
    cap:  '{name} {glyph}',
    kbd:  '{glyph}'
  },
  sizes: {
    default:  {
      width: 12,
      height: 1
    }
  }
}

const esc: NamedKeyOpt = {
  name: 'esc',
  id: 'escape',
  type: 'fn',
  glyph: '⎋',
  aliases: [],
  hasLR: false,
  legend: {
    cap:  '{name} {glyph}',
    kbd:  '{glyph}'
  },
  sizes: {
    default:  {
      width: 6,
      height: 1
    }
  }
}

const enter: NamedKeyOpt = {
  name: 'enter',
  id: 'enter',
  type: 'ws',
  glyph: '↵',
  aliases: [
    'return'
  ],
  hasLR: false,
  legend: {
    cap:  'return {glyph}',
    kbd:  '{glyph}'
  },
  sizes: {
    default:  {
      width: 12,
      height: 1
    }
  }
}

const del: NamedKeyOpt = {
  name: 'del',
  id: 'backspace',
  type: 'ws',
  glyph: '⌫',
  aliases: [
    'back', 'del', 'delete'
  ],
  hasLR: false,
  legend: {
    cap:  'delete {glyph}',
    kbd:  '{glyph}'
  },
  sizes: {
    default:  {
      width: 10,
      height: 1
    }
  }
}

const fdel: NamedKeyOpt = {
  name: 'fdel',
  id: 'delete',
  type: 'ws',
  glyph: '⌦',
  aliases: [],
  hasLR: false,
  legend: {
    cap:  '{glyph}',
    kbd:  '{glyph}'
  },
  sizes: {
    default:  {
      width: 6,
      height: 1
    }
  }
}

const arrowUp: NamedKeyOpt = {
  name: 'arrowup',
  id: 'arrowup',
  type: 'arrow',
  glyph: '↑',
  aliases: [
    'UP', 'Up', 'up', 'arrow-up'
  ],
  hasLR: false,
  legend: {
    cap:  '{glyph}',
    kbd:  '{glyph}'
  },
  sizes: {
    default:  {
      width: 6,
      height: 1
    }
  }
}

const arrowDn: NamedKeyOpt = {
  name: 'arrowdown',
  id: 'arrowdown',
  type: 'arrow',
  glyph: '↓',
  aliases: [
    'DOWN', 'Down', 'down', 'arrow-down'
  ],
  hasLR: false,
  legend: {
    cap:  '{glyph}',
    kbd:  '{glyph}'
  },
  sizes: {
    default:  {
      width: 6,
      height: 1
    }
  }
}

const arrowL: NamedKeyOpt = {
  name: 'arrowleft',
  id: 'arrowleft',
  type: 'arrow',
  glyph: '←',
  aliases: [
    'LEFT', 'Left', 'left', 'arrow-left'
  ],
  hasLR: false,
  legend: {
    cap:  '{glyph}',
    kbd:  '{glyph}'
  },
  sizes: {
    default:  {
      width: 6,
      height: 1
    }
  }
}

const arrrowR: NamedKeyOpt = {
  name: 'arrrowright',
  id: 'arrowright',
  type: 'arrow',
  glyph: '→',
  aliases: [
    '/(R|r)ight/', 'RIGHT', 'arrow-right'
  ],
  hasLR: false,
  legend: {
    cap:  '{glyph}',
    kbd:  '{glyph}'
  },
  sizes: {
    default:  {
      width: 6,
      height: 1
    }
  }
}

const fn: NamedKeyOpt = {
  name: 'fn',
  id: 'fn',
  type: 'fn',
  glyph: '',
  aliases: [],
  hasLR: false,
  legend: {
    cap:  '{name}',
    kbd:  '{name}'
  },
  sizes: {
    default:  {
      width: 6,
      height: 1
    }
  }
}

const space: NamedKeyOpt = {
  name: 'space',
  id: 'space',
  type: 'ws',
  glyph: '',
  aliases: [
    'Space', '<space>'
  ],
  hasLR: false,
  legend: {
    cap:  '',
    kbd:  'Space'
  },
  sizes: {
    default:  {
      width: 43,
      height: 1
    }
  }
}

const pageUp: NamedKeyOpt = {
  name: 'pageUp',
  id: 'pageup',
  type: 'fn',
  glyph: '⇞',
  aliases: [],
  hasLR: false,
  legend: {
    cap:  'page up',
    kbd:  '{glyph}'
  },
  sizes: {
    default:  {
      width: 6,
      height: 1
    }
  }
}

const pageDn: NamedKeyOpt = {
  name: 'pageDn',
  id: 'pagedown',
  type: 'fn',
  glyph: '⇟',
  aliases: [
    'page down'
  ],
  hasLR: false,
  legend: {
    cap:  'page down',
    kbd:  '{glyph}'
  },
  sizes: {
    default:  {
      width: 6,
      height: 1
    }
  }
}

const home: NamedKeyOpt = {
  name: 'home',
  id: 'home',
  type: 'fn',
  glyph: '↖',
  aliases: [],
  hasLR: false,
  legend: {
    cap:  '{glyph}',
    kbd:  '{glyph}'
  },
  sizes: {
    default:  {
      width: 6,
      height: 1
    }
  }
}

const end: NamedKeyOpt = {
  name: 'end',
  id: 'end',
  type: 'fn',
  glyph: '↘',
  aliases: [],
  hasLR: false,
  legend: {
    cap:  '{glyph}',
    kbd:  '{glyph}'
  },
  sizes: {
    default:  {
      width: 6,
      height: 1
    }
  }
}

const eject: NamedKeyOpt = {
  name: 'eject',
  id: 'eject',
  type: 'fn',
  glyph: '⏏',
  aliases: [],
  hasLR: false,
  legend: {
    cap:  '{glyph}',
    kbd:  '{glyph}'
  },
  sizes: {
    default:  {
      width: 6,
      height: 1
    }
  }
}

const clear: NamedKeyOpt = {
  name: 'clear',
  id: 'clear',
  type: 'numpad',
  glyph: '',
  aliases: [],
  hasLR: false,
  legend: {
    cap:  '{name}',
    kbd:  '{name}'
  },
  sizes: {
    default:  {
      width: 6,
      height: 1
    }
  }
}

const numEq: NamedKeyOpt = {
  name: 'numEq',
  id: 'eq',
  type: 'numpad',
  glyph: '\\=',
  aliases: [],
  hasLR: false,
  legend: {
    cap:  '{glyph}',
    kbd:  '{glyph}'
  },
  sizes: {
    default:  {
      width: 6,
      height: 1
    }
  }
}

const numDivide: NamedKeyOpt = {
  name: 'numDivide',
  id: 'div',
  type: 'numpad',
  glyph: '/',
  aliases: [],
  hasLR: false,
  legend: {
    cap:  '{glyph}',
    kbd:  '{glyph}'
  },
  sizes: {
    default:  {
      width: 6,
      height: 1
    }
  }
}

const numMultiply: NamedKeyOpt = {
  name: 'numMultiply',
  id: 'multi',
  type: 'numpad',
  glyph: '*',
  aliases: [],
  hasLR: false,
  legend: {
    cap:  '{glyph}',
    kbd:  '{glyph}'
  },
  sizes: {
    default:  {
      width: 6,
      height: 1
    }
  }
}

const numSubtract: NamedKeyOpt = {
  name: 'numSubtract',
  id: 'sub',
  type: 'numpad',
  glyph: '-',
  aliases: [],
  hasLR: false,
  legend: {
    cap:  '{glyph}',
    kbd:  '{glyph}'
  },
  sizes: {
    default:  {
      width: 6,
      height: 1
    }
  }
}

const numAdd: NamedKeyOpt = {
  name: 'numAdd',
  id: 'add',
  type: 'numpad',
  glyph: '\\+',
  aliases: [],
  hasLR: false,
  legend: {
    cap:  '{glyph}',
    kbd:  '{glyph}'
  },
  sizes: {
    default:  {
      width: 6,
      height: 1
    }
  }
}

const numEnter: NamedKeyOpt = {
  name: 'numEnter',
  id: 'numEnter',
  type: 'numpad',
  glyph: '⌅',
  aliases: [],
  hasLR: false,
  legend: {
    cap:  '{glyph}',
    kbd:  '{glyph}'
  },
  sizes: {
    default:  {
      width: 6,
      height: 1
    }
  }
}

const numDecimal: NamedKeyOpt = {
  name: 'numDecimal',
  id: 'decimal',
  type: 'numpad',
  glyph: '.',
  aliases: [],
  hasLR: false,
  legend: {
    cap:  '{glyph}',
    kbd:  '{glyph}'
  },
  sizes: {
    default:  {
      width: 6,
      height: 1
    }
  }
}

const keys = [
  cmd, alt, ctrl, shift, tab, capslock, esc, enter,
  del, fdel, arrowUp, arrowDn, arrowL, arrrowR,
  fn, space, pageUp, pageDn, home, end, eject,
  clear, numEq, numDivide, numMultiply, numSubtract,
  numAdd, numEnter, numDecimal
];

export default keys;
