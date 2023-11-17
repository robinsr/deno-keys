import { KeyboardConfig } from './key-types.ts';
import { SYMBOL_MAP } from './symbol.ts';



const keyData = {
  [SYMBOL_MAP['tab'].id]: SYMBOL_MAP['tab'].legend.cap,
  [SYMBOL_MAP['esc'].id]: SYMBOL_MAP['esc'].legend.cap,
  "{backspace}": "delete ⌫",
  "{enter}": "return ↵",
  "{capslock}": "caps lock ⇪",
  "{shiftleft}": "shift ⇧",
  "{shiftright}": "shift ⇧",
  "{ctrlleft}": "ctrl ⌃",
  "{ctrlright}": "ctrl ⌃",
  "{altleft}": "alt ⌥",
  "{altright}": "alt ⌥",
  "{metaleft}": "cmd ⌘",
  "{metaright}": "cmd ⌘"
}

export const shared = {
  theme: "simple-keyboard hg-theme-default hg-layout-default vue-shortcuts",
  physicalKeyboardHighlight: true,
  syncInstanceInputs: true,
  mergeDisplay: true
}

export const mainKeyOpts: KeyboardConfig = {
  layout: {
    default: [
      "{escape} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12}",
      "` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
      "{tab} q w e r t y u i o p [ ] \\",
      "{capslock} a s d f g h j k l ; ' {enter}",
      "{shift} z x c v b n m , . / {shift}",
      "{ctrlleft} {altleft} {metaleft} {space} {metaright} {altright} {ctrlright}"
    ],
    shift: [
      "{escape} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12}",
      "~ ! @ # $ % ^ & * ( ) _ + {backspace}",
      "{tab} Q W E R T Y U I O P { } |",
      '{capslock} A S D F G H J K L : " {enter}',
      "{shift} Z X C V B N M < > ? {shift}",
      "{ctrlleft} {altleft} {metaleft} {space} {metaright} {altright} {ctrlright}"
    ]
  },
  display: keyData
}

const controlPadOpts: KeyboardConfig = {
  layout: {
    default: [
      "{f13} {f14} {f15}",
      "{fn} {home} {pageup}",
      "{forwarddelete} {end} {pagedown}"
    ]
  },
  display: {
    "{f13}": "f13",
    "{f14}": "f14",
    "{f15}": "f15",
    "{fn}": "fn",
    "{delete}": "delete ⌦",
    "{pageup}": "page up",
    "{pagedown}": "page down",
  }
}

const arrowsOpts: KeyboardConfig = {
  layout: {
    default: ["{arrowup}", "{arrowleft} {arrowdown} {arrowright}"]
  }
}

const numPadOpts: KeyboardConfig = {
  layout: {
    default: [
      "{f16} {f17} {f18}",
      "{numclear} {numeq} {numdivide}",
      "{numpad7} {numpad8} {numpad9}",
      "{numpad4} {numpad5} {numpad6}",
      "{numpad1} {numpad2} {numpad3}",
      "{numpad0} {numpaddecimal}"
    ]
  }
}

const numpadEndOpts: KeyboardConfig = {
  layout: {
    default: ["{numpadsubtract}", "{numpadadd}", "{numpadenter}"]
  }
}

export const keyConfigs: [ string, KeyboardConfig ][] = [
  [ 'main', mainKeyOpts ],
  [ 'control', controlPadOpts ],
  [ 'arrows', arrowsOpts ],
  // [ 'numpad', numPadOpts ],
  // [ 'numpadEnd', numpadEndOpts ]
];

export const keyList: Set<string> = new Set(keyConfigs
    .flatMap(([ _, config]) => config.layout.default)
    .map(row => row.split(' '))
    .reduce((acc, row) => ([ ...acc, ...row ]), []));

export default keyConfigs;
