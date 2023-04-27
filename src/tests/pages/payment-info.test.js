import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PaymentInfo from '../../pages/register/payment-info';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));
describe('<Payment Info />', () => {
  test('renders contributionCause', async () => {
    await waitFor(() => {
      render(<PaymentInfo />);
      const contributionCause = screen.getByTestId('contributionCause');
      expect(contributionCause).toBeInTheDocument();
      fireEvent.blur(contributionCause);
    });
  });
  test('render contributionAmount input', async () => {
    await waitFor(() => {
      render(<PaymentInfo />);
      const contributionAmount = screen.getByTestId('contributionAmount');
      expect(contributionAmount).toBeInTheDocument();
      expect(contributionAmount).toHaveAttribute('type', 'text');
      // Call blur without inputting anything which should trigger a validation error
      fireEvent.blur(contributionAmount);
    });
  });
  test('it render payment button', async () => {
    await waitFor(() => {
      render(<PaymentInfo />);
      const paymentButton = screen.getByText('CONTINUE_TO_PAYMENT');
      expect(paymentButton).toBeInTheDocument();
      fireEvent.click(paymentButton);
    });
  });
});
