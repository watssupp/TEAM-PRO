const Employee = require('../lib/Employee');

test('creates an employee object', () => {
    const employee = new Employee('Jorge');
});

test('set id with constructor', () => {
    const testValue = 100;
    const e = new Employee('Foo', testValue);
    expect(e.id).toBe(testValue);
});

test('set email with constructor', () => {
    const testValue = 'employee@email.com';
    const e = new Employee('Foo', 1, testValue);
    expect(e.email).toBe(testValue);
});

// Test if the getRole() value is Employee
test('getRole() return Employee', () => {
    const testValue = 'Employee';
    const e = new Employee('Jorge', 1, 'employee@email.com');
    expect(e.getRole()).toBe(testValue);
});