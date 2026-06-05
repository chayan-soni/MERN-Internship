function App() {
  const apiUrl = process.env.REACT_APP_API_URL;

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        fontFamily: "Arial"
      }}
    >
      <h1>MERN Internship - Day 5</h1>

      <h2>Production Front-End Optimization</h2>

      <p>
        API URL from Environment Variable:
      </p>

      <strong>{apiUrl}</strong>
    </div>
  );
}

export default App;