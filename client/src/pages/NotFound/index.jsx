import { FormattedMessage } from 'react-intl';

import logo from '@static/images/not-found.png';

import classes from './style.module.scss';

const NotFound = () => (
  <div className={classes.contentWrapper}>
    <img className={classes.image} src={logo} alt="Not Found" />
    <div className={classes.title}>
      <FormattedMessage id="app_not_found" />
    </div>
  </div>
);

export default NotFound;
