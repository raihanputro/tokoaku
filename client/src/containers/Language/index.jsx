import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { selectLocale } from '@containers/App/selectors';
import { selectMessages } from '@containers/Language/selectors';

const Language = ({ children, locale, messages }) => (
  <IntlProvider key={locale} locale={locale} messages={messages[locale]}>
    {children}
  </IntlProvider>
);

Language.propTypes = {
  children: PropTypes.element.isRequired,
  locale: PropTypes.string,
  messages: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  locale: selectLocale,
  messages: selectMessages,
});

export default connect(mapStateToProps)(Language);
