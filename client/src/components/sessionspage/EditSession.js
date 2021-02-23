import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import DeleteSession from './DeleteSession';
import requireAuth from '../utils/requireAuth';
import SessionInputForm from '../utils/SessionInputForm';
import getInfo from '../utils/getInfoHook';
import * as actions from '../../actions';


const EditSession = (props) => {
  const { getSession, editSession, history, handleSubmit, resetState, user } = props;
  let { session_id } = useParams();
  const [errorArea, setErrorArea] = useState([]);
  useEffect(() => {
    getInfo(getSession(session_id, user.id), history);
  return () => {
    resetState();
  }
  }, [session_id, user.id]);

  const submitForm = (formProps) => {
    console.log(formProps);
    let isError = false
    console.log(errorArea);
    errorArea.forEach(item => {
      if (item === "invalidTimeFormat") {
        let containedError = document.querySelector(`.session__time_length--container`);
        let errorContainer = document.querySelector(`.error__${item}`);
        console.log(containedError);
        console.log(errorContainer);
        containedError.removeChild(errorContainer);
      } else {
        let containedError = document.querySelector(`.session__${item}--container`);
        let errorContainer = document.querySelector(`.error__${item}`);
        containedError.removeChild(errorContainer);
      }
    });
    setErrorArea([]);
    let inputErrors = [];
    for(const value in formProps) {
      if (!formProps[value]) {
        isError = true;
        console.log(errorArea);
        inputErrors.push(value);
        let inputContainer = document.querySelector(`.session__${value}--container`);
        let errorMsg = document.createElement('p');
        errorMsg.innerHTML = 'Invalid input';
        errorMsg.classList.add('input__error');
        errorMsg.classList.add(`error__${value}`);
        inputContainer.insertAdjacentElement('beforeend', errorMsg);
      }
      if (value === "time_length") {
        const regex = /\d{2}:\d{2}/;
        if (!regex.test(formProps[value])){
          isError = true;
          inputErrors.push("invalidTimeFormat");
          let inputContainer = document.querySelector(`.session__${value}--container`);
          let errorMsg = document.createElement('p');
          errorMsg.innerHTML = 'Format must be hh:mm';
          errorMsg.classList.add('input__error');
          errorMsg.classList.add('error__invalidTimeFormat');
          inputContainer.insertAdjacentElement('beforeend', errorMsg);
        }
      }
    }
    if(isError) {
      setErrorArea(inputErrors);
      return;
    }
    editSession(formProps, session_id, user.id, () => {
      history.push('/sessions');
    });
  };

  return (
    <div>
      <SessionInputForm submitForm={submitForm} handleSubmit={handleSubmit} />
      <DeleteSession history={history} user={user} />
    </div>
  )
}

function mapStateToProps(state){
  return { initialValues: state.editFormValues.editFormValues, user: state.auth };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'editSession'})
)(requireAuth(EditSession));