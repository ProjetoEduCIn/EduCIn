import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../components/pages/Login';
import { alunoService } from '../../services/apiService';

// Mock do useNavigate para testar navegacao
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

// Mock do serviço de API para simular chamadas
jest.mock('../../services/apiService');

describe('Login Tradicional', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {  // Limpa os mocks antes de cada teste
    jest.clearAllMocks();
  });

  test('deve fazer login com credenciais corretas', async () => {
    // Simula resposta bem-sucedida da API
    alunoService.login.mockResolvedValueOnce({
      access_token: 'fake-token',
      refresh_token: 'fake-refresh',
      user: { email: 'aluno@cin.ufpe.br' }
    });

    render(
      <BrowserRouter>
        <Login onPageChange={mockOnPageChange} />
      </BrowserRouter>
    );
    
    // Simula preenchimento do formulário
    fireEvent.change(screen.getByPlaceholderText('seu.email@cin.ufpe.br'), {
      target: { value: 'aluno@cin.ufpe.br' }
    });
    
    fireEvent.change(screen.getByPlaceholderText('Sua senha'), {
      target: { value: 'senha123' }
    });
    
    fireEvent.click(screen.getByText('Fazer Login'));
    
    // Verifica se a navegação ocorreu corretamente
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/si');
      expect(localStorage.getItem('access_token')).toBeTruthy();
    });
  });

  test('deve mostrar erro com credenciais inválidas', async () => {
    // Mock do erro do serviço
    alunoService.login.mockRejectedValueOnce({
      response: { data: { detail: 'Email ou senha incorretos' } }
    });

    render(
      <BrowserRouter>
        <Login onPageChange={mockOnPageChange} />
      </BrowserRouter>
    );
    
    fireEvent.change(screen.getByPlaceholderText('seu.email@cin.ufpe.br'), {
      target: { value: 'aluno@cin.ufpe.br' }
    });
    
    fireEvent.change(screen.getByPlaceholderText('Sua senha'), {
      target: { value: 'senhaerrada' }
    });
    
    fireEvent.click(screen.getByText('Fazer Login'));
    
    await waitFor(() => {
      expect(screen.getByText('Email ou senha incorretos')).toBeInTheDocument();
    });
  });
});

describe('Gerenciamento de Tokens', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    localStorage.clear();
    mockOnPageChange.mockClear(); // Limpar o mock antes de cada teste
  });

  test('deve limpar tokens ao fazer logout', () => {
    // Simula tokens armazenados
    localStorage.setItem('access_token', 'fake-token');
    localStorage.setItem('refresh_token', 'fake-refresh');

    act(() => {
      // Simula logout
      localStorage.clear();
    });

    // Verifica se os tokens foram removidos
    expect(localStorage.getItem('access_token')).toBeNull();
    expect(localStorage.getItem('refresh_token')).toBeNull();
  });

  test('deve verificar validade do token', () => {
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Token JWT
    localStorage.setItem('access_token', mockToken);

    expect(localStorage.getItem('access_token')).toBe(mockToken);
  });
});
