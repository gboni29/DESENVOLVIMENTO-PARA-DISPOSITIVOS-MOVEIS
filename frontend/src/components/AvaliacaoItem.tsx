import type { Avaliacao } from '../types';

interface Props {
  avaliacao: Avaliacao;
}

export default function AvaliacaoItem({ avaliacao }: Props) {
  return (
    <div>
      <strong>Nota: {avaliacao.nota}/10</strong>
      <p>{avaliacao.comentario}</p>
    </div>
  );
}
