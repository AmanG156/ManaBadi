import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ForgotPassword from '../../pages/forgot-password';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));
describe('<Forgot  Password />', () => {
  test('render  one email input', async () => {
    await waitFor(() => {
      render(<ForgotPassword />);
      const email = screen.getByTestId('email');
      expect(email).toBeInTheDocument();
      expect(email).toHaveAttribute('type', 'email');
      // Call blur without inputting anything which should trigger a validation error
      fireEvent.blur(email);
    });
  });
  test('it render cancel button', () => {
    render(<ForgotPassword />);
    const cencelButton = screen.getByText('CANCEL');
    expect(cencelButton).toBeInTheDocument();
    // fireEvent.click(button);
  });
  test('it render recover button', () => {
    render(<ForgotPassword />);
    const recoverButton = screen.getByText('RECOVER');
    expect(recoverButton).toBeInTheDocument();
    // fireEvent.click(button);
  });
});
