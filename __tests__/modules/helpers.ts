import { generateCustomHash } from "../../src/modules/helpers";

describe('Check generateCustomHash', () => {
  test('generateCustomHash generate number', async () => {
    const callback = jest.fn((hashData: string) => {
      console.info('generateCustomHash Test!!', hashData)
    });

    callback.mockImplementation(() => 'dddd');

    const result = generateCustomHash([
      '3243',
      3,
      '234234',
      'dfsdfsdfsd'
    ], callback);

    console.info(
      'generateCustomHash Test2!!!',
      result,
      callback.mock.calls,
      callback.mock.results
      );

    expect(result.generatedHashCallback).toBe('dddd');
  })
});
