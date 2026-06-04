import { useState } from "react";

function StudentForm() {
  const [name, setName] = useState("");

  return (
    <div>
      <h2>Add Student</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <p>You typed: {name}</p>
    </div>
  );
}

export default StudentForm;