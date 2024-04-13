const http = require("http");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const queryString = require("querystring");

mongoose
  .connect("mongodb://localhost:27017/students")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const studentSchema = new mongoose.Schema({
  fullName: String,
  dateOfBirth: Date,
  gender: String,
  nationality: String,
  contact: {
    phoneNumber: String,
    emailAddress: String
  },
  address: String,
  // Add more fields as needed for student information
});
const Student = mongoose.model("Student", studentSchema);

function serveFormPage(res, pageName) {
  fs.readFile(path.join(__dirname, `forms/${pageName}.html`), (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Server Error");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
}

const navbar = () =>
  "<div style='background-color: #f0f0f0; padding: 10px 0; text-align: center;'><a href='/'>Home</a> |<a href='/dashboard'>Dashboard</a></div>";

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url, true);

  switch (pathname) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        `<html><body>${navbar()}<p>Welcome to the Home Page</p></body></html>`
      );
      break;
    case "/dashboard":
      res.writeHead(200, { "Content-Type": "text/html" });
      // Serve student dashboard HTML page
      serveFormPage(res, "dashboard");
      break;
    case "/student-details":
      if (req.method === "POST") {
        collectRequestData(req, (data) => {
          // Process student details form submission
          // Save data to MongoDB or perform other operations
          // Redirect to dashboard or display a success message
        });
      }
      break;
    default:
      res.writeHead(404);
      res.end("<html><body><p>Not Found</p></body></html>");
  }
});

function collectRequestData(request, callback) {
  let data = "";
  request.on("data", (chunk) => (data += chunk));
  request.on("end", () => {
    callback(queryString.parse(data));
  });
}

server.listen(9200, () => {
  console.log("Server running on http://localhost:9200");
});
