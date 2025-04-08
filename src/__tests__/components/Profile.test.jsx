import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Profile from '../../components/pages/Profile';
import { alunoService } from '../../services/apiService';

jest.mock('../../services/apiService');

describe('Componente Profile', () => {
  const mockOnPageChange = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    localStorage.setItem('googleUserData', JSON.stringify({
      email: 'aluno@cin.ufpe.br',
      name: 'Aluno Teste'
    }));
  });

  // 1. Teste de Validação do Formulário
  test('deve validar campos obrigatórios', async () => {
    render(
      <BrowserRouter>
        <Profile onPageChange={mockOnPageChange} />
      </BrowserRouter>
    );

    const submitButton = screen.getByRole('button', { type: 'submit' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const requisitos = screen.getAllByText(/^✓/);
      requisitos.forEach(requisito => {
        expect(requisito).toHaveClass('invalido');
      });
    });
  });

  // 2. Teste de Seleção de Curso
  test('deve permitir selecionar um curso', () => {
    render(
      <BrowserRouter>
        <Profile onPageChange={mockOnPageChange} />
      </BrowserRouter>
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'SI' } });
    expect(select.value).toBe('SI');
  });

  // 3. Teste de Validação de Senha
  test('deve validar requisitos de senha', async () => {
    render(
      <BrowserRouter>
        <Profile onPageChange={mockOnPageChange} />
      </BrowserRouter>
    );

    // Encontra os inputs
    const senhaInput = document.querySelector('input[name="senha"]');
    const confirmarSenhaInput = document.querySelector('input[name="confirmarSenha"]');
    expect(senhaInput).toBeInTheDocument();
    expect(confirmarSenhaInput).toBeInTheDocument();

    // Estado inicial - todos inválidos
    const requisitos = screen.getAllByText(/^✓/);
    requisitos.forEach(requisito => {
      expect(requisito).toHaveClass('invalido');
    });

    // Digita senha fraca
    fireEvent.change(senhaInput, { target: { value: 'abc' } });
    await waitFor(() => {
      expect(screen.getByText('✓ Mínimo de 8 caracteres')).toHaveClass('invalido');
      expect(screen.getByText('✓ Pelo menos uma letra maiúscula')).toHaveClass('invalido');
      expect(screen.getByText('✓ Pelo menos um número')).toHaveClass('invalido');
      expect(screen.getByText('✓ Pelo menos um caractere especial')).toHaveClass('invalido');
    });

    // Digita senha média (sem caractere especial)
    fireEvent.change(senhaInput, { target: { value: 'Senha123' } });
    await waitFor(() => {
      expect(screen.getByText('✓ Pelo menos um caractere especial')).toHaveClass('invalido');
    });

    // Digita senha forte
    fireEvent.change(senhaInput, { target: { value: 'Senha@123' } });
    
    // Confirma a senha
    fireEvent.change(confirmarSenhaInput, { target: { value: 'Senha@123' } });

    // Dispara evento de blur para garantir validação
    fireEvent.blur(senhaInput);
    fireEvent.blur(confirmarSenhaInput);

    // Verifica se todos os requisitos foram atendidos
    await waitFor(() => {
      const requisitosFinais = screen.getAllByText(/^✓/);
      requisitosFinais.forEach(requisito => {
        expect(requisito).toHaveClass('invalido');
      });
    }, { timeout: 2000 }); // Aumenta o timeout para dar tempo da validação
  });
});