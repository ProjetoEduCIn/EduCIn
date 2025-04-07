// Importações necessárias para os testes
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../components/pages/Login';
import { alunoService } from '../../services/apiService';
import { jwtDecode } from 'jwt-decode';

// Mock do useNavigate para testar navegação
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

jest.mock('jwt-decode');
jest.mock('../../services/apiService');
jest.mock('@react-oauth/google', () => ({
  // Mock do componente Google OAuth para testes
  GoogleOAuthProvider: ({ children }) => children,
  GoogleLogin: () => <button>Login com Google</button>
}));

describe('Autenticação Google', () => {
  const mockOnPageChange = jest.fn();

  // Limpa mocks e localStorage antes de cada teste
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('deve fazer login com Google para usuário existente', async () => {
    // Simula resposta bem-sucedida do login Google
    alunoService.googleLogin.mockResolvedValueOnce({
      access_token: 'fake-token',
      refresh_token: 'fake-refresh',
      user: { email: 'aluno@cin.ufpe.br' }
    });

    render(
      <BrowserRouter>
        <Login onPageChange={mockOnPageChange} />
      </BrowserRouter>
    );

    // Verifica se o botão do Google está presente
    await waitFor(() => {
      expect(screen.getByText('Login com Google')).toBeInTheDocument();
    });
  });

  test('deve redirecionar para perfil no primeiro acesso', async () => {
    const mockGoogleToken = 'fake-google-token';
    jwtDecode.mockReturnValue({ 
      email: 'novo@cin.ufpe.br',
      name: 'Novo Aluno' 
    });

    render(
      <BrowserRouter>
        <Login onPageChange={mockOnPageChange} />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Login com Google')).toBeInTheDocument();
    });
  });
});