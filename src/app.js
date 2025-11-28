const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use('/api', apiRoutes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Basit sağlık kontrolü
app.get('/', (req, res) => {
  res.json({ message: 'API çalışıyor' });
});

// Hata yakalama middleware
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || 500;
  res.status(status).json({
    error: err.message || 'Beklenmeyen hata'
  });
});

module.exports = app;