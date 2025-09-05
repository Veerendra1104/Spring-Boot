const apiUrl = "http://localhost:8080/api/students";

const studentForm = document.getElementById("studentForm");
const studentTableBody = document.querySelector("#studentTable tbody");

let updateId = null; // track the student being updated

// Fetch all students
async function fetchStudents() {
    try {
        const response = await fetch(apiUrl);
        const students = await response.json();
        studentTableBody.innerHTML = "";
        students.forEach(student => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.email}</td>
                <td>
                    <button onclick="editStudent(${student.id})" class="update-btn">Update</button>
                    <button onclick="deleteStudent(${student.id})" class="delete-btn">Delete</button>
                </td>
            `;
            studentTableBody.appendChild(tr);
        });
    } catch (err) {
        console.error("Error fetching students:", err);
    }
}

// Add or Update student
studentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const studentData = {
        name: document.getElementById("name").value,
        age: parseInt(document.getElementById("age").value),
        email: document.getElementById("email").value
    };

    try {
        let response;
        if (updateId) {
            // Update student
            response = await fetch(`${apiUrl}/${updateId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(studentData)
            });
            updateId = null; // reset after update
        } else {
            // Add new student
            response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(studentData)
            });
        }

        if (response.ok) {
            studentForm.reset();
            fetchStudents();
        } else {
            console.error("Error submitting form:", response.statusText);
        }
    } catch (err) {
        console.error("Error:", err);
    }
});

// Delete student
async function deleteStudent(id) {
    if (!confirm("Are you sure you want to delete this student?")) return;
    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        if (response.ok) fetchStudents();
    } catch (err) {
        console.error("Error deleting student:", err);
    }
}

// Edit student (prefill form)
async function editStudent(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`);
        if (!response.ok) throw new Error("Student not found");
        const student = await response.json();

        document.getElementById("name").value = student.name;
        document.getElementById("age").value = student.age;
        document.getElementById("email").value = student.email;
        updateId = student.id; // set update ID
    } catch (err) {
        console.error("Error fetching student:", err);
    }
}

// Initial load
fetchStudents();
