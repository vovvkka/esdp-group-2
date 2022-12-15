import fizzBuzz from "./fizzBuzz";

const checkFizzBuzz = (input, expected) => {
    const result = fizzBuzz(input);
    expect(result).toBe(expected);
};

describe('FizzBuzz', () => {
    it('should exists', () => {
        fizzBuzz();
    });

    it('returns 1 for 1', () => {
        checkFizzBuzz(1, 1);
    });
    it('returns 2 for 2', () => {
        checkFizzBuzz(2, 2);
    });
    it('returns Fizz for 3', () => {
        checkFizzBuzz(3, 'Fizz');
    });
    it('returns Buzz for 5', () => {
        checkFizzBuzz(5, 'Buzz');
    });
    it('returns Fizz for 6', () => {
        checkFizzBuzz(6, 'Fizz');
    });
    it('returns Buzz for 10', () => {
        checkFizzBuzz(10, 'Buzz');
    });
    it('returns FizzBuzz for 10', () => {
        checkFizzBuzz(15, 'FizzBuzz');
    });
});
