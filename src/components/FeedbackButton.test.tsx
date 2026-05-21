import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FeedbackButton from './FeedbackButton';

vi.mock('../lib/supabase', () => ({
  supabase: {
    from: () => ({
      insert: vi.fn().mockResolvedValue({ error: null }),
    }),
  },
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('FeedbackButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the trigger button', () => {
    render(<FeedbackButton />);
    expect(screen.getByRole('button', { name: /enviar feedback/i })).toBeInTheDocument();
  });

  it('opens the modal when trigger is clicked', async () => {
    render(<FeedbackButton />);
    await userEvent.click(screen.getByRole('button', { name: /enviar feedback/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('¿Cómo fue tu experiencia?')).toBeInTheDocument();
  });

  it('closes the modal when close button is clicked', async () => {
    render(<FeedbackButton />);
    await userEvent.click(screen.getByRole('button', { name: /enviar feedback/i }));
    await userEvent.click(screen.getByRole('button', { name: /cerrar/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders 5 star buttons', async () => {
    render(<FeedbackButton />);
    await userEvent.click(screen.getByRole('button', { name: /enviar feedback/i }));
    const stars = screen.getAllByRole('button', { name: /estrella/i });
    expect(stars).toHaveLength(5);
  });

  it('submit button is disabled when no rating is selected', async () => {
    render(<FeedbackButton />);
    await userEvent.click(screen.getByRole('button', { name: /enviar feedback/i }));
    const submitBtn = screen.getAllByRole('button').find(
      (btn) => btn.textContent === 'Enviar feedback'
    );
    expect(submitBtn).toBeDisabled();
  });

  it('enables submit button after selecting a star', async () => {
    render(<FeedbackButton />);
    await userEvent.click(screen.getByRole('button', { name: /enviar feedback/i }));
    await userEvent.click(screen.getByRole('button', { name: '4 estrellas' }));
    const submitBtn = screen.getAllByRole('button').find(
      (btn) => btn.textContent === 'Enviar feedback'
    );
    expect(submitBtn).not.toBeDisabled();
  });

  it('marks selected star as pressed', async () => {
    render(<FeedbackButton />);
    await userEvent.click(screen.getByRole('button', { name: /enviar feedback/i }));
    const star3 = screen.getByRole('button', { name: '3 estrellas' });
    await userEvent.click(star3);
    expect(star3).toHaveAttribute('aria-pressed', 'true');
  });

  it('shows success state after submitting', async () => {
    render(<FeedbackButton />);
    await userEvent.click(screen.getByRole('button', { name: /enviar feedback/i }));
    await userEvent.click(screen.getByRole('button', { name: '5 estrellas' }));
    const submitBtn = screen.getAllByRole('button').find(
      (btn) => btn.textContent === 'Enviar feedback'
    );
    await userEvent.click(submitBtn!);
    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByText('¡Gracias por tu opinión!')).toBeInTheDocument();
    });
  });

  it('accepts text in the textarea', async () => {
    render(<FeedbackButton />);
    await userEvent.click(screen.getByRole('button', { name: /enviar feedback/i }));
    const textarea = screen.getByPlaceholderText(/cuéntanos tu experiencia/i);
    await userEvent.type(textarea, 'Excelente plataforma');
    expect(textarea).toHaveValue('Excelente plataforma');
  });
});
