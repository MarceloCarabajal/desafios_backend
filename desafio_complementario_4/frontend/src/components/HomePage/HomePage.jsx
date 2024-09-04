import React, { useState, useEffect } from 'react'
import { 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Typography, 
  Button,
  Box
} from '@mui/material'
import { motion } from 'framer-motion'
import Footer from '../Footer/Footer';

const featuredProducts = [
  { id: 1, name: 'Teclado Mecánico RGB', price: 129.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 2, name: 'Mouse Gamer 16000 DPI', price: 79.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 3, name: 'Auriculares 7.1 Surround', price: 99.99, image: '/placeholder.svg?height=200&width=200' },
];

const categories = [
  { id: 1, name: 'Teclados', image: '/placeholder.svg?height=150&width=150' },
  { id: 2, name: 'Ratones', image: '/placeholder.svg?height=150&width=150' },
  { id: 3, name: 'Auriculares', image: '/placeholder.svg?height=150&width=150' },
  { id: 4, name: 'Monitores', image: '/placeholder.svg?height=150&width=150' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(featuredProducts);
  }, []);

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Bienvenido a Marce Store
        </Typography>
      </motion.div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
          Productos Destacados
        </Typography>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <motion.div variants={itemVariants}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${product.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="small">Añadir al Carrito</Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="small">Ver Detalles</Button>
                    </motion.div>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 6 }}>
          Categorías
        </Typography>
        <Grid container spacing={2}>
          {categories.map((category) => (
            <Grid item key={category.id} xs={6} sm={3}>
              <motion.div variants={itemVariants}>
                <Card>
                  <CardMedia
                    component="img"
                    height="150"
                    image={category.image}
                    alt={category.name}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div" align="center">
                      {category.name}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 6 }}>
          Contacto
        </Typography>
        <Footer />
      </motion.div>
    </Box>
  )
}