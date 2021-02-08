import * as _ from 'lodash';

export function generateCustomHash(symbolsArray: any[], callback: (hash: string) => void) {
  const arrayWithHashedItems = _.map(symbolsArray, (s) => {
    const l = s?.length;
    const prefix = l * Math.floor(Math.random() * 100) + 2;

    return `${prefix}-${s}*${l}`;
  });

  const generatedHash = arrayWithHashedItems.join(arrayWithHashedItems?.length || '@#$');

  return {
    generatedHash,
    generatedHashCallback: callback(generatedHash)
  };
}
