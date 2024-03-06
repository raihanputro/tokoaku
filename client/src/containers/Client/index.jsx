import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLogin, selectUser } from '@containers/Client/selectors';

const Client = ({ role, login, user, children }) => {
  const navigate = useNavigate();
 
  useEffect(() => {
    if (!login) {
      navigate('/login');
    }
  }, [login, navigate]);

  if (role == 1) {
    if (user?.role != 'Admin') {
      navigate('/');
    }
    return children;
  }

  return children;
};

Client.propTypes = {
  login: PropTypes.bool,
  user: PropTypes.object,
  children: PropTypes.element,
  role: PropTypes.number
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  user: selectUser
});

export default connect(mapStateToProps)(Client);
