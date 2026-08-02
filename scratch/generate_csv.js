import fs from 'fs';
import path from 'path';

const facultyList = [
  // 1ST LINE: ADVISORS
  { sNo: 1, category: "Advisor (1st Line)", name: "Dr. M Kishore Babu", designation: "Dean", department: "Management, Humanities & Sciences (MHS)" },
  { sNo: 2, category: "Advisor (1st Line)", name: "Dr. A. Srinath", designation: "Dean", department: "Skill Development" },
  { sNo: 3, category: "Advisor (1st Line)", name: "Dr. K.R.S. Prasad", designation: "Dean", department: "Student Affairs" },
  { sNo: 4, category: "Advisor (1st Line)", name: "Dr. P.V. Chalapathi", designation: "Dean", department: "Industry Relations & Placements" },
  { sNo: 5, category: "Advisor (1st Line)", name: "Dr. N.B.V. Prasad", designation: "Dean", department: "Placements & Progression" },
  { sNo: 6, category: "Advisor (1st Line)", name: "Dr. T.K. Rama Krishna Rao", designation: "Principal", department: "College of Engineering" },
  { sNo: 7, category: "Advisor (1st Line)", name: "Mr. P. Sai Vijay", designation: "Director", department: "Student Activity Center" },

  // 2ND LINE: CO-ADVISORS
  { sNo: 8, category: "Co-Advisor (2nd Line)", name: "Mr. V. Maruthi Vijay", designation: "Director (IR)", department: "International Relations" },
  { sNo: 9, category: "Co-Advisor (2nd Line)", name: "Dr. K. Aravind", designation: "Deputy Director (IR)", department: "International Relations" },
  { sNo: 10, category: "Co-Advisor (2nd Line)", name: "Dr. Vinay Atgur", designation: "Assistant Dean", department: "Industrial Practice School" },
  { sNo: 11, category: "Co-Advisor (2nd Line)", name: "Mr. Jamindar Buddiga", designation: "Head of Department", department: "Department of Foreign Languages" },

  // 3RD LINE: CONVENOR
  { sNo: 12, category: "Convenor (3rd Line)", name: "Mr. ANAND RAJ", designation: "Incharge", department: "Japanese Placement Training" },

  // 4TH LINE: FACULTY MENTORS
  { sNo: 13, category: "Faculty Mentor (4th Line)", name: "Mr. Ravi Ranjan", designation: "Japanese Faculty", department: "Department of Foreign Languages" },
  { sNo: 14, category: "Faculty Mentor (4th Line)", name: "Mrs. Jyotika Sharma", designation: "Japanese Faculty", department: "Department of Foreign Languages" },
  { sNo: 15, category: "Faculty Mentor (4th Line)", name: "Mr. K Aswin Chandran", designation: "Japanese Faculty", department: "Department of Foreign Languages" },
  { sNo: 16, category: "Faculty Mentor (4th Line)", name: "Mr. MD Salman", designation: "Japanese Faculty", department: "Department of Foreign Languages" },
  { sNo: 17, category: "Faculty Mentor (4th Line)", name: "Mr. IRFAN MOHAMMED", designation: "Japanese Faculty", department: "Department of Foreign Languages" },
  { sNo: 18, category: "Faculty Mentor (4th Line)", name: "Mr. Vasim Akram", designation: "Japanese Faculty", department: "Department of Foreign Languages" },
  { sNo: 19, category: "Faculty Mentor (4th Line)", name: "Mrs. Neha Pathak", designation: "Korean Faculty", department: "Department of Foreign Languages" },
  { sNo: 20, category: "Faculty Mentor (4th Line)", name: "Dr. S K ANAND", designation: "Assistant Professor", department: "Korean Studies" },
  { sNo: 21, category: "Faculty Mentor (4th Line)", name: "Mr. Md Farhan Ahmad", designation: "German Faculty", department: "Department of Foreign Languages" }
];

const headers = ["S.No.", "Category / Line", "Faculty Name", "Designation", "Department / Center"];
const csvRows = [
  headers.join(","),
  ...facultyList.map(item => [
    item.sNo,
    `"${item.category}"`,
    `"${item.name}"`,
    `"${item.designation}"`,
    `"${item.department}"`
  ].join(","))
];

const publicCsvPath = path.join(process.cwd(), "public", "Special_Thanks_Faculty_List.csv");
fs.writeFileSync(publicCsvPath, csvRows.join("\n"), "utf-8");
console.log("CSV generated successfully at:", publicCsvPath);
