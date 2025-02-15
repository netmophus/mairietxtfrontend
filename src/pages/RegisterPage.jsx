import  { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL; // Pour Create React App

  const roles = [
    { value: 'admin', label: 'Administrateur' },
    { value: 'collector', label: 'Collecteur' },
    { value: 'contribuable', label: 'Contribuable' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !phone || !password || !role) {
      setError('Veuillez remplir tous les champs requis.');
      return;
    }

    setLoading(true); // Activer le chargement

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l’inscription');
      }

      setSuccess('Compte créé avec succès ! Redirection...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Désactiver le chargement
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
        py: 4,
      }}
    >
      <Card
        sx={{
          maxWidth: { xs: '90%', sm: 400 },
          borderRadius: '16px',
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
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
              width: 56,
              height: 56,
            }}
          >
            <PersonAddOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              mb: 3,
              textAlign: 'center',
            }}
          >
            Créer un Compte
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Nom Complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Numéro de Téléphone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Adresse Email (optionnel)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              label="Mot de Passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="role-label">Rôle</InputLabel>
              <Select
                labelId="role-label"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                label="Rôle"
              >
                {roles.map((r) => (
                  <MenuItem key={r.value} value={r.value}>
                    {r.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {error && (
              <Typography variant="body2" color="error" sx={{ mt: 1, textAlign: 'center' }}>
                {error}
              </Typography>
            )}
            {success && (
              <Typography variant="body2" color="success.main" sx={{ mt: 1, textAlign: 'center' }}>
                {success}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading} // Désactiver le bouton pendant le chargement
              sx={{
                mt: 3,
                mb: 2,
                p: 1.5,
                fontSize: '1rem',
                backgroundColor: 'primary.main',
                '&:hover': { backgroundColor: 'primary.dark' },
              }}
            >
              {loading ? <CircularProgress size={24} /> : 'Inscription'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RegisterPage;
