import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../components/pages/Login';
import { alunoService } from '../../services/apiService';
import { jwtDecode } from 'jwt-decode';

// Mock do useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

// Mocks necessários
jest.mock('jwt-decode');
jest.mock('../../services/apiService');

// Mock do Google OAuth
jest.mock('@react-oauth/google', () => ({
  GoogleOAuthProvider: ({ children }) => children,
  GoogleLogin: ({ onSuccess }) => (
    <button onClick={() => onSuccess({ credential: 'fake-token' })}>
      Login com Google
    </button>
  )
}));

describe('Autenticação Google', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('deve fazer login com Google para usuário existente', async () => {
    // Mock da resposta do backend para usuário existente
    alunoService.googleLogin.mockResolvedValueOnce({
      access_token: 'fake-token',
      refresh_token: 'fake-refresh',
      user: { email: 'aluno@cin.ufpe.br' }
    });

    // Mock do decode do token
    jwtDecode.mockReturnValue({
      email: 'aluno@cin.ufpe.br',
      name: 'Aluno Existente'
    });

    render(
      <BrowserRouter>
        <Login onPageChange={mockOnPageChange} />
      </BrowserRouter>
    );

    // Clica no botão do Google
    const googleButton = screen.getByText('Login com Google');
    fireEvent.click(googleButton);

    // Verifica redirecionamento
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/si');
      expect(localStorage.getItem('access_token')).toBe('fake-token');
    });
  });

  test('deve redirecionar para perfil no primeiro acesso com Google', async () => {
    // Mock da resposta do backend para primeiro acesso
    alunoService.googleLogin.mockResolvedValueOnce({
      status: 'first_access',
      email: 'novo@cin.ufpe.br',
      given_name: 'Novo Usuário'
    });

    // Mock do decode do token
    jwtDecode.mockReturnValue({
      email: 'novo@cin.ufpe.br',
      name: 'Novo Usuário',
      picture: 'foto.jpg'
    });

    render(
      <BrowserRouter>
        <Login onPageChange={mockOnPageChange} />
      </BrowserRouter>
    );

    // Clica no botão do Google
    const googleButton = screen.getByText('Login com Google');
    fireEvent.click(googleButton);

    // Verifica redirecionamento e dados salvos
    await waitFor(() => {
      expect(mockOnPageChange).toHaveBeenCalledWith('profile');
      const googleData = JSON.parse(localStorage.getItem('googleUserData'));
      expect(googleData).toEqual({
        email: 'novo@cin.ufpe.br',
        name: 'Novo Usuário',
        picture: 'foto.jpg',
        token: 'fake-token'
      });
    });
  });

  test('deve rejeitar email não-CIn', async () => {
    // Mock do decode do token com email inválido
    jwtDecode.mockReturnValue({
      email: 'invalido@gmail.com',
      name: 'Usuário Inválido'
    });

    render(
      <BrowserRouter>
        <Login onPageChange={mockOnPageChange} />
      </BrowserRouter>
    );

    // Clica no botão do Google
    const googleButton = screen.getByText('Login com Google');
    fireEvent.click(googleButton);

    // Verifica mensagem de erro
    await waitFor(() => {
      expect(screen.getByText(/apenas emails @cin.ufpe.br são permitidos/i)).toBeInTheDocument();
    });
  });
});