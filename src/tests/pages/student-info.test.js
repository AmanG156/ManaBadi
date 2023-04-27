import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import StudentInfo from '../../pages/register/student-info';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));
describe('<student  Info />', () => {
  test('renders firstName', async () => {
    await waitFor(() => {
      render(<StudentInfo />);
      const firstName = screen.getByTestId('firstName');
      expect(firstName).toBeInTheDocument();
      expect(firstName).toHaveAttribute('type', 'text');
      fireEvent.blur(firstName);
    });
  });

  test('renders middleName', async () => {
    await waitFor(() => {
      render(<StudentInfo />);
      const middleName = screen.getByTestId('middleName');
      expect(middleName).toBeInTheDocument();
      expect(middleName).toHaveAttribute('type', 'text');
      fireEvent.blur(middleName);
    });
  });

  test('renders lastName', async () => {
    await waitFor(() => {
      render(<StudentInfo />);
      const lastName = screen.getByTestId('lastName');
      expect(lastName).toBeInTheDocument();
      expect(lastName).toHaveAttribute('type', 'text');
      fireEvent.blur(lastName);
    });
  });

  test('renders tShirt', async () => {
    await waitFor(() => {
      render(<StudentInfo />);
      const tShirt = screen.getByTestId('tShirt');
      expect(tShirt).toBeInTheDocument();
      fireEvent.blur(tShirt);
    });
  });

  test('renders gender', async () => {
    await waitFor(() => {
      render(<StudentInfo />);
      const gender = screen.getByTestId('gender');
      expect(gender).toBeInTheDocument();
      fireEvent.blur(gender);
    });
  });

  test('renders academicYear', async () => {
    await waitFor(() => {
      render(<StudentInfo />);
      const academicYear = screen.getByTestId('academicYear');
      expect(academicYear).toBeInTheDocument();
      fireEvent.blur(academicYear);
    });
  });

  test('renders grade', async () => {
    await waitFor(() => {
      render(<StudentInfo />);
      const grade = screen.getByTestId('grade');
      expect(grade).toBeInTheDocument();
      fireEvent.blur(grade);
    });
  });
  test('renders classLevel', async () => {
    await waitFor(() => {
      render(<StudentInfo />);
      const classLevel = screen.getByTestId('classLevel');
      expect(classLevel).toBeInTheDocument();
      fireEvent.blur(classLevel);
    });
  });

  test('renders sortedNearest', async () => {
    await waitFor(() => {
      render(<StudentInfo />);
      const sortedNearest = screen.getByTestId('sortedNearest');
      expect(sortedNearest).toBeInTheDocument();
      fireEvent.blur(sortedNearest);
    });
  });
  test('it render add sibling button', () => {
    render(<StudentInfo />);
    const addSiblingButton = screen.getByText('ADD_SIBLING');
    expect(addSiblingButton).toBeInTheDocument();
    // fireEvent.click(button);
  });
  test('it render save button', () => {
    render(<StudentInfo />);
    const saveButton = screen.getByText('SAVE_CONTINUE');
    expect(saveButton).toBeInTheDocument();
    // fireEvent.click(button);
  });
});
