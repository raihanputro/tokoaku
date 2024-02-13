import PropTypes from 'prop-types';
import classNames from 'classnames';

import classes from './style.module.scss';

const Loader = ({ isLoading }) => (
  <div
    data-testid="Loading"
    className={classNames({
      [classes.loaderComponent]: true,
      [classes.showLoader]: isLoading || false,
    })}
  >
    <img src="/loader.svg" alt="Loading" />
  </div>
);

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
export default Loader;
