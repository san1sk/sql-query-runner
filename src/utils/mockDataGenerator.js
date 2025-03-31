import { faker } from '@faker-js/faker';

export const generateMockData = (type, count = 100) => {
  switch (type) {
    case 'customers':
      return Array.from({ length: count }, (_, i) => ({
        customer_id: i + 1,
        customer_name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        country: faker.location.country(),
        postal_code: faker.location.zipCode(),
        registration_date: faker.date.past().toISOString().split('T')[0]
      }));
      
    case 'sales':
      return Array.from({ length: count }, () => {
        const region = faker.location.region();
        return {
          region: region,
          sales: faker.number.int({ min: 10000, max: 1000000 }),
          year: faker.date.between({ from: '2020-01-01', to: '2023-12-31' }).getFullYear(),
          quarter: `Q${faker.number.int({ min: 1, max: 4 })}`,
          category: faker.helpers.arrayElement(['Electronics', 'Clothing', 'Food', 'Furniture', 'Books']),
          growth_rate: faker.number.float({ min: -15, max: 30, precision: 0.1 })
        };
      });
      
    case 'products':
      return Array.from({ length: count }, (_, i) => ({
        product_id: i + 1,
        product_name: faker.commerce.productName(),
        category: faker.commerce.department(),
        price: faker.commerce.price(),
        cost: faker.commerce.price({ min: 5, max: 100 }),
        quantity: faker.number.int({ min: 0, max: 500 }),
        supplier: faker.company.name(),
        last_updated: faker.date.recent().toISOString().split('T')[0]
      }));
      
    case 'orders':
      return Array.from({ length: count }, (_, i) => ({
        order_id: i + 1,
        customer_id: faker.number.int({ min: 1, max: 1000 }),
        order_date: faker.date.recent().toISOString().split('T')[0],
        amount: faker.commerce.price({ min: 10, max: 1000 }),
        status: faker.helpers.arrayElement(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']),
        payment_method: faker.helpers.arrayElement(['Credit Card', 'PayPal', 'Bank Transfer', 'Cash']),
        shipping_address: faker.location.streetAddress()
      }));
      
    case 'generic':
    default:
      return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: faker.person.fullName(),
        email: faker.internet.email(),
        company: faker.company.name(),
        date: faker.date.recent().toISOString().split('T')[0],
        value: faker.number.int({ min: 1, max: 1000 }),
        status: faker.helpers.arrayElement(['Active', 'Inactive', 'Pending'])
      }));
  }
};
