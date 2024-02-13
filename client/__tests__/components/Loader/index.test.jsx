import { render } from '@testing-library/react';

import Loader from '@components/Loader';
import classes from '@components/Loader/style.module.scss';

describe('Component Loader', () => {
  test('renders loader when isLoading is true', () => {
    const { getByTestId } = render(<Loader isLoading />);
    const loaderComponent = getByTestId('Loading');
    expect(loaderComponent).toHaveClass(classes.showLoader);
  });

  test('does not render loader when isLoading is false', () => {
    const { getByTestId } = render(<Loader isLoading={false} />);

    const loaderComponent = getByTestId('Loading');
    expect(loaderComponent).not.toHaveClass(classes.showLoader);
  });

  test('Should match with snapshot', () => {
    const loader = render(<Loader isLoading />);
    expect(loader).toMatchSnapshot();
  });
});
