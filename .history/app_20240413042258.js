const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const mongoose = require("mongoose");
const queryString = require("querystring");

mongoose
  .connect("mongodb://localhost:27017/company")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  exp: Number
},{collection:"employee"});
const employee = mongoose.model("employee", studentSchema);

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
  "<div style='background-color: #f0f0f0; padding: 10px 0; text-align: center;'><a href='/'>Home</a> |<a href='/create'>Create</a> |<a href='/read'>Read</a> |<a href='/update'>Update</a> | <a href='/delete'>Delete</a></div>";

const navbardata =
  "<div style='background-color: #f0f0f0; padding: 10px 0; text-align: center;'><a href='/'>Home</a> |<a href='/create'>Create</a> |<a href='/read'>Read</a> |<a href='/update'>Update</a> | <a href='/delete'>Delete</a></div>";
const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url, true);

  switch (pathname) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        `<html><body>${navbar()}<p>Welcome to the Home Page</p></body></html>`
      );
      break;
    case "/create":
      if (req.method === "GET") {
        serveFormPage(res, "create");
      } else if (req.method === "POST") {
        collectRequestData(req, (data) => {
          
          employee.create({
            name: data.name,
            age: data.age,
            exp: data.exp
          })
            .then(() => {
              
              res.writeHead(302, { Location: "/read" });
              res.end();
            })
            .catch((err) => {
              console.error("Error creating employee:", err);
              res.writeHead(500);
              res.end("Error creating employee");
            });
        });
      }

      break;
    case "/read":
      if (req.method === "GET") {
        employee.find()
          .then(function (employee) {
            res.writeHead(200, { "Content-Type": "text/html" });
            let content = `${navbar()}<div style='text-align: center;'>`;
            content +=
              "<style>th,td{padding: 5px; text-align: center;}</style>";
            
            content += "<h2>Read Employees</h2>";

            content +=
              "<table style='border: 1px solid blue; cellspacing: 1px; width: 80%;'>";
            content +=
              "<tr><th style='text-align: left'>Name</th><th>Age</th><th>Experience</th></tr>";

            employee.forEach((emp) => {
              content += "<tr>";
              content += `<td style='text-align:left'>${emp.name}</td>`;
              content += `<td>${emp.age}</td>`;
              content += `<td>${emp.exp}</td>`;
              content += "</tr>";
            });

            content += "</table></div>";
            res.end(content); 
          })
          .catch((err) => {
            
            if (!res.headersSent) {
              res.writeHead(500);
              res.end("Server Error");
            }
          });
      }
      break;
    case "/update":
      if (req.method === "GET") {
        serveFormPage(res, "update");
      } else if (req.method === "POST") {
        collectRequestData(req, (data) => {
          employee.findOne({ name: data.name })
            .then((emp) => {
              if (!emp) {                
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(
                  `<html><body>
                ${navbar()}
                <script>
                  alert('No such employee exists with the given name.');
                  window.location.href = '/';
                </script>
              </body></html>`
                );
                return Promise.reject("No employee found");
              } else {
                emp.exp = data.exp;
                return emp.save();
              }
            })
            .then(() => {
              res.writeHead(302, { Location: "/read" });
              res.end();
            })
            .catch((err) => {
              if (err !== "No employee found") {
                console.error("Error updating employee:", err);
              }
            });
        });
      }
      break;

    case "/delete":
      if (req.method === "GET") {
        serveFormPage(res, "delete");
      } else if (req.method === "POST") {
        collectRequestData(req, (data) => {
          employee.findOneAndDelete({ name: data.name })
            .then((deletedEmp) => {
              if (!deletedEmp) {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(
                  `<html><body>
                ${navbar()}
                <script>alert('No such employee exists with the given name.');
                window.location.href = '/';</script>
              </body></html>`
                );
              } else {
                res.writeHead(302, { Location: "/read" });
                res.end();
              }
            })
            .catch((err) => {
              console.error("Error deleting employee:", err);
              res.writeHead(500);
              res.end("Error deleting employee");
            });
        });
      }
      break;
    default:
      res.writeHead(404);
      res.end("<html><body><p>Not Found</p></body></html>");
  }
});

function serveFormPage(res, pageName) {
  const filePath = path.join(__dirname, `${pageName}.html`);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(`Error reading ${filePath}:`, err);
      res.writeHead(500);
      res.end("Server Error: Unable to read form page.");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<html><body>${navbar()}${data}</body></html>`);
  });
}

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