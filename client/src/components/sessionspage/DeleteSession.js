import axios from 'axios';
import { useParams } from 'react-router-dom';


const DeleteSession = (props) => {
  let { session_id } = useParams();
  const handleDelete = async (e) => {
    e.preventDefault();
    const user = localStorage.getItem('token');
    try {
      const response = await axios.delete(`http://localhost:5000/api/sessions/delete?session_id=${session_id}&u_id=${props.user.id}`, {
        headers: { 'Authorization': `Bearer ${user}`}
      });
      console.log(response);
      if (response.status === 204){
        props.history.push('/sessions');
      }
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div>
      <button onClick={(e) => handleDelete(e)}>Delete</button>
    </div>
  )
}

export default DeleteSession;