import * as _ from 'lodash';


export function generateCustomHash(symbolsArray: any[], callback: (hash:string) => void) {
  const arrayWithHashedItems = _.map(symbolsArray, s => {
    const l = s?.length;
    const prefix = l * Math.floor(Math.random()*100) + 2;

    console.info('generateCustomNumber!!!', prefix);

    return `${prefix}-${s}*${l}`;
  });

  console.info('arrayWithHashedItems!!!', arrayWithHashedItems);

  const generatedHash = arrayWithHashedItems.join(arrayWithHashedItems?.length || '@#$');

  console.info('generatedHash!!', generatedHash);

  return {
    generatedHash,
    generatedHashCallback: callback(generatedHash)
  };

}
