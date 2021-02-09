import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import * as actions from '../../actions';
import SignOutButton from './SignOutButton';

const Auth = (props) => {
  const { authUser, user } = props;
  useEffect(() => {
    authUser();
  }, [authUser]);

  console.log(props);

  const renderAuth = () => {
    if (!user.id){
      return (
        <div>
          <Link to='/signin'><button>Sign In</button></Link>
          <Link to='/signup'><button>Sign Up</button></Link>
        </div>
      )
    } else {
      return (
        <SignOutButton username={user.username} />
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
  return { user: state.auth };
}

export default connect(mapStateToProps, actions)(Auth);