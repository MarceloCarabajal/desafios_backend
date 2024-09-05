import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Tabs,
  Tab,
  Container,
  Snackbar,
  Alert
} from '@mui/material'
import { motion } from 'framer-motion'
import { Login as LoginIcon, PersonAdd } from '@mui/icons-material'
import { login, clearError } from '../../redux/authSlice'
import { register } from '../../services/api'

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Correo Electrónico"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Contraseña"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          startIcon={<LoginIcon />}
          disabled={loading}
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </Button>
      </motion.div>
      {error && <Alert severity="error">{error}</Alert>}
    </form>
  );
}

function RegisterForm({ onSuccess }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await register({ first_name: firstName, last_name: lastName, age, email, password });
      onSuccess(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="firstName"
        label="Nombre"
        name="firstName"
        autoComplete="given-name"
        autoFocus
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="lastName"
        label="Apellido"
        name="lastName"
        autoComplete="family-name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="age"
        label="Edad"
        type="number"
        name="age"
        autoComplete="age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Correo Electrónico"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Contraseña"
        type="password"
        id="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          startIcon={<PersonAdd />}
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </Button>
      </motion.div>
      {error && <Alert severity="error">{error}</Alert>}
    </form>
  );
}

export default function LoginPage() {
  const [tabValue, setTabValue] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSuccess = (data) => {
    setSuccessMessage(data.message || 'Operación exitosa');
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <Container maxWidth="sm">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%', background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
          <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ color: 'white', mb: 3 }}>
            Acceso de Usuario
          </Typography> 
          
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            centered 
            sx={{ 
              mb: 3,
              '& .MuiTab-root': { color: 'white' },
              '& .Mui-selected': { color: 'white', fontWeight: 'bold' },
              '& .MuiTabs-indicator': { backgroundColor: 'white' }
            }}
          >
            <Tab label="Iniciar Sesión" />
            <Tab label="Registro" />
          </Tabs>
          
          <Box sx={{ mt: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 2, p: 3 }}>
            {tabValue === 0 && <LoginForm />}
            {tabValue === 1 && <RegisterForm onSuccess={handleSuccess} />}
          </Box>
          
        </Paper>
        
      </motion.div>
      <Snackbar 
        open={!!successMessage} 
        autoHideDuration={6000} 
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}