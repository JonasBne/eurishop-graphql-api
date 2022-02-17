import sortBy from './sortBy';

const data = [
  { id: 1, name: 'test2', description: 'C' },
  { id: 2, name: 'test3', description: 'A' },
  { id: 3, name: 'test4', description: 'D' },
  { id: 4, name: 'test', description: 'B' },
];

describe('sortBy function sorts data', () => {
  test('No expression: no changes to data', () => {
    const result = sortBy(data, '');
    expect(result.length).toBe(4);
    expect(result[0].id).toBe(1);
  });
  test('- : descending order', () => {
    const result = sortBy(data, '-description');
    expect(result[0].id).toBe(3);
  });
  test('- : descending order', () => {
    const result = sortBy(data, '-name');
    expect(result[0].id).toBe(3);
  });
  test('+ : ascending order', () => {
    const result = sortBy(data, '+description');
    expect(result[0].id).toBe(2);
  });
  test('+ : ascending order', () => {
    const result = sortBy(data, '+name');
    expect(result[0].id).toBe(4);
  });
  test('Null: no changes to data ', () => {
    const result = sortBy(data, null);
    expect(result.length).toBe(4);
    expect(result[0].id).toBe(1);
  });
  test('Undefined: no changes to data', () => {
    const result = sortBy(data, undefined);
    expect(result.length).toBe(4);
    expect(result[0].id).toBe(1);
  });
  test('Empty array: no changes to data and no crashes', () => {
    const result = sortBy([], undefined);
    expect(result.length).toBe(0);
  });
});
