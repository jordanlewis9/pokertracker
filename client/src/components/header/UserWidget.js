import { connect } from 'react-redux';
import { useEffect } from 'react';
import * as actions from '../../actions';
import UserSignedIn from './UserSignedIn';
import UserNotSignedIn from './UserNotSignedIn';
import './userWidgetStyle.css';

const UserWidget = (props) => {
  const { authUser, user } = props;
  useEffect(() => {
    authUser();
  }, [authUser]);

  console.log(props);

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