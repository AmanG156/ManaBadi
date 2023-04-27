import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { shallow, configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import ParentInfo from '../../pages/register/parent-info';

configure({ adapter: new Adapter() });
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));
describe('<Parent One Info />', () => {
  test('renders parentOneTitle', async () => {
    await waitFor(() => {
      render(<ParentInfo />);
      const parentOneTitle = screen.getByTestId('parentOneTitle');
      expect(parentOneTitle).toBeInTheDocument();
      fireEvent.blur(parentOneTitle);
    });
  });
  test('render parent one email input', async () => {
    await waitFor(() => {
      render(<ParentInfo />);
      const parentOneEmail = screen.getByTestId('parentOneEmail');
      expect(parentOneEmail).toBeInTheDocument();
      expect(parentOneEmail).toHaveAttribute('type', 'email');
      // Call blur without inputting anything which should trigger a validation error
      fireEvent.blur(parentOneEmail);
    });
  });
  test('render parent one first name input', async () => {
    await waitFor(() => {
      render(<ParentInfo />);
      const parentOneFirstName = screen.getByTestId('parentOneFirstName');
      expect(parentOneFirstName).toBeInTheDocument();
      expect(parentOneFirstName).toHaveAttribute('type', 'text');
      fireEvent.blur(parentOneFirstName);
    });
  });
  test('render parent one middle name input', async () => {
    await waitFor(() => {
      render(<ParentInfo />);
      const parentOneMiddleName = screen.getByTestId('parentOneMiddleName');
      expect(parentOneMiddleName).toBeInTheDocument();
      expect(parentOneMiddleName).toHaveAttribute('type', 'text');
      fireEvent.blur(parentOneMiddleName);
    });
  });
  test('render parent one last name input', async () => {
    await waitFor(() => {
      render(<ParentInfo />);
      const parentOneLastName = screen.getByTestId('parentOneLastName');
      expect(parentOneLastName).toBeInTheDocument();
      expect(parentOneLastName).toHaveAttribute('type', 'text');
      fireEvent.blur(parentOneLastName);
    });
  });
  test('render parent one contact  input', async () => {
    await waitFor(() => {
      render(<ParentInfo />);
      const parentOneContact = screen.getByTestId('parentOneContact');
      expect(parentOneContact).toBeInTheDocument();
    });
  });
  test('render parent  two profession  input', async () => {
    await waitFor(() => {
      render(<ParentInfo />);
      const parentOneProfession = screen.getByTestId('parentOneProfession');
      expect(parentOneProfession).toBeInTheDocument();
      expect(parentOneProfession).toHaveAttribute('type', 'text');
      fireEvent.blur(parentOneProfession);
    });
  });

  test('render parent two company  input', async () => {
    await waitFor(() => {
      render(<ParentInfo />);
      const parentOneCompany = screen.getByTestId('parentOneCompany');
      expect(parentOneCompany).toBeInTheDocument();
      expect(parentOneCompany).toHaveAttribute('type', 'text');
      fireEvent.blur(parentOneCompany);
    });
  });
});

describe('<Parent Two Info />', () => {
  test('renders parentTwoTitle', async () => {
    await waitFor(() => {
      render(<ParentInfo />);
      const parentTwoTitle = screen.getByTestId('parentTwoTitle');
      expect(parentTwoTitle).toBeInTheDocument();
      fireEvent.blur(parentTwoTitle);
    });
  });
  test('render parent two email input', async () => {
    await waitFor(() => {
      render(<ParentInfo />);
      const parentTwoEmail = screen.getByTestId('parentTwoEmail');
      expect(parentTwoEmail).toBeInTheDocument();
      expect(parentTwoEmail).toHaveAttribute('type', 'email');
      fireEvent.blur(parentTwoEmail);
    });
  });
  test('render parent two first name input', async () => {
    await waitFor(() => {
      render(<ParentInfo />);
      const parentTwoFirstName = screen.getByTestId('parentTwoFirstName');
      expect(parentTwoFirstName).toBeInTheDocument();
      expect(parentTwoFirstName).toHaveAttribute('type', 'text');
      fireEvent.blur(parentTwoFirstName);
    });
  });
  test('render parent two middle name input', async () => {
    await waitFor(() => {
      render(<ParentInfo />);
      const parentTwoMiddleName = screen.getByTestId('parentTwoMiddleName');
      expect(parentTwoMiddleName).toBeInTheDocument();
      expect(parentTwoMiddleName).toHaveAttribute('type', 'text');
      fireEvent.blur(parentTwoMiddleName);
    });
  });
  test('render parent two last name input', async () => {
    await waitFor(() => {
      render(<ParentInfo />);
      const parentTwoLastName = screen.getByTestId('parentTwoLastName');
      expect(parentTwoLastName).toBeInTheDocument();
      expect(parentTwoLastName).toHaveAttribute('type', 'text');
      fireEvent.blur(parentTwoLastName);
    });
  });
  test('render parent one contact  input', async () => {
    await waitFor(() => {
      render(<ParentInfo />);
      const parentTwoContact = screen.getByTestId('parentTwoContact');
      expect(parentTwoContact).toBeInTheDocument();
    });
  });
  test('render parent two profession  input', async () => {
    await waitFor(() => {
      render(<ParentInfo />);
      const parentTwoProfession = screen.getByTestId('parentTwoProfession');
      expect(parentTwoProfession).toBeInTheDocument();
      expect(parentTwoProfession).toHaveAttribute('type', 'text');
      fireEvent.blur(parentTwoProfession);
    });
  });

  test('render parent two company  input', async () => {
    await waitFor(() => {
      render(<ParentInfo />);
      const parentTwoCompany = screen.getByTestId('parentTwoCompany');
      expect(parentTwoCompany).toBeInTheDocument();
      expect(parentTwoCompany).toHaveAttribute('type', 'text');
      fireEvent.blur(parentTwoCompany);
    });
  });

  test('it render  onclick  event   on submit', async () => {
    await waitFor(() => {
      render(<ParentInfo />);
      const button = screen.getByTestId('submit');
      fireEvent.click(button);
    });
  });
});
