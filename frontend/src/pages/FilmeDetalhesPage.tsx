import { useParams } from 'react-router-dom';

export default function FilmeDetalhesPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <main>
      <h1>Detalhes do Filme</h1>
      <p>ID: {id} — busca por ID e exibição de avaliações.</p>
    </main>
  );
}
