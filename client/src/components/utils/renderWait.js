import NeedAccount from'./NeedAccount';

const renderWait = (id) => {
  if (id === null) {
    return (
      <NeedAccount />
    )
  } else {
    return (
      <p>Loading...</p>
    )
  }
};

export default renderWait;