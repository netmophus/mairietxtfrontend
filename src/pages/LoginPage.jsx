import { useState, useContext } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Card,
  CardContent,
  CircularProgress,
  Grid,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const API_URL = process.env.REACT_APP_API_URL; // Pour Create React App

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!phone || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true); // Activer l'indicateur de chargement

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur de connexion');
      }

      login(data.user, data.token);

      // Redirection basée sur le rôle
      if (data.user.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (data.user.role === 'collector') {
        navigate('/collector-dashboard');
      } else if (data.user.role === 'contribuable') {
        navigate('/contribuable-dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Désactiver l'indicateur de chargement
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
        py: { xs: 2, md: 4 },
      }}
    >
      <Card
        sx={{
          maxWidth: { xs: '90%', sm: 400 },
          borderRadius: '16px',
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          mt: { xs: 2, md: 17 },
          mb: { xs: 2, md: 4 },
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: { xs: 3, sm: 4 },
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: 'primary.main',
              width: { xs: 48, sm: 56 },
              height: { xs: 48, sm: 56 },
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{ mb: { xs: 2, sm: 3 }, textAlign: 'center' }}
          >
            Se Connecter
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Numéro de Téléphone"
              name="phone"
              autoComplete="tel"
              autoFocus
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de Passe"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Typography variant="body2" color="error" sx={{ mt: 1, textAlign: 'center' }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading} // Désactiver pendant le chargement
              sx={{
                mt: 3,
                mb: 2,
                p: 1.5,
                fontSize: '1rem',
                backgroundColor: 'primary.main',
                '&:hover': { backgroundColor: 'primary.dark' },
              }}
            >
              {loading ? <CircularProgress size={24} /> : 'Connexion'}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography
                  component="a"
                  href="/register"
                  sx={{
                    color: 'primary.main',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Créer un compte
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LoginPage;
