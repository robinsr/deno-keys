import KeyboardKey, { DEFAULT_OPTS } from './keys/keyboard-key.ts';
import { getKeyList, MB110LL } from './keys/keyboard-config.ts';
import {
  assertEquals, assert, assertFalse
} from 'std/assert/mod.ts';
import {
  green, red, cyan
} from 'std/fmt/colors.ts';

type anyBoolFunc = (...args: any[]) => boolean;


/**
 * TEST UTILITIES
 */

/**
 * Runs a Deno Test with labels for test group and test item
 */
const test = (group: string, item: string, fn: Deno.TestDefinition['fn']) =>
  Deno.test({ name: `deno-keys#${group} - ${item}`, fn });

const testSkip = (group: string, item: string, fn: Deno.TestDefinition['fn']) =>
  Deno.test({ name: `deno-keys#${group} - ${item}`, fn, ignore: true });

const testOnly = (group: string, item: string, fn: Deno.TestDefinition['fn']) =>
  Deno.test({ name: `deno-keys#${group} - ${item}`, fn, only: true });


/**
 * Print utils
 */
const printArgs = (...args: any[]): string =>
  args.map(a => cyan(`${a}`)).join(', ');

const printExp = <T extends Object> (act: T, ex: T) => `
    Expected: "${green(ex.toString())}";
    Received: "${red(act.toString())}"`;

const inspectOpts = { colors: true, getters: true, showHidden: true };
const debug = (...args: any[]) => {
  args.forEach(arg => console.log(Deno.inspect(arg, inspectOpts)))
}

/**
 * assertEquals with AssertionError message
 */
const eq = <T extends Object> (actual: T, expected: T) =>
  assertEquals(actual, expected, printExp(actual, expected));

/**
 * assertTrue with AssertionError message
 */
const isTrue = (fn: anyBoolFunc, ...args: any[]) =>
  assert(fn(...args), `Expected ${green('true')} with args ${printArgs(args)}`);

/**
 * assertFalse with AssertionError message
 */
const isNotTrue = (fn: anyBoolFunc, ...args: any[]) =>
  assertFalse(fn(...args), `Expected ${red('false')} with args ${printArgs(args)}`);


/**
 * BEGIN UNIT TESTS
 */

test('KeyboardKey', 'basic', _t => {
  const foo = new KeyboardKey('foo');

  eq(foo.id, '{foo}');
  eq(foo.name, 'foo');
  isTrue(foo.matches, '{foo}');
  isTrue(foo.matches, 'foo');
  isTrue(foo.matches, 'fOo');
  isTrue(foo.matches, 'FOO');
  isTrue(foo.matches, 'Foo');
  isNotTrue(foo.matches, 'bar');
});

test('KeyboardKey', 'name/id variations', _t => {
  const fooWithId = new KeyboardKey('foo', { id: 'FooIdKey' });
  eq(fooWithId.id, '{FooIdKey}');
  eq(fooWithId.name, 'foo');
  isTrue(fooWithId.matches, '{FooIdKey}');
  isTrue(fooWithId.matches, 'FooIdKey');
  isTrue(fooWithId.matches, 'foo');
  isTrue(fooWithId.matches, 'fOO');
  isTrue(fooWithId.matches, 'FOO');
  isTrue(fooWithId.matches, 'Foo');

  isNotTrue(fooWithId.matches, '{foo}');
  isNotTrue(fooWithId.matches, 'foobar');
  isNotTrue(fooWithId.matches, 'barfoo');
  isNotTrue(fooWithId.matches, 'barFooIdKey');

  const fooWithName = new KeyboardKey('foo', { name: 'FooNameKey' });
  eq(fooWithName.id, '{foo}');
  eq(fooWithName.name, 'FooNameKey');
  isTrue(fooWithName.matches, '{foo}');
  isTrue(fooWithName.matches, 'FooNameKey');
  isTrue(fooWithName.matches, 'foo');
  isTrue(fooWithName.matches, 'fOO');
  isTrue(fooWithName.matches, 'FOO');
  isTrue(fooWithName.matches, 'Foo');
  isNotTrue(fooWithName.matches, '{FooNameKey}');
  isNotTrue(fooWithName.matches, 'bar');

  const barIdKey = new KeyboardKey('foo', { name: 'BarNameKey', id: 'BarIdKey' });
  eq(barIdKey.id, '{BarIdKey}')
  eq(barIdKey.name, 'BarNameKey')
  isTrue(barIdKey.matches, '{BarIdKey}');
  isTrue(barIdKey.matches, 'baridkey');
  isTrue(barIdKey.matches, 'barnamekey');

  // When both opts.name and opts.id set, keyName is ignored
  isNotTrue(barIdKey.matches, '{bar}');
  isNotTrue(barIdKey.matches, 'bar');
  isNotTrue(barIdKey.matches, 'BAR');
  isNotTrue(barIdKey.matches, '{BarNameKey}');
  isNotTrue(barIdKey.matches, '{foo}');
  isNotTrue(barIdKey.matches, 'foo');
  isNotTrue(barIdKey.matches, 'foobar');
});

test('KeyboardKey', 'with options', async t => {
  const smile = '☻';

  const foo = new KeyboardKey('foo', {
    id: 'foobar',
    type: 'fn',
    hasLR: true,
    glyph: smile,
    aliases: [ 'bar', 'QUX', 'foo[-_]bar' ],
    sizes: {
      default: {
        width: 3,
        height: 17
      },
      fooLayout: {
        width: 33,
        height: 71
      }
    },
    legend: {
      cap: '{type} key {id} is cool!',
      kbd: '{name} → {glyph}'
    }
  });

  await t.step('Text replacement in legend patterns', () => {
    eq(foo.legend.cap, 'fn key {foobar} is cool!');
    eq(foo.legend.kbd, `foo → ${smile}`);
  });

  await t.step('Matches simple aliases', () => {
    isTrue(foo.matches, 'bar');
    isTrue(foo.matches, 'Bar');
    isTrue(foo.matches, 'BAR');
    isTrue(foo.matches, 'qux');
    isTrue(foo.matches, 'Qux');
    isTrue(foo.matches, 'QUX');
  });

  await t.step('Matches aliases with regex', () => {
    isTrue(foo.matches, 'foo-bar');
    isTrue(foo.matches, 'FOO_BAR');
    isNotTrue(foo.matches, 'FOO+BAR');
  });

  await t.step('Does not match non-name, non-id, non-alias', () => {
    isNotTrue(foo.matches, 'baz');
    isNotTrue(foo.matches, 'foopooper');
  });

  await t.step('Matches glyph', () => {
    isTrue(foo.matches, smile);
  });

  await t.step('Produces left-right variant IDs', () => {
    eq(foo.idVariants, [ '{foobar}', '{foobarleft}', '{foobarright}' ]);
  });


  await t.step('Matches left-right variations', () => {
    isTrue(foo.matches, '{foobarleft}');
    isTrue(foo.matches, '{foobarright}');
  });

  await t.step('Correct dimensions', () => {
    eq(foo.width, 0);
    eq(foo.height, 0);
    eq(foo.offset, 0);
  })
});

test('KeyboardKey', 'alpha keys', async t => {
  await t.step('simple alpha keys match expected', () => {
    const aKey = new KeyboardKey('bracket-left', {
      ...DEFAULT_OPTS,
      id: 'KeyA',
      name: 'a',
      type: 'alpha',
      legend: {
        cap: '[A]',
        kbd: 'A'
      }
    });

    isTrue(aKey.matches, 'a');
    isTrue(aKey.matches, '{KeyA}');
    isTrue(aKey.matches, 'A');
    eq(aKey.legend.cap, '[A]');
    eq(aKey.legend.kbd, 'A');
  })
})


test('KeyboardKey', 'characters keys', async t => {
  await t.step('simple char keys match expected', () => {
    const bLeft = new KeyboardKey('bracket-left', {
      ...DEFAULT_OPTS,
      id: '\[',
      name: 'BracketLeft',
      type: 'alpha',
      legend: {
        cap: '[',
        kbd: '['
      }
    });

    isTrue(bLeft.matches, '[');
    isTrue(bLeft.matches, '{[}');
    eq(bLeft.legend.cap, '[');
    eq(bLeft.legend.kbd, '[');
  })
})

testOnly('KeyboardConfig', 'getKeyList', async t => {
  await t.step('configures a keyboard layout', () => {
    debug(getKeyList(MB110LL))
  })
})