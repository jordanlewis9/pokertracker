import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import * as actions from '../../actions';

const Auth = (props) => {
  const { authUser, user } = props;
  useEffect(() => {
    authUser();
  }, [authUser]);

  const renderAuth = () => {
    if (!user.email){
      return (
        <div>
          <Link to='/signin'><button>Sign In</button></Link>
          <Link to='/signup'><button>Sign Up</button></Link>
        </div>
      )
    } else {
      return (
        <div>
          <p>Welcome, {user.username}</p>
        </div>
      )
    }
  }

  return (
    <div>
      {renderAuth()}
    </div>

  )
};

function mapStateToProps(state){
  return { user: state.auth.auth };
}

export default connect(mapStateToProps, actions)(Auth);