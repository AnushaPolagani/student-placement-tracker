import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [name, setName] = useState("");
const [cgpa, setCgpa] = useState("");
const [skills, setSkills] = useState("");
const [status, setStatus] = useState("Not Placed");
const [students, setStudents] = useState(() => {
const savedStudents = localStorage.getItem("students");
  return savedStudents ? JSON.parse(savedStudents) : [];
});  
const [search, setSearch] = useState("");
const [editIndex, setEditIndex] = useState(null);
const [error, setError] = useState("");
const addStudent = () => {
  if (name.trim() === "") {
  setError("Please enter student name.");
  return;
}
if (cgpa === "") {
  setError("Please enter CGPA.");
  return;
}
if (Number(cgpa) < 0 || Number(cgpa) > 10) {
  setError("CGPA must be between 0 and 10.");
  return;
}
if (skills.trim() === "") {
  setError("Please enter skills.");
  return;
}
  const newStudent = {
    name,
    cgpa,
    skills,
    status,
  };

  if (editIndex === null) {
  // Add new student
  setStudents([...students, newStudent]);
} else {
  // Update existing student
  const updatedStudents = [...students];
  updatedStudents[editIndex] = newStudent;
  setStudents(updatedStudents);
  setEditIndex(null);
}

  setName("");
  setCgpa("");
  setSkills("");
  setStatus("Not Placed");
  setError("");
};
const deleteStudent = (indexToDelete) => {
  const updatedStudents = students.filter(
    (_, index) => index !== indexToDelete
  );

  setStudents(updatedStudents);
};
const editStudent = (index) => {
  const student = students[index];

  setName(student.name);
  setCgpa(student.cgpa);
  setSkills(student.skills);
  setStatus(student.status);

  setEditIndex(index);
};

useEffect(() => {
  localStorage.setItem("students", JSON.stringify(students));
}, [students]);
const exportData = () => {
  const data = JSON.stringify(students, null, 2);

  const blob = new Blob([data], {
    type: "application/json",
  });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "students.json";

  link.click();

  window.URL.revokeObjectURL(url);
};
const filteredStudents = students
  .filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => a.name.localeCompare(b.name));
const totalStudents = students.length;

const placedStudents = students.filter(
  (student) => student.status === "Placed"
).length;

const notPlacedStudents = students.filter(
  (student) => student.status === "Not Placed"
).length;

  return (
    <div
      style={{
        width: "500px",
        margin: "40px auto",
        padding: "25px",
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        🎓 Student Placement Tracker
      </h1>
      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    margin: "20px 0",
    gap: "10px",
  }}
>
  <div
    style={{
      flex: 1,
      backgroundColor: "#e3f2fd",
      padding: "15px",
      borderRadius: "8px",
      textAlign: "center",
    }}
  >
    <h3>Total Students</h3>
    <h2>{totalStudents}</h2>
  </div>

  <div
    style={{
      flex: 1,
      backgroundColor: "#d4edda",
      padding: "15px",
      borderRadius: "8px",
      textAlign: "center",
    }}
  >
    <h3>Placed</h3>
    <h2>{placedStudents}</h2>
  </div>

  <div
    style={{
      flex: 1,
      backgroundColor: "#f8d7da",
      padding: "15px",
      borderRadius: "8px",
      textAlign: "center",
    }}
  >
    <h3>Not Placed</h3>
    <h2>{notPlacedStudents}</h2>
  </div>
</div>

      <h2>Student Registration Form</h2>

      <label>Name:</label>
      <br />
<input
  type="text"
  placeholder="Enter student name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid gray",
    boxSizing: "border-box",
  }}
/>
      <br />
      <br />

      <label>CGPA:</label>
      <br />
<input
  type="number"
  placeholder="Enter CGPA"
  value={cgpa}
  onChange={(e) => setCgpa(e.target.value)}
   style={{
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid gray",
    boxSizing: "border-box",
  }}
/>
      <br />
      <br />

      <label>Skills:</label>
      <br />
      <input
  type="text"
  placeholder="React, Python..."
  value={skills}
  onChange={(e) => setSkills(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid gray",
    boxSizing: "border-box",
  }}

/>
      <br />
      <br />

      <label>Placement Status:</label>
      <br />
      <select
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid gray",
  }}
>
        <option>Not Placed</option>
        <option>Placed</option>
      </select>

      <br />
      <br />

     <button
  onClick={addStudent}
  style={{
    width: "100%",
    backgroundColor: "green",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  }}
> 
   {editIndex === null ? "Add Student" : "Update Student"}
</button>
<button
  onClick={exportData}
  style={{
    width: "100%",
    backgroundColor: "#6f42c1",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "10px",
  }}
>
  📤 Export Student Data
</button>
{error && (
  <p
    style={{
      color: "red",
      fontWeight: "bold",
      marginTop: "10px",
    }}
  >
    {error}
  </p>
)}
      <hr />

<h3>🔍 Search Student</h3>

<input
  type="text"
  placeholder="Search by student name"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
   style={{
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid gray",
    boxSizing: "border-box",
  }}
/>

<br />
<br />
<h2>Student List</h2>

{filteredStudents.length === 0 ? (
  <p
    style={{
      color: "gray",
      fontStyle: "italic",
      textAlign: "center",
    }}
  >
    No students found.
  </p>
) : (
  filteredStudents.map((student, index) => (
  <div
    key={index}
    style={{
      border: "1px solid #ddd",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "20px",
      backgroundColor: "#ffffff",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
     }}
  >

     <h3
       style={{
         color: "#555",
         marginBottom: "10px",
         }}
>
  Student #{index + 1}
</h3>

<p><b>Name:</b> {student.name}</p>
    <p>
  <b>CGPA:</b>{" "}
  <span
    style={{
      color: Number(student.cgpa) >= 8 ? "green" : "orange",
      fontWeight: "bold",
    }}
  >
    {student.cgpa}
  </span>
</p>

    <p><b>Skills:</b> {student.skills}</p>

     <p>
  <b>Status:</b>{" "}
  <span
    style={{
      color: student.status === "Placed" ? "green" : "red",
      fontWeight: "bold",
    }}
  >
    {student.status}
  </span>
</p>
<p>
  <b>Eligibility:</b>{" "}
  <span
    style={{
      color: Number(student.cgpa) >= 8 ? "green" : "red",
      fontWeight: "bold",
    }}
  >
    {Number(student.cgpa) >= 8
      ? "⭐ Eligible"
      : "❌ Not Eligible"}
  </span>
</p>

    {/* Edit Button */}
<button
  onClick={() => editStudent(index)}
  style={{
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  padding: "10px 18px",
  marginRight: "10px",
  cursor: "pointer",
  borderRadius: "6px",
  fontWeight: "bold",
}}
>
  Edit
</button>

{/* Delete Button */}
<button
  onClick={() => deleteStudent(index)}
  style={{
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  padding: "10px 18px",
  cursor: "pointer",
  borderRadius: "6px",
  fontWeight: "bold",
}}
>
  Delete
</button>
  </div>
))
)}

    </div>
  );
}

export default App;