import axios from "axios";

const DeleteModal = (props) => {

  const handleDelete = async (e) => {
    e.preventDefault();
    const user = localStorage.getItem('token');
    try {
      const response = await axios.delete(`https://poker-session-tracker.herokuapp.com/api/sessions/session?session_id=${props.session_id}&u_id=${props.user.id}`, {
        headers: { 'Authorization': `Bearer ${user}`}
      });
      if (response.status === 204){
        props.history.replace('/sessions');
      }
    } catch(err) {
      props.history.push('/error', err.response.data.message);
    }
  }

  const removeModal = (e) => {
    if (!e.target.closest('.delete__modal--text-container')) {
      props.setDeleteModal(false);
    }
  }

  return (
    <div className="delete__modal--container" onClick={(e) => removeModal(e)}>
      <div className="delete__modal--text-container">
        <p>Are you sure you want to delete this session?</p>
        <div className="delete__modal--button-container">
          <button onClick={handleDelete} className="delete__modal--delete-button">Delete</button>
          <button onClick={() => props.setDeleteModal(false)} className="delete__modal--cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal;