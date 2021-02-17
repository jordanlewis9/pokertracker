const Home = (props) => {
  console.log(props.history.location)
  console.log(props.location);
  return (
    <div>
      This is the home page
    </div>
  )
}

export default Home;