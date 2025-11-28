const calculateOrderTotal = require('../../src/utils/calculateOrderTotal');

describe('calculateOrderTotal', () => {
  test('boş liste için 0 döndürür', () => {
    expect(calculateOrderTotal([])).toBe(0);
  });

  test('tek ürün için doğru toplamı hesaplar', () => {
    const items = [{ price: 10, quantity: 2 }];
    expect(calculateOrderTotal(items)).toBe(20);
  });

  test('birden fazla ürün için toplamı hesaplar', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 1 }
    ];
    expect(calculateOrderTotal(items)).toBe(25);
  });

  test('geçersiz değerlerde 0 kabul eder', () => {
    const items = [
      { price: 'a', quantity: 2 },
      { price: 5, quantity: 'b' }
    ];
    expect(calculateOrderTotal(items)).toBe(0);
  });
});