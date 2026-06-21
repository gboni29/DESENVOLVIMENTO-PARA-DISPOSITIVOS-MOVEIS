// Components: blocos de UI reutilizáveis entre páginas.
// Não fazem chamadas à API — recebem dados via props das páginas.

import { Link } from 'react-router-dom';

// Substitua por contexto de autenticação real quando implementar o login
const isLoggedIn = false;

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Início</Link>
      {isLoggedIn && <Link to="/watchlist">Watchlist</Link>}
      <Link to="/login">Login</Link>
    </nav>
  );
}
