import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button,
  Container,
  useScrollTrigger,
  Fab,
  Zoom,
  Box
} from '@mui/material'
import { ShoppingCart, Rocket, Home, Login, ContactMail } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'

import HomePage from './components/HomePage/HomePage'
import CartPage from './components/CartPage/CartPage'
import LoginPage from './components/LoginPage/LoginPage'
import ContactPage from './components/ContactPage/ContactPage'

function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = document.querySelector('#back-to-top-anchor');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

const pageVariants = {
  initial: { opacity: 0, x: "-100vw" },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: "100vw" }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

export default function Component() {
  return (
    <Router>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}
      >
        <AppBar position="static" sx={{ width: '100%' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Marce Store
            </Typography>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button color="inherit" component={Link} to="/" startIcon={<Home />}>
                Home
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button color="inherit" component={Link} to="/cart" startIcon={<ShoppingCart />}>
                Cart
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button color="inherit" component={Link} to="/login" startIcon={<Login />}>
                Login
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button color="inherit" component={Link} to="/contact" startIcon={<ContactMail />}>
                Contact
              </Button>
            </motion.div>
          </Toolbar>
        </AppBar>
        <Toolbar id="back-to-top-anchor" />
        <Container 
          component="main" 
          maxWidth="lg"
          sx={{ 
            mt: 4, 
            mb: 4, 
            flexGrow: 1, 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 'lg' }}>
            <AnimatePresence mode='wait'>
              <Routes>
                <Route path="/" element={
                  <motion.div
                    key="home"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <HomePage />
                  </motion.div>
                } />
                <Route path="/cart" element={
                  <motion.div
                    key="cart"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <CartPage />
                  </motion.div>
                } />
                <Route path="/login" element={
                  <motion.div
                    key="login"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <LoginPage />
                  </motion.div>
                } />
                <Route path="/contact" element={
                  <motion.div
                    key="contact"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <ContactPage />
                  </motion.div>
                } />
              </Routes>
            </AnimatePresence>
          </Box>
        </Container>
      
        <ScrollTop>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <Rocket />
          </Fab>
        </ScrollTop>
      </motion.div>
    </Router>
  )
}