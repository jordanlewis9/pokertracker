const getInfo = (actionCreator, history) => {
  async function fetchData() {
    try {
      await actionCreator();
    } catch (err){
      if(err.response){
        if(err.response.status === 403){
          history.push('/error', err.response.data.message);
        } else if (err.response.status === 500){
          history.push('/error', "An error has occured with your request. Please try again.")
        }
      }
    }
  }
  fetchData();
}

export default getInfo;