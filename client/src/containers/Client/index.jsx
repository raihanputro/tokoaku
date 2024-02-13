import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLogin, selectUser } from '@containers/Client/selectors';

const Client = ({ login, user, children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const expirationTime = ( user?.exp * 1000) - 6000;

    if (!login || Date.now() >= expirationTime) {
      navigate('/login');
    }
  }, [login, user, navigate]);

  return children;
};

Client.propTypes = {
  login: PropTypes.bool,
  user: PropTypes.object,
  children: PropTypes.element,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  user: selectUser
});

export default connect(mapStateToProps)(Client);
