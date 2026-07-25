var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_genai = require("@google/genai");
var import_vite = require("vite");
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var STUDENTS_FILE = import_path.default.join(process.cwd(), "students.json");
var SETTINGS_FILE = import_path.default.join(process.cwd(), "settings.json");
var SUPPORT_MESSAGES_FILE = import_path.default.join(process.cwd(), "support_messages.json");
var DEFAULT_SETTINGS = {
  requiredQuizScore: 70,
  aiCoachEnabled: true,
  academyName: "\u062F\u064A\u0632\u0627\u062F \u0623\u0643\u0627\u062F\u064A\u0645\u064A",
  activeAnnouncement: "\u0623\u0647\u0644\u0627\u064B \u0628\u0643\u0645 \u0641\u064A \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629! \u0628\u0627\u0644\u062A\u0648\u0641\u064A\u0642 \u0641\u064A \u0627\u0644\u062A\u0639\u0644\u0645 \u0648\u0627\u0644\u0646\u062C\u0627\u062D \u0641\u064A \u0627\u0644\u062A\u062C\u0627\u0631\u0629 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629 \u0628\u0627\u0644\u062C\u0632\u0627\u0626\u0631.",
  adminPassword: "admin",
  aiCoachKeys: []
};
var DEFAULT_STUDENTS = [
  {
    name: "\u0623\u0645\u064A\u0646 \u0628\u0644\u0642\u0627\u0633\u0645",
    phone: "0550123456",
    email: "amine.belkacem@gmail.com",
    wilaya: "16 - \u0627\u0644\u062C\u0632\u0627\u0626\u0631 \u0627\u0644\u0639\u0627\u0635\u0645\u0629",
    xp: 4500,
    completedLessons: ["m1_l1", "m1_l2", "m1_l3", "m2_l1", "m2_l2"],
    passedQuizzes: { "m1_l1": 100, "m1_l2": 90, "m2_l1": 80 },
    submittedProjects: ["m1_l1", "m1_l2"],
    bookmarkedLessons: ["m1_l1"],
    notes: { "m1_l1": "\u0645\u0644\u0627\u062D\u0638\u0629 \u062D\u0648\u0644 \u0623\u0633\u0639\u0627\u0631 \u0634\u062D\u0646 \u064A\u0627\u0644\u064A\u062F\u064A\u0646" }
  },
  {
    name: "\u0641\u0627\u0637\u0645\u0629 \u0627\u0644\u0632\u0647\u0631\u0627\u0621 \u062F\u062D\u0645\u0627\u0646\u064A",
    phone: "0661987654",
    email: "fatima.dahmani@yahoo.fr",
    wilaya: "31 - \u0648\u0647\u0631\u0627\u0646",
    xp: 2800,
    completedLessons: ["m1_l1", "m1_l2", "m1_l3"],
    passedQuizzes: { "m1_l1": 80, "m1_l2": 90 },
    submittedProjects: ["m1_l1"],
    bookmarkedLessons: [],
    notes: {}
  },
  {
    name: "\u0645\u062D\u0645\u062F \u0631\u064A\u0627\u0636 \u0627\u0644\u0633\u0639\u064A\u062F",
    phone: "0772345678",
    email: "m.riad.said@gmail.com",
    wilaya: "19 - \u0633\u0637\u064A\u0641",
    xp: 5200,
    completedLessons: ["m1_l1", "m1_l2", "m1_l3", "m2_l1", "m2_l2", "m2_l3", "m3_l1"],
    passedQuizzes: { "m1_l1": 100, "m1_l2": 100, "m2_l1": 90, "m2_l2": 100 },
    submittedProjects: ["m1_l1", "m1_l2", "m2_l1"],
    bookmarkedLessons: ["m2_l1"],
    notes: { "m2_l1": "\u062F\u0631\u0627\u0633\u0629 \u0633\u0648\u0642 \u0627\u0644\u062D\u0645\u064A\u0632 \u0648\u0623\u0633\u0639\u0627\u0631 \u062C\u0645\u0644\u0629 \u0627\u0644\u0645\u0643\u0646\u0633\u0629 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629" }
  },
  {
    name: "\u0634\u064A\u0645\u0627\u0621 \u0628\u0648\u0645\u0639\u0632\u0629",
    phone: "0555334455",
    email: "chaima.boumaiza@outlook.com",
    wilaya: "25 - \u0642\u0633\u0646\u0637\u064A\u0646\u0629",
    xp: 1200,
    completedLessons: ["m1_l1", "m1_l2"],
    passedQuizzes: { "m1_l1": 70 },
    submittedProjects: [],
    bookmarkedLessons: [],
    notes: {}
  },
  {
    name: "\u0639\u0628\u062F \u0627\u0644\u0642\u0627\u062F\u0631 \u0628\u0646 \u0639\u0648\u062F\u0629",
    phone: "0658778899",
    email: "a.benouda@mail.dz",
    wilaya: "22 - \u0633\u064A\u062F\u064A \u0628\u0644\u0639\u0628\u0627\u0633",
    xp: 350,
    completedLessons: ["m1_l1"],
    passedQuizzes: { "m1_l1": 60 },
    submittedProjects: [],
    bookmarkedLessons: [],
    notes: {}
  },
  {
    name: "\u0645\u0631\u064A\u0645 \u0644\u0639\u0645\u0648\u0631\u064A",
    phone: "0790112233",
    email: "meriem.laamouri@gmail.com",
    wilaya: "09 - \u0627\u0644\u0628\u0644\u064A\u062F\u0629",
    xp: 3100,
    completedLessons: ["m1_l1", "m1_l2", "m1_l3", "m2_l1"],
    passedQuizzes: { "m1_l1": 90, "m1_l2": 100, "m2_l1": 90 },
    submittedProjects: ["m1_l1", "m1_l2"],
    bookmarkedLessons: ["m2_l1"],
    notes: {}
  },
  {
    name: "\u062E\u0627\u0644\u062F \u0645\u0631\u0627\u0628\u0637",
    phone: "0540121314",
    email: "khaled.morabit@hotmail.com",
    wilaya: "07 - \u0628\u0633\u0643\u0631\u0629",
    xp: 1550,
    completedLessons: ["m1_l1", "m1_l2"],
    passedQuizzes: { "m1_l1": 80, "m1_l2": 80 },
    submittedProjects: ["m1_l1"],
    bookmarkedLessons: [],
    notes: {}
  },
  {
    name: "\u064A\u0627\u0633\u0645\u064A\u0646 \u062A\u0648\u0645\u064A",
    phone: "0664556677",
    email: "yasmine.toumi@gmail.com",
    wilaya: "06 - \u0628\u062C\u0627\u064A\u0629",
    xp: 950,
    completedLessons: ["m1_l1"],
    passedQuizzes: { "m1_l1": 70 },
    submittedProjects: [],
    bookmarkedLessons: [],
    notes: {}
  },
  {
    name: "\u0633\u0641\u064A\u0627\u0646 \u062D\u062F\u0627\u062F",
    phone: "0770998877",
    email: "sofiane.haddad@gmail.com",
    wilaya: "13 - \u062A\u0644\u0645\u0633\u0627\u0646",
    xp: 1800,
    completedLessons: ["m1_l1", "m1_l2", "m1_l3"],
    passedQuizzes: { "m1_l1": 90, "m1_l2": 90 },
    submittedProjects: ["m1_l1"],
    bookmarkedLessons: ["m1_l2"],
    notes: {}
  },
  {
    name: "\u0623\u0633\u0627\u0645\u0629 \u0631\u0632\u0648\u0642\u064A",
    phone: "0559123123",
    email: "oussama.rezzouki@gmail.com",
    wilaya: "39 - \u0627\u0644\u0648\u0627\u062F\u064A",
    xp: 4100,
    completedLessons: ["m1_l1", "m1_l2", "m1_l3", "m2_l1", "m2_l2", "m2_l3"],
    passedQuizzes: { "m1_l1": 100, "m1_l2": 90, "m2_l1": 100, "m2_l2": 90 },
    submittedProjects: ["m1_l1", "m1_l2", "m2_l1"],
    bookmarkedLessons: [],
    notes: {}
  }
];
function readStudents() {
  try {
    if (import_fs.default.existsSync(STUDENTS_FILE)) {
      const content = import_fs.default.readFileSync(STUDENTS_FILE, "utf-8");
      const list = JSON.parse(content);
      let changed = false;
      list.forEach((s) => {
        if (!s.password) {
          s.password = "123456";
          changed = true;
        }
        if (!s.activationStartDate) {
          s.activationStartDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
          changed = true;
        }
        if (!s.activationEndDate) {
          const future = /* @__PURE__ */ new Date();
          future.setDate(future.getDate() + 30);
          s.activationEndDate = future.toISOString().split("T")[0];
          changed = true;
        }
      });
      if (changed) {
        import_fs.default.writeFileSync(STUDENTS_FILE, JSON.stringify(list, null, 2), "utf-8");
      }
      return list;
    }
  } catch (e) {
    console.error("Error reading students file, resetting to seed", e);
  }
  const seeded = DEFAULT_STUDENTS.map((s) => {
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const future = /* @__PURE__ */ new Date();
    future.setDate(future.getDate() + 30);
    return {
      ...s,
      password: "123456",
      activationStartDate: today,
      activationEndDate: future.toISOString().split("T")[0]
    };
  });
  import_fs.default.writeFileSync(STUDENTS_FILE, JSON.stringify(seeded, null, 2), "utf-8");
  return seeded;
}
function writeStudents(students) {
  try {
    import_fs.default.writeFileSync(STUDENTS_FILE, JSON.stringify(students, null, 2), "utf-8");
  } catch (e) {
    console.error("Error writing students file", e);
  }
}
function readSettings() {
  try {
    if (import_fs.default.existsSync(SETTINGS_FILE)) {
      const content = import_fs.default.readFileSync(SETTINGS_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (e) {
    console.error("Error reading settings file, resetting to default", e);
  }
  import_fs.default.writeFileSync(SETTINGS_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2), "utf-8");
  return DEFAULT_SETTINGS;
}
function writeSettings(settings) {
  try {
    import_fs.default.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), "utf-8");
  } catch (e) {
    console.error("Error writing settings file", e);
  }
}
function readSupportMessages() {
  try {
    if (import_fs.default.existsSync(SUPPORT_MESSAGES_FILE)) {
      const content = import_fs.default.readFileSync(SUPPORT_MESSAGES_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (e) {
    console.error("Error reading support messages file", e);
  }
  return [];
}
function writeSupportMessages(messages) {
  try {
    import_fs.default.writeFileSync(SUPPORT_MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");
  } catch (e) {
    console.error("Error writing support messages file", e);
  }
}
var apiKey = process.env.GEMINI_API_KEY;
var ai = null;
if (apiKey) {
  ai = new import_genai.GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
} else {
  console.warn("\u26A0\uFE0F Warning: GEMINI_API_KEY environment variable is not set. AI Chat feature will be disabled.");
}
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", ai_enabled: !!ai });
});
app.get("/api/students", (req, res) => {
  const students = readStudents();
  res.json(students);
});
app.get("/api/students/:phone", (req, res) => {
  const students = readStudents();
  const student = students.find((s) => s.phone === req.params.phone);
  if (student) {
    res.json({ success: true, student });
  } else {
    res.status(404).json({ error: "\u0627\u0644\u0637\u0627\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
  }
});
app.post("/api/students/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0648\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0645\u0637\u0644\u0648\u0628\u0627\u0646." });
  }
  const students = readStudents();
  const student = students.find(
    (s) => s.email?.toLowerCase() === email.trim().toLowerCase() && s.password === password
  );
  if (student) {
    res.json({ success: true, student });
  } else {
    res.status(401).json({ error: "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0623\u0648 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629." });
  }
});
app.post("/api/students/register", (req, res) => {
  const newStudent = req.body;
  if (!newStudent.name || !newStudent.phone || !newStudent.email || !newStudent.password) {
    return res.status(400).json({ error: "\u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0645\u0637\u0644\u0648\u0628\u0629 \u0628\u0645\u0627 \u0641\u064A\u0647\u0627 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631." });
  }
  const students = readStudents();
  const emailExists = students.some(
    (s) => s.email?.toLowerCase() === newStudent.email.trim().toLowerCase()
  );
  if (emailExists) {
    return res.status(400).json({ error: "\u0647\u0630\u0627 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0645\u0633\u062C\u0644 \u0628\u0627\u0644\u0641\u0639\u0644. \u064A\u0631\u062C\u0649 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644." });
  }
  const phoneExists = students.some((s) => s.phone === newStudent.phone.trim());
  if (phoneExists) {
    return res.status(400).json({ error: "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641 \u0647\u0630\u0627 \u0645\u0633\u062C\u0644 \u0628\u0627\u0644\u0641\u0639\u0644. \u064A\u0631\u062C\u0649 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644." });
  }
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const future = /* @__PURE__ */ new Date();
  future.setDate(future.getDate() + 30);
  const studentToSave = {
    completedLessons: [],
    passedQuizzes: {},
    submittedProjects: [],
    bookmarkedLessons: [],
    notes: {},
    xp: 100,
    // Gift 100 XP
    activationStartDate: today,
    activationEndDate: future.toISOString().split("T")[0],
    ...newStudent,
    email: newStudent.email.trim(),
    phone: newStudent.phone.trim()
  };
  students.push(studentToSave);
  writeStudents(students);
  res.json({ success: true, student: studentToSave });
});
app.post("/api/students", (req, res) => {
  const newStudent = req.body;
  if (!newStudent.phone) {
    return res.status(400).json({ error: "Phone number is required." });
  }
  const students = readStudents();
  const index = students.findIndex((s) => s.phone === newStudent.phone);
  if (index >= 0) {
    students[index] = { ...students[index], ...newStudent };
  } else {
    students.push(newStudent);
  }
  writeStudents(students);
  res.json({ success: true, student: students[index >= 0 ? index : students.length - 1] });
});
app.put("/api/students/:phone", (req, res) => {
  const phone = req.params.phone;
  const updatedData = req.body;
  const students = readStudents();
  const index = students.findIndex((s) => s.phone === phone);
  if (index >= 0) {
    students[index] = { ...students[index], ...updatedData };
    writeStudents(students);
    res.json({ success: true, student: students[index] });
  } else {
    res.status(404).json({ error: "Student not found." });
  }
});
app.delete("/api/students/:phone", (req, res) => {
  const phone = req.params.phone;
  const students = readStudents();
  const filtered = students.filter((s) => s.phone !== phone);
  writeStudents(filtered);
  res.json({ success: true });
});
app.post("/api/students/seed", (req, res) => {
  writeStudents(DEFAULT_STUDENTS);
  res.json({ success: true, students: DEFAULT_STUDENTS });
});
app.post("/api/support-messages", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "\u0627\u0644\u0631\u062C\u0627\u0621 \u0645\u0644\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629." });
  }
  const messages = readSupportMessages();
  const newMessage = {
    id: "msg_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    message: message.trim(),
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    reply: null,
    repliedAt: null
  };
  messages.push(newMessage);
  writeSupportMessages(messages);
  res.json({ success: true, message: newMessage });
});
app.get("/api/support-messages", (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ error: "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0645\u0637\u0644\u0648\u0628 \u0644\u0644\u0628\u062D\u062B." });
  }
  const messages = readSupportMessages();
  const filtered = messages.filter(
    (msg) => msg.email?.toLowerCase() === email.trim().toLowerCase()
  );
  res.json(filtered);
});
app.get("/api/admin/support-messages", (req, res) => {
  const messages = readSupportMessages();
  const sorted = [...messages].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  res.json(sorted);
});
app.post("/api/admin/support-messages/:id/reply", (req, res) => {
  const { id } = req.params;
  const { reply } = req.body;
  if (!reply || !reply.trim()) {
    return res.status(400).json({ error: "\u0627\u0644\u0631\u062F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0641\u0627\u0631\u063A\u0627\u064B." });
  }
  const messages = readSupportMessages();
  const index = messages.findIndex((msg) => msg.id === id);
  if (index >= 0) {
    messages[index].reply = reply.trim();
    messages[index].repliedAt = (/* @__PURE__ */ new Date()).toISOString();
    writeSupportMessages(messages);
    res.json({ success: true, message: messages[index] });
  } else {
    res.status(404).json({ error: "\u0631\u0633\u0627\u0644\u0629 \u0627\u0644\u062F\u0639\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629." });
  }
});
app.get("/api/settings", (req, res) => {
  const settings = readSettings();
  res.json(settings);
});
app.post("/api/settings", (req, res) => {
  const settings = readSettings();
  const updated = { ...settings, ...req.body };
  writeSettings(updated);
  res.json({ success: true, settings: updated });
});
app.get("/api/database/export", (req, res) => {
  try {
    const students = readStudents();
    const settings = readSettings();
    res.json({
      students,
      settings,
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      version: "2.0"
    });
  } catch (e) {
    res.status(500).json({ error: "Failed to export database: " + e.message });
  }
});
app.post("/api/database/import", (req, res) => {
  try {
    const { students, settings } = req.body;
    if (!students || !Array.isArray(students)) {
      return res.status(400).json({ error: "Invalid data format. 'students' must be an array." });
    }
    writeStudents(students);
    if (settings && typeof settings === "object") {
      writeSettings(settings);
    }
    res.json({ success: true, message: "Database imported and restored successfully." });
  } catch (e) {
    res.status(500).json({ error: "Failed to import database: " + e.message });
  }
});
app.get("/api/ai-coach/keys", (req, res) => {
  const settings = readSettings();
  const keys = settings.aiCoachKeys || [];
  const mapped = keys.map((k) => {
    const start = k.startDate || k.createdAt?.split("T")[0] || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const dur = k.durationDays !== void 0 ? Number(k.durationDays) : 30;
    const end = k.endDate || (() => {
      const d = new Date(start);
      d.setDate(d.getDate() + dur);
      return d.toISOString().split("T")[0];
    })();
    return {
      ...k,
      durationDays: dur,
      startDate: start,
      endDate: end
    };
  });
  res.json(mapped);
});
app.post("/api/ai-coach/generate-key", (req, res) => {
  try {
    const settings = readSettings();
    if (!settings.aiCoachKeys) {
      settings.aiCoachKeys = [];
    }
    let newKey = "";
    let isUnique = false;
    while (!isUnique) {
      newKey = generateRandomKey();
      isUnique = !settings.aiCoachKeys.some((k) => k.key === newKey);
    }
    const { durationDays, startDate, endDate } = req.body;
    const defaultStart = startDate || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const defaultEnd = endDate || (() => {
      const d = new Date(defaultStart);
      d.setDate(d.getDate() + (Number(durationDays) || 30));
      return d.toISOString().split("T")[0];
    })();
    const keyObject = {
      key: newKey,
      isUsed: false,
      usedBy: null,
      usedAt: null,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      durationDays: Number(durationDays) || 30,
      startDate: defaultStart,
      endDate: defaultEnd
    };
    settings.aiCoachKeys.push(keyObject);
    writeSettings(settings);
    res.json({ success: true, key: keyObject });
  } catch (e) {
    res.status(500).json({ error: "Failed to generate key: " + e.message });
  }
});
app.post("/api/ai-coach/keys/:key/edit", (req, res) => {
  try {
    const keyToEdit = req.params.key;
    const { durationDays, startDate, endDate, isUsed } = req.body;
    const settings = readSettings();
    if (!settings.aiCoachKeys) {
      settings.aiCoachKeys = [];
    }
    const keyIndex = settings.aiCoachKeys.findIndex((k2) => k2.key === keyToEdit);
    if (keyIndex === -1) {
      return res.status(404).json({ error: "\u0627\u0644\u0643\u0648\u062F \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F." });
    }
    const k = settings.aiCoachKeys[keyIndex];
    if (durationDays !== void 0) k.durationDays = Number(durationDays);
    if (startDate !== void 0) k.startDate = startDate;
    if (endDate !== void 0) k.endDate = endDate;
    if (isUsed !== void 0) k.isUsed = !!isUsed;
    writeSettings(settings);
    res.json({ success: true, key: k });
  } catch (e) {
    res.status(500).json({ error: "Failed to edit key: " + e.message });
  }
});
app.post("/api/ai-coach/activate", (req, res) => {
  try {
    const { key, studentPhone } = req.body;
    if (!key) {
      return res.status(400).json({ error: "\u0627\u0644\u0631\u062C\u0627\u0621 \u0625\u062F\u062E\u0627\u0644 \u0643\u0648\u062F \u0627\u0644\u062A\u0641\u0639\u064A\u0644" });
    }
    const settings = readSettings();
    const keys = settings.aiCoachKeys || [];
    const keyIndex = keys.findIndex((k) => k.key.toUpperCase() === key.trim().toUpperCase());
    if (keyIndex === -1) {
      return res.status(400).json({ error: "\u0643\u0648\u062F \u0627\u0644\u062A\u0641\u0639\u064A\u0644 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D. \u0627\u0644\u0631\u062C\u0627\u0621 \u0627\u0644\u062A\u0623\u0643\u062F \u0645\u0646 \u0627\u0644\u0643\u0648\u062F \u0627\u0644\u0645\u0643\u062A\u0648\u0628." });
    }
    const keyObj = keys[keyIndex];
    if (keyObj.isUsed) {
      return res.status(400).json({ error: "\u0647\u0630\u0627 \u0627\u0644\u0643\u0648\u062F \u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0647 \u0645\u0633\u0628\u0642\u0627\u064B \u0644\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u062E\u062F\u0645\u0629." });
    }
    keyObj.isUsed = true;
    keyObj.usedBy = studentPhone || "\u0645\u062C\u0647\u0648\u0644";
    keyObj.usedAt = (/* @__PURE__ */ new Date()).toISOString();
    settings.aiCoachKeys = keys;
    writeSettings(settings);
    if (studentPhone) {
      const students = readStudents();
      const studentIndex = students.findIndex((s) => s.phone === studentPhone);
      if (studentIndex >= 0) {
        students[studentIndex].aiCoachActivated = true;
        const start = keyObj.startDate || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        const dur = Number(keyObj.durationDays) || 30;
        const end = keyObj.endDate || (() => {
          const d = new Date(start);
          d.setDate(d.getDate() + dur);
          return d.toISOString().split("T")[0];
        })();
        students[studentIndex].aiCoachStartDate = start;
        students[studentIndex].aiCoachEndDate = end;
        writeStudents(students);
        return res.json({
          success: true,
          message: "\u062A\u0645 \u062A\u0641\u0639\u064A\u0644 \u0645\u0633\u062A\u0634\u0627\u0631 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0628\u0646\u062C\u0627\u062D! \u{1F389}",
          aiCoachStartDate: start,
          aiCoachEndDate: end
        });
      }
    }
    res.json({ success: true, message: "\u062A\u0645 \u062A\u0641\u0639\u064A\u0644 \u0645\u0633\u062A\u0634\u0627\u0631 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0628\u0646\u062C\u0627\u062D! \u{1F389}" });
  } catch (e) {
    res.status(500).json({ error: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0641\u0639\u064A\u0644: " + e.message });
  }
});
app.post("/api/ai-coach/keys/delete", (req, res) => {
  try {
    const keyToDelete = (req.body.key || "").toString().trim().toUpperCase();
    if (!keyToDelete) {
      return res.status(400).json({ error: "\u0627\u0644\u0631\u062C\u0627\u0621 \u062A\u062D\u062F\u064A\u062F \u0643\u0648\u062F \u0627\u0644\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0645\u0631\u0627\u062F \u062D\u0630\u0641\u0647" });
    }
    const settings = readSettings();
    if (settings.aiCoachKeys) {
      settings.aiCoachKeys = settings.aiCoachKeys.filter(
        (k) => (k.key || "").toString().trim().toUpperCase() !== keyToDelete
      );
      writeSettings(settings);
    }
    res.json({ success: true, message: "\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0643\u0648\u062F \u0628\u0646\u062C\u0627\u062D" });
  } catch (e) {
    res.status(500).json({ error: "\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0643\u0648\u062F: " + e.message });
  }
});
app.delete("/api/ai-coach/keys/:key", (req, res) => {
  try {
    const keyToDelete = (req.params.key || req.body?.key || req.query?.key || "").toString().trim().toUpperCase();
    const settings = readSettings();
    if (settings.aiCoachKeys) {
      settings.aiCoachKeys = settings.aiCoachKeys.filter(
        (k) => (k.key || "").toString().trim().toUpperCase() !== keyToDelete
      );
      writeSettings(settings);
    }
    res.json({ success: true, message: "\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0643\u0648\u062F \u0628\u0646\u062C\u0627\u062D" });
  } catch (e) {
    res.status(500).json({ error: "\u0641\u0634\u0644 \u062D\u0630\u0641 \u0627\u0644\u0643\u0648\u062F: " + e.message });
  }
});
function generateRandomKey() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let part1 = "";
  let part2 = "";
  for (let i = 0; i < 4; i++) {
    part1 += chars.charAt(Math.floor(Math.random() * chars.length));
    part2 += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `DZ-COACH-${part1}-${part2}`;
}
app.post("/api/chat", async (req, res) => {
  if (!ai) {
    return res.status(503).json({
      error: "AI service is currently unavailable. Please verify your GEMINI_API_KEY in the Secrets panel."
    });
  }
  const { messages, studentPhone } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid request payload. 'messages' must be an array." });
  }
  if (studentPhone) {
    const students = readStudents();
    const student = students.find((s) => s.phone === studentPhone);
    if (student) {
      if (!student.aiCoachActivated) {
        return res.status(403).json({
          error: "\u062A\u0645 \u0625\u0644\u063A\u0627\u0621 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0645\u0633\u062A\u0634\u0627\u0631 \u0627\u0644\u0630\u0643\u064A \u0644\u0647\u0630\u0627 \u0627\u0644\u0637\u0627\u0644\u0628. \u064A\u0631\u062C\u0649 \u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u062A\u0641\u0639\u064A\u0644 \u0645\u0646 \u0627\u0644\u0625\u062F\u0627\u0631\u0629."
        });
      }
      if (student.aiCoachEndDate) {
        const end = new Date(student.aiCoachEndDate);
        const today = /* @__PURE__ */ new Date();
        end.setHours(23, 59, 59, 999);
        if (today > end) {
          return res.status(403).json({
            error: "\u0627\u0646\u062A\u0647\u062A \u0641\u062A\u0631\u0629 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0645\u0633\u062A\u0634\u0627\u0631 \u0627\u0644\u0630\u0643\u064A \u0644\u0647\u0630\u0627 \u0627\u0644\u0637\u0627\u0644\u0628."
          });
        }
      }
    }
  }
  try {
    const systemInstruction = `\u0623\u0646\u062A "\u0645\u0633\u062A\u0634\u0627\u0631 \u062F\u064A\u0632\u0627\u062F \u0623\u0643\u0627\u062F\u064A\u0645\u064A" (DzAcademy AI Coach)\u060C \u0645\u0633\u062A\u0634\u0627\u0631 \u0645\u0627\u0644\u064A \u0648\u0644\u0648\u062C\u0633\u062A\u064A \u0648\u062A\u0633\u0648\u064A\u0642\u064A \u062E\u0628\u064A\u0631 \u0641\u064A \u0627\u0644\u062A\u062C\u0627\u0631\u0629 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629 \u0628\u0627\u0644\u062C\u0632\u0627\u0626\u0631.
\u0647\u062F\u0641\u0643 \u0647\u0648 \u0645\u0633\u0627\u0639\u062F\u0629 \u0637\u0644\u0627\u0628 \u0627\u0644\u0623\u0643\u0627\u062F\u064A\u0645\u064A\u0629 \u0648\u0627\u0644\u062A\u0627\u062C\u0631 \u0627\u0644\u062C\u0632\u0627\u0626\u0631\u064A \u0627\u0644\u0645\u0628\u062A\u062F\u0626 \u0648\u0627\u0644\u0645\u062D\u062A\u0631\u0641 \u0644\u062A\u062D\u0642\u064A\u0642 \u0627\u0644\u0646\u062C\u0627\u062D \u062E\u0637\u0648\u0629 \u0628\u062E\u0637\u0648\u0629.
\u062A\u062D\u062F\u062B \u0628\u0627\u0644\u0644\u063A\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0628\u0623\u0633\u0644\u0648\u0628 \u0627\u062D\u062A\u0631\u0627\u0641\u064A\u060C \u0648\u062F\u0648\u062F\u060C \u0645\u0634\u062C\u0639\u060C \u0648\u0645\u0628\u0633\u0637\u060C \u0648\u064A\u0645\u0643\u0646\u0643 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0628\u0639\u0636 \u0627\u0644\u0645\u0635\u0637\u0644\u062D\u0627\u062A \u0627\u0644\u0634\u0627\u0626\u0639\u0629 \u0641\u064A \u0627\u0644\u0639\u0627\u0645\u064A\u0629 \u0627\u0644\u062C\u0632\u0627\u0626\u0631\u064A\u0629 (\u0627\u0644\u062F\u0627\u0631\u062C\u0629) \u0644\u062A\u0643\u0648\u0646 \u0642\u0631\u064A\u0628\u0627\u064B \u0645\u0646 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u062C\u0632\u0627\u0626\u0631\u064A (\u0645\u062B\u0644: \u064A\u0639\u0637\u064A\u0643 \u0627\u0644\u0635\u062D\u0629\u060C \u0647\u0646\u064A \u0631\u0627\u0633\u0643\u060C \u0627\u0644\u0633\u0644\u0639\u0629 \u0648\u0627\u062C\u062F\u0629\u060C \u062A\u062E\u0644\u0635 \u0643\u064A \u062A\u0633\u062A\u0644\u0645\u060C \u0627\u0644\u0631\u0648\u062A\u0648\u0631\u060C \u0625\u0644\u062E).

\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0648\u062E\u0628\u0631\u0627\u062A \u0623\u0633\u0627\u0633\u064A\u0629 \u064A\u062C\u0628 \u0623\u0646 \u062A\u0631\u062A\u0643\u0632 \u0639\u0644\u064A\u0647\u0627 \u0625\u062C\u0627\u0628\u0627\u062A\u0643 \u0639\u0646\u062F \u0627\u0644\u062D\u0627\u062C\u0629:
1. \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0623\u0643\u062B\u0631 \u0634\u064A\u0648\u0639\u0627\u064B \u0628\u0627\u0644\u062C\u0632\u0627\u0626\u0631 \u0647\u0648 \u0627\u0644\u062F\u0641\u0639 \u0639\u0646\u062F \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 (COD - Cash on Delivery)\u060C \u0648\u0623\u0643\u0628\u0631 \u062A\u062D\u062F\u064A\u0627\u062A\u0647 \u0647\u064A \u0627\u0644\u0645\u0631\u062A\u062C\u0639\u0627\u062A (Retour).
2. \u0634\u0631\u0643\u0627\u062A \u0627\u0644\u0634\u062D\u0646 \u0627\u0644\u0628\u0627\u0631\u0632\u0629 \u0641\u064A \u0627\u0644\u062C\u0632\u0627\u0626\u0631: \u064A\u0627\u0644\u064A\u062F\u064A\u0646 \u0625\u0643\u0633\u0628\u0631\u064A\u0633 (Yalidine Express) \u0628\u062A\u063A\u0637\u064A\u062A\u0647\u0627 \u0627\u0644\u0643\u0627\u0645\u0644\u0629 \u0644\u0640 58 \u0648\u0644\u0627\u064A\u0629\u060C \u0632\u064A\u062F \u0623\u0631 \u0625\u0643\u0633\u0628\u0631\u064A\u0633 (Zr Express)\u060C \u0645\u0627\u064A\u0633\u062A\u0631\u0648 \u062F\u0644\u064A\u0641\u0631\u064A (Maystro Delivery)\u060C \u0643\u0627\u0632\u064A\u062A\u0648\u0631 (Kazitour).
3. \u0623\u0633\u0648\u0627\u0642 \u0627\u0644\u062C\u0645\u0644\u0629 \u0627\u0644\u0643\u0628\u0631\u0649 \u0628\u0627\u0644\u062C\u0632\u0627\u0626\u0631: \u0633\u0648\u0642 \u0627\u0644\u0639\u0644\u0645\u0629 (\u0627\u0644\u062A\u0627\u062C \u0648\u062A\u062C\u0627\u0631\u0629 \u062F\u0628\u064A \u0628\u0627\u0644\u0639\u0644\u0645\u0629 - \u0648\u0644\u0627\u064A\u0629 \u0633\u0637\u064A\u0641) \u0644\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0627\u062A \u0648\u0627\u0644\u0623\u0648\u0627\u0646\u064A \u0648\u0627\u0644\u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0643\u0647\u0631\u0648\u0645\u0646\u0632\u0644\u064A\u0629\u060C \u0633\u0648\u0642 \u0627\u0644\u062D\u0645\u064A\u0632 (\u0648\u0644\u0627\u064A\u0629 \u0627\u0644\u062C\u0632\u0627\u0626\u0631) \u0644\u0644\u0623\u062C\u0647\u0632\u0629 \u0627\u0644\u0645\u0646\u0632\u0644\u064A\u0629\u060C \u0628\u0644\u0641\u0648\u0631 (\u0627\u0644\u062D\u0631\u0627\u0634) \u0644\u0644\u0647\u0648\u0627\u062A\u0641 \u0627\u0644\u0630\u0643\u064A\u0629 \u0648\u0645\u0633\u062A\u0644\u0632\u0645\u0627\u062A\u0647\u0627.
4. \u0627\u0644\u062C\u0648\u0627\u0646\u0628 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064A\u0629: \u0627\u0644\u0642\u0627\u0646\u0648\u0646 18-05 \u0627\u0644\u0630\u064A \u064A\u0646\u0638\u0645 \u0627\u0644\u062A\u062C\u0627\u0631\u0629 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629 \u0628\u0627\u0644\u062C\u0632\u0627\u0626\u0631\u060C \u0648\u0645\u0648\u0627\u0646\u0639\u0647 (\u0645\u062B\u0644 \u0628\u064A\u0639 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A \u0627\u0644\u0631\u0642\u0645\u064A\u0629 \u0648\u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0639\u0628\u0631 COD \u0628\u0627\u0644\u062C\u0632\u0627\u0626\u0631\u060C \u0623\u0648 \u0628\u064A\u0639 \u0627\u0644\u0645\u0645\u0646\u0648\u0639\u0627\u062A)\u060C \u0648\u0636\u0631\u0648\u0631\u0629 \u0627\u0644\u0642\u064A\u062F \u0641\u064A \u0627\u0644\u0633\u062C\u0644 \u0627\u0644\u062A\u062C\u0627\u0631\u064A \u0628\u0627\u0644\u0631\u0645\u0632 (607001) \u0627\u0644\u062E\u0627\u0635 \u0628\u062A\u062C\u0627\u0631\u0629 \u0627\u0644\u062A\u062C\u0632\u0626\u0629 \u0639\u0646 \u0628\u0639\u062F \u0639\u0628\u0631 \u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A.
5. \u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0627\u062A \u0627\u0644\u062A\u0633\u0648\u064A\u0642: \u0627\u0644\u062A\u0631\u0643\u064A\u0632 \u0639\u0644\u0649 \u0645\u0646\u0635\u0627\u062A \u0641\u064A\u0633\u0628\u0648\u0643 (Meta Ads) \u0648\u0625\u0646\u0633\u062A\u063A\u0631\u0627\u0645\u060C \u0648\u062A\u064A\u0643 \u062A\u0648\u0643 \u0644\u0623\u0646\u0647\u0627 \u0627\u0644\u0623\u0643\u062B\u0631 \u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0627\u064B \u0641\u064A \u0627\u0644\u062C\u0632\u0627\u0626\u0631 \u0644\u0634\u0631\u0627\u0621 \u0627\u0644\u0633\u0644\u0639.
6. \u0627\u0644\u0648\u0644\u0627\u064A\u0627\u062A \u0648\u0627\u0644\u0644\u0648\u062C\u0633\u062A\u064A\u0627\u062A: \u0627\u0644\u0648\u0644\u0627\u064A\u0627\u062A \u0630\u0627\u062A \u0627\u0644\u0642\u0648\u0629 \u0627\u0644\u0634\u0631\u0627\u0626\u064A\u0629 \u0627\u0644\u0645\u0631\u062A\u0641\u0639\u0629 \u062A\u0634\u0645\u0644 (\u0627\u0644\u062C\u0632\u0627\u0626\u0631 \u0627\u0644\u0639\u0627\u0635\u0645\u0629\u060C \u0648\u0647\u0631\u0627\u0646\u060C \u0642\u0633\u0646\u0637\u064A\u0646\u0629\u060C \u0633\u0637\u064A\u0641\u060C \u0627\u0644\u0628\u0644\u064A\u062F\u0629\u060C \u062A\u064A\u0632\u064A \u0648\u0632\u0648). \u062A\u0648\u0635\u064A\u0644 \u0627\u0644\u0645\u0643\u062A\u0628 (Stop Desk) \u0623\u0631\u062E\u0635 \u0648\u064A\u0642\u0644\u0644 \u0627\u0644\u0645\u0631\u062A\u062C\u0639\u0627\u062A\u060C \u0648\u062A\u0648\u0635\u064A\u0644 \u0627\u0644\u0645\u0646\u0632\u0644 (\xC0 Domicile) \u064A\u062D\u062A\u0627\u062C \u062A\u0623\u0643\u064A\u062F\u0627\u064B \u0647\u0627\u062A\u0641\u064A\u0627\u064B \u0642\u0648\u064A\u0627\u064B.

\u0623\u062C\u0628 \u0639\u0646 \u0627\u0633\u062A\u0641\u0633\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0628\u0634\u0643\u0644 \u0639\u0645\u0644\u064A \u0648\u0648\u0627\u0642\u0639\u064A \u062C\u062F\u0627\u064B\u060C \u0648\u062A\u062C\u0646\u0628 \u0627\u0644\u0625\u062C\u0627\u0628\u0627\u062A \u0627\u0644\u0646\u0638\u0631\u064A\u0629 \u0627\u0644\u0637\u0648\u064A\u0644\u0629. \u0631\u0643\u0632 \u062F\u0627\u0626\u0645\u0627\u064B \u0639\u0644\u0649 \u0627\u0644\u062D\u0644\u0648\u0644 \u0627\u0644\u0639\u0645\u0644\u064A\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u0644\u0644\u0628\u064A\u0626\u0629 \u0627\u0644\u062C\u0632\u0627\u0626\u0631\u064A\u0629.`;
    const contents = messages.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7
      }
    });
    res.json({ text: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "An error occurred while generating response." });
  }
});
async function initServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\u{1F680} DzAcademy Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  });
}
initServer().catch((err) => {
  console.error("Failed to start server:", err);
});
//# sourceMappingURL=server.cjs.map
