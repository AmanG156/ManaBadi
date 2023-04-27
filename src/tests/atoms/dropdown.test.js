import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import Dropdown from '../../components/atoms/dropdown';
import { fonts } from '../../theme';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));
describe('<Dropdown />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Dropdown />)
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toBeTruthy();
  });
  it('Should have form control class', () => {
    const wrapper = renderer.create(<Dropdown />);
    const childStyles = wrapper.toJSON();
    expect(childStyles.props.className.split(' ').includes('makeStyles-formControl-1')).toBe(true);
  });
});
