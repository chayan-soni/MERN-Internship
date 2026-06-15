import "./App.css";

import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

function App() {
  return (
    <div>
      <h1>Student Management System</h1>

      <StudentForm />

      <hr />

      <StudentList />
    </div>
  );
}

export default App;