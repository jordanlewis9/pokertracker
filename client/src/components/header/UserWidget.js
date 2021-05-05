import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import * as actions from '../../actions';
import UserSignedIn from './UserSignedIn';
import UserNotSignedIn from './UserNotSignedIn';

const UserWidget = (props) => {
  const { authUser, user } = props;

  let history = useHistory();

  useEffect(() => {
    authUser((error) => {
      if (history.location.pathname === "/") {
        return null;
      } else {
        history.push('/error', error.data.message);
      }
    });
  }, [authUser, history]);

  const renderAuth = () => {
    if (!user.id){
      return (
        <UserNotSignedIn />
      )
    } else {
      return (
        <UserSignedIn username={user.username} />
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

export default connect(mapStateToProps, actions)(UserWidget);