export const fetchData = async () => {
  try {
    const baseUrl = '/sql-query-runner/';  // Change to '/sql-query-runner/' when deploying to GitHub Pages
    const [products, orders, customers] = await Promise.all([
      fetch(`${baseUrl}json/products.json`).then(res => res.json()),
      fetch(`${baseUrl}json/orders.json`).then(res => res.json()),
      fetch(`${baseUrl}json/customers.json`).then(res => res.json())
    ]);
    return { products, orders, customers };
  } catch (error) {
    console.error('Error loading data:', error);
    throw error;
  }
};
