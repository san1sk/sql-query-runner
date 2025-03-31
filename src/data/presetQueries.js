export const presetQueries = [
  {
    id: 1,
    name: "All Products",
    query: "SELECT * FROM products;",
    description: "Display all products from the product database"
  },
  {
    id: 2,
    name: "All Orders",
    query: "SELECT * FROM orders;",
    description: "Display all orders from the orders database"
  },
  {
    id: 3,
    name: "All Customers",
    query: "SELECT * FROM customers;",
    description: "Display all customers from the customers database"
  },
  {
    id: 4,
    name: "Products with price > 50",
    query: "SELECT * FROM products WHERE unitPrice > 50;",
    description: "Display all products with a unit price greater than $50"
  },
  {
    id: 5,
    name: "Discontinued Products",
    query: "SELECT * FROM products WHERE discontinued = true;",
    description: "Display all discontinued products"
  },
  {
    id: 6,
    name: "Orders from USA",
    query: "SELECT * FROM orders WHERE shipAddress.country = 'USA';",
    description: "Display all orders shipped to the USA"
  },
  {
    id: 7,
    name: "Customers from Germany",
    query: "SELECT * FROM customers WHERE address.country = 'Germany';",
    description: "Display all customers based in Germany"
  },
  {
    id: 8,
    name: "Low stock products",
    query: "SELECT * FROM products WHERE unitsInStock < 10;",
    description: "Display products with low inventory levels"
  },
  {
    id: 9,
    name: "Customers from France",
    query: "SELECT * FROM customers WHERE address.country = 'France';",
    description: "Display all customers based in France"
  },
  {
    id: 10,
    name: "Orders to Finland",
    query: "SELECT * FROM orders WHERE shipAddress.country = 'Finland';",
    description: "Display all orders shipped to Finland"
  }
];
