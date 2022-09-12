const { total,fahrenheitToCelsius, celsiusToFahrenheit } = require('../src/playground/calculation');
// console.log('Total :'+ total);

test('Total Bill Amount', () => {
    const totalAmount =   total(100 , .30);
    expect(totalAmount).toBe(130);
});

test('farenToCelcius', () => {
    const celcius   =   fahrenheitToCelsius(32);
    expect(celcius).toBe(0);
})

test('celciusTofaren', () => {
    const fahrenhiet   =   celsiusToFahrenheit(0);
    expect(fahrenhiet).toBe(32);
})
