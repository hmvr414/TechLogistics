
const db = require('./db'); // Adjust the path to your db.js file
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

// Hardcoded credentials
const USERNAME = 'admin';
const PASSWORD = '123456';

app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // admin login
  if (username === 'admin' && password === '123456') {
    return res.json({ success: true, role: 'admin' });
  }

  // clients login
  const query = 'SELECT * FROM clientes WHERE username = ? AND password = ?';
  console.log('Username:', username);
  console.log('Password:', password);
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error during client login:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }

    if (results.length === 1) {
      const client = results[0];
      return res.json({
        success: true,
        role: 'client',
        clientId: client.cliente_id,
        nombre: client.nombre,
      });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});


app.get('/hello', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

const productRoutes = require('./routes/products');
app.use('/products', productRoutes);

const transportistaRoutes = require('./routes/transportistas');
app.use('/transportistas', transportistaRoutes);

const clienteRoutes = require('./routes/clientes');
app.use('/clientes', clienteRoutes);

const cartRoutes = require('./routes/cart');
app.use('/cart', cartRoutes);

const checkoutRoutes = require('./routes/checkout');
app.use('/checkout', checkoutRoutes);

const orderRoutes = require('./routes/orders');
app.use('/orders', orderRoutes);

const shippingRoutes = require('./routes/shipping');
app.use('/shipping', shippingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
