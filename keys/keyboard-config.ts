import { KeySym, KeyboardSpec } from './key-types.ts';
import { SYMBOL_MAP } from './symbol.ts';


const mapRow = (row: string): KeySym[] =>
  row.split(' ').map(id => SYMBOL_MAP.find(id));

const mapRows = (rows: string[]): KeySym[][] =>
  rows.map(row => mapRow(row));


export const MB110LL: KeyboardSpec = {
  grid: {
    cols: 3,
    rows: 6
  },
  sections: {
    main: {
      name: 'main',
      rows: mapRows([
        "{escape} {f1} {f2} {f3} {f4} {f5} {f6} {f7} {f8} {f9} {f10} {f11} {f12}",
        "` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
        "{tab} q w e r t y u i o p [ ] \\",
        "{capslock} a s d f g h j k l ; ' {enter}",
        "{shift} z x c v b n m , . / {shift}",
        "{ctrlleft} {altleft} {metaleft} {space} {metaright} {altright} {ctrlright}",
      ]),
      position: {
        col: 1,
        row: 1
      }
    },
    controlPad: {
      name: 'control-pad',
      rows: mapRows([
        "{f13} {f14} {f15}",
        "{fn} {home} {pageup}",
        "{fdel} {end} {pagedown}"
      ]),
      position: {
        col: 2,
        row: 1
      },
      grid: {
        cols: 21,
        rows: 3
      }
    },
    arrowPad: {
      name: 'arrow-keys',
      rows: mapRows([
        "{arrowup}",
        "{arrowleft} {arrowdown} {arrowright}"
      ]),
      position: {
        col: 2,
        row: 5
      },
      grid: {
        cols: 21,
        rows: 2
      }
    },
    numpad: {
      name: 'numpad',
      rows: mapRows([
        "{f16} {f17} {f18} {f19}",
        "{clear} {num-eq} {num-divide} {num-multiply}",
        "{numpad7} {numpad8} {numpad9} {num-subtract}",
        "{numpad4} {numpad5} {numpad6} {num-add}",
        "{numpad1} {numpad2} {numpad3} {num-enter}",
        "{numpad0} {num-decimal}"
      ]),
      position: {
        col: 3,
        row: 1
      },
      grid: {
        cols: 28,
        rows: 6
      }
    }
  }
}

const Keyboards = {
  apple_MB110LL: MB110LL
}

export const getKeyList = (kb: KeyboardSpec): string[] => {
  return Object.values(kb.sections)
    .map(s => s.rows)
    .flat(2)
    .map(k => k.name)
    .sort();
}

export default Keyboards;
