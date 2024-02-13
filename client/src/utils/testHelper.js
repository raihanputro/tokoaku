import React from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import { DEFAULT_LOCALE } from '@containers/Language/constants';
import store from '../configureStore';

import idLocaleData from '../languages/id';
import enLocaleData from '../languages/en';

const messages = {
  id: { ...idLocaleData },
  en: { ...enLocaleData },
};

const AppProvider = ({ children }) => (
  <Provider store={store}>
    <IntlProvider key="locale" locale={DEFAULT_LOCALE} messages={messages[DEFAULT_LOCALE]}>
      {children}
    </IntlProvider>
  </Provider>
);

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

const customRender = (ui, options) => render(ui, { wrapper: AppProvider, ...options });

const wait = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

export * from '@testing-library/react';

export { customRender as render, wait };
