import type { Filme } from '../types';
import { Link } from 'react-router-dom';

interface Props {
  filme: Filme;
}

export default function FilmeCard({ filme }: Props) {
  return (
    <article>
      <img src={filme.posterUrl} alt={filme.titulo} width={150} />
      <h2>{filme.titulo}</h2>
      <p>{filme.diretor} · {filme.anoLancamento}</p>
      <Link to={`/filmes/${filme.id}`}>Ver detalhes</Link>
    </article>
  );
}
