import { render } from '@testing-library/react';
import PokemonCard from './PokemonCard';

test('PokemonCard muestra el nombre correctamente', () => {
  const pokemon = { name: 'Pikachu' };
  const { getByText } = render(<PokemonCard pokemon={pokemon} />);
  const nameElement = getByText(/Pikachu/i);
  expect(nameElement).toBeInTheDocument();
});
