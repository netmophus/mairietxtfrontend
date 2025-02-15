import { useEffect } from 'react';

const useInactivityTimeout = (logoutCallback, timeout = 300000) => {
  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        logoutCallback(); // Déconnecte l'utilisateur après l'expiration du timer
      }, timeout);
    };

    // Écoute les événements d'activité
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);

    resetTimer(); // Initialisation du timer

    return () => {
      clearTimeout(timer); // Nettoyer le timer
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, [logoutCallback, timeout]);
};

export default useInactivityTimeout;
