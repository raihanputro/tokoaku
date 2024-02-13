import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { hidePopup } from '@containers/App/actions';
import { selectTheme, selectPopup, selectLoading } from '@containers/App/selectors';

import Loader from '@components/Loader';
import ClientRoutes from '@components/ClientRoutes';
import PopupMessage from '@components/PopupMessage/Dialog';

const App = ({ theme, popup, loading }) => {
  const dispatch = useDispatch();
  const isDark = theme === 'dark';
  const muiTheme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
    },
  });

  const closePopup = () => {
    dispatch(hidePopup());
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeProvider theme={muiTheme}>
      <ClientRoutes />
      <Loader isLoading={loading} />
      <PopupMessage
        open={popup.open}
        title={popup.title}
        message={popup.message}
        onClose={closePopup}
      />
    </ThemeProvider>
  );
};

App.propTypes = {
  theme: PropTypes.string,
  popup: PropTypes.shape({
    open: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
  }),
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  theme: selectTheme,
  popup: selectPopup,
  loading: selectLoading,
});

export default connect(mapStateToProps)(App);
