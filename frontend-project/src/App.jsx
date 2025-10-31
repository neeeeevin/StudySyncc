import React, { useState, useContext, createContext, useMemo } from 'react';

// --- SVG Icons ---
// Using inline SVGs as we can't import libraries in this single-file setup.
const IconUser = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const IconLock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const IconMail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const IconLogOut = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const IconShield = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const IconBookOpen = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const IconEdit = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const IconTrash = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const IconPlus = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const IconEye = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const IconEyeOff = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

const IconUpload = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
);

const IconClipboard = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
  </svg>
);

// --- Initial Mock Data ---
const MOCK_CLASSES = {
  "c1": { id: "c1", name: "Grade 10-A" },
  "c2": { id: "c2", name: "Grade 10-B" },
};

const MOCK_SUBJECTS = {
  "s1": { id: "s1", name: "History" },
  "s2": { id: "s2", name: "Math" },
  "s3": { id: "s3", name: "Physics" },
};

const MOCK_USERS = {
  "1": { id: "1", email: "admin@studysync.com", password: "adminPassword1!", role: "admin", name: "Admin User", classId: null },
  "2": { id: "2", email: "user@studysync.com", password: "userPassword1!", role: "user", name: "Normal User (Student)", classId: "c1" },
  "3": { id: "3", email: "teacher@studysync.com", password: "teacherPassword1!", role: "teacher", name: "Teacher User", classIds: ["c1", "c2"] }, // Teachers can have multiple classes
  "4": { id: "4", email: "student2@studysync.com", password: "userPassword1!", role: "user", name: "Jane Smith (Student)", classId: "c2" },
};

const MOCK_TASKS = [
  { id: "t1", userId: "2", title: "Read Chapter 4", subject: "History", date: "2025-11-01", completed: true },
  { id: "t2", userId: "2", title: "Complete Math Problems", subject: "Math", date: "2025-11-03", completed: false },
  { id: "t3", userId: "1", title: "Review App Features", subject: "Admin", date: "2025-11-02", completed: false },
  { id: "t4", userId: "4", title: "Physics Lab Report", subject: "Physics", date: "2025-11-05", completed: false },
];

const MOCK_STUDY_MATERIALS = [
  { id: "m1", teacherId: "3", classId: "c1", subjectId: "s1", title: "WWII Study Guide", fileUrl: "doc_wwii_guide.pdf" },
  { id: "m2", teacherId: "3", classId: "c2", subjectId: "s2", title: "Calculus Worksheet", fileUrl: "worksheet_calc_01.pdf" },
];

const MOCK_MARKS = [
  { id: "mark1", teacherId: "3", studentId: "2", subjectId: "s1", assessment: "Mid-Term Exam", marks: 88, total: 100 },
  { id: "mark2", teacherId: "3", studentId: "4", subjectId: "s2", assessment: "Mid-Term Exam", marks: 92, total: 100 },
  { id: "mark3", teacherId: "3", studentId: "2", subjectId: "s2", assessment: "Pop Quiz 1", marks: 18, total: 20 },
];

// --- Auth & API Context ---
// This context simulates a full backend API and user auth system.
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState("login");
  const [users, setUsers] = useState(MOCK_USERS);
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [classes, setClasses] = useState(MOCK_CLASSES);
  const [subjects, setSubjects] = useState(MOCK_SUBJECTS);
  const [materials, setMaterials] = useState(MOCK_STUDY_MATERIALS);
  const [marks, setMarks] = useState(MOCK_MARKS);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const simulateApiCall = (callback, duration = 300) => {
    setIsLoading(true);
    setError(null);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const result = callback();
          setIsLoading(false);
          resolve(result);
        } catch (err) {
          setIsLoading(false);
          setError(err.message);
          reject(err);
        }
      }, duration);
    });
  };

  const authApi = useMemo(
    () => ({
      currentUser,
      currentView,
      isLoading,
      error,
      users: Object.values(users),
      tasks,
      classes: Object.values(classes),
      subjects: Object.values(subjects),
      materials,
      marks,

      // --- Navigation ---
      navigateTo: (view) => {
        setError(null);
        setCurrentView(view);
      },

      // --- Auth Functions ---
      login: (email, password) =>
        simulateApiCall(() => {
          const user = Object.values(users).find(
            (u) => u.email === email && u.password === password
          );
          if (user) {
            setCurrentUser(user);
            if (user.role === 'admin') setCurrentView('adminDashboard');
            else if (user.role === 'teacher') setCurrentView('teacherDashboard');
            else setCurrentView('userDashboard');
            return user;
          } else {
            throw new Error("Invalid email or password.");
          }
        }),

      signup: (name, email, password) =>
        simulateApiCall(() => {
          if (Object.values(users).some((u) => u.email === email)) {
            throw new Error("An account with this email already exists.");
          }
          const newId = `u_${Date.now()}`;
          const newUser = { id: newId, email, password, role: "user", name, classId: null }; // New users start with no class
          setUsers((prev) => ({ ...prev, [newId]: newUser }));
          setCurrentUser(newUser);
          setCurrentView("userDashboard");
          return newUser;
        }),

      logout: () => {
        setCurrentUser(null);
        setCurrentView("login");
      },

      changePassword: (userId, oldPassword, newPassword) =>
        simulateApiCall(() => {
          const user = users[userId];
          if (!user || user.password !== oldPassword) {
            throw new Error("Invalid old password.");
          }
          const updatedUser = { ...user, password: newPassword };
          setUsers((prev) => ({ ...prev, [userId]: updatedUser }));
          setCurrentUser(updatedUser);
          return true;
        }),

      // --- User Management (Admin) ---
      addUser: (data) => // Data is an object from the form
        simulateApiCall(() => {
          if (Object.values(users).some((u) => u.email === data.email)) {
            throw new Error("Email already in use.");
          }
          const newId = `u_${Date.now()}`;
          const newUser = { 
            id: newId, 
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
            classId: data.role === 'user' ? data.classId : null,
            classIds: data.role === 'teacher' ? data.classIds : []
          };
          setUsers((prev) => ({ ...prev, [newId]: newUser }));
          return newUser;
        }),

      updateUser: (userId, data) =>
        simulateApiCall(() => {
          if (!users[userId]) throw new Error("User not found.");
          if (data.email && data.email !== users[userId].email && Object.values(users).some(u => u.email === data.email)) {
            throw new Error("Email already in use by another account.");
          }
          
          const updatedUser = { ...users[userId], ...data };
          // Clear password if it wasn't being updated
          if (!data.password) {
            updatedUser.password = users[userId].password;
          }

          setUsers((prev) => ({ ...prev, [userId]: updatedUser }));
          if (currentUser && currentUser.id === userId) {
            setCurrentUser(updatedUser);
          }
          return updatedUser;
        }),

      deleteUser: (userId) =>
        simulateApiCall(() => {
          if (!users[userId]) throw new Error("User not found.");
          if (userId === "1") throw new Error("Cannot delete root admin.");
          if (currentUser.id === userId) throw new Error("Cannot delete yourself.");
          
          setUsers((prev) => {
            const newUsers = { ...prev };
            delete newUsers[userId];
            return newUsers;
          });
          setTasks((prev) => prev.filter(task => task.userId !== userId));
          setMarks((prev) => prev.filter(mark => mark.studentId !== userId));
          return true;
        }),
      
      // --- School Management (Admin) ---
      addSubject: (name) => simulateApiCall(() => {
        if (Object.values(subjects).some(s => s.name === name)) throw new Error("Subject already exists.");
        const newId = `s_${Date.now()}`;
        const newSubject = { id: newId, name };
        setSubjects(prev => ({ ...prev, [newId]: newSubject }));
        return newSubject;
      }),
      deleteSubject: (id) => simulateApiCall(() => {
        setSubjects(prev => {
          const newSubjects = { ...prev };
          delete newSubjects[id];
          return newSubjects;
        });
        return true;
      }),
      addClass: (name) => simulateApiCall(() => {
        if (Object.values(classes).some(c => c.name === name)) throw new Error("Class already exists.");
        const newId = `c_${Date.now()}`;
        const newClass = { id: newId, name };
        setClasses(prev => ({ ...prev, [newId]: newClass }));
        return newClass;
      }),
      deleteClass: (id) => simulateApiCall(() => {
        setClasses(prev => {
          const newClasses = { ...prev };
          delete newClasses[id];
          return newClasses;
        });
        // Also un-assign users from this class
        setUsers(prev => {
          const newUsers = { ...prev };
          Object.keys(newUsers).forEach(uid => {
            if (newUsers[uid].classId === id) newUsers[uid].classId = null;
            if (newUsers[uid].classIds) newUsers[uid].classIds = newUsers[uid].classIds.filter(cid => cid !== id);
          });
          return newUsers;
        });
        return true;
      }),

      // --- Task Management (Admin) ---
      getAllTasks: () => tasks,
      updateTask: (taskId, data) => simulateApiCall(() => {
          setTasks((prev) => prev.map((task) => task.id === taskId ? { ...task, ...data } : task));
          return true;
        }),
      deleteTask: (taskId) => simulateApiCall(() => {
          setTasks((prev) => prev.filter((task) => task.id !== taskId));
          return true;
        }),
        
      // --- Teacher Functions ---
      addMaterial: (data) => simulateApiCall(() => {
        const newMaterial = { ...data, id: `m_${Date.now()}`, teacherId: currentUser.id };
        setMaterials(prev => [newMaterial, ...prev]);
        return newMaterial;
      }),
      deleteMaterial: (id) => simulateApiCall(() => {
        setMaterials(prev => prev.filter(m => m.id !== id));
        return true;
      }),
      addMark: (data) => simulateApiCall(() => {
         const newMark = { ...data, id: `mark_${Date.now()}`, teacherId: currentUser.id };
         setMarks(prev => [newMark, ...prev]);
         return newMark;
      }),
      deleteMark: (id) => simulateApiCall(() => {
        setMarks(prev => prev.filter(m => m.id !== id));
        return true;
      }),
      getStudentsByClassIds: (classIds) => {
        return Object.values(users).filter(u => u.role === 'user' && classIds.includes(u.classId));
      },

      // --- User/Student Functions ---
      getUserTasks: (userId) => tasks.filter((task) => task.userId === userId),
      getStudentMarks: (studentId) => marks.filter(m => m.studentId === studentId),
      getStudentMaterials: (classId) => materials.filter(m => m.classId === classId),
      
      // --- Helpers ---
      getSubjectName: (id) => subjects[id]?.name || "N/A",
      getClassName: (id) => classes[id]?.name || "N/A",
      getUserName: (id) => users[id]?.name || "N/A",

    }),
    [currentUser, currentView, isLoading, error, users, tasks, classes, subjects, materials, marks]
  );

  return <AuthContext.Provider value={authApi}>{children}</AuthContext.Provider>;
}

const useAuth = () => useContext(AuthContext);

// --- Reusable Components ---

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
      <div className="w-12 h-12 border-4 border-white rounded-full border-t-blue-500 animate-spin"></div>
    </div>
  );
}

function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <div className="p-3 my-2 text-sm text-red-700 bg-red-100 border border-red-300 rounded-md">
      {message}
    </div>
  );
}

function SuccessMessage({ message }) {
  if (!message) return null;
  return (
    <div className="p-3 my-2 text-sm text-green-700 bg-green-100 border border-green-300 rounded-md">
      {message}
    </div>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-3 border-b">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 rounded-full hover:bg-gray-200 hover:text-gray-600 w-7 h-7"
          >
            &times;
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

function PasswordInput({ value, onChange, id, name, placeholder = "Password", required = true }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required={required}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
      >
        {show ? <IconEyeOff /> : <IconEye />}
      </button>
    </div>
  );
}

// --- Page Components ---

function LoginPage() {
  const { login, navigateTo, isLoading, error } = useAuth();
  const [email, setEmail] = useState("admin@studysync.com"); // Pre-filled for demo
  const [password, setPassword] = useState("adminPassword1!"); // Pre-filled for demo

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      // Error is handled in context, but catch stops form crash
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <div className="flex flex-col items-center">
          <div className="p-3 mb-2 bg-blue-600 rounded-full text-white">
            <IconBookOpen />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Welcome to StudySync
          </h2>
          <p className="text-gray-600">Login to access your dashboard</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && <ErrorMessage message={error} />}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="relative mt-1">
               <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                 <IconMail width={20} height={20} />
               </span>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative mt-1">
               <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                 <IconLock width={20} height={20} />
               </span>
               <PasswordInput 
                 id="password" 
                 name="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 placeholder="Your password"
               />
            </div>
          </div>
          
          <p className="text-xs text-gray-500">
             Admin: <code className="bg-gray-200 p-1 rounded">admin@studysync.com</code> / <code className="bg-gray-200 p-1 rounded">adminPassword1!</code>
          </p>
           <p className="text-xs text-gray-500">
             Teacher: <code className="bg-gray-200 p-1 rounded">teacher@studysync.com</code> / <code className="bg-gray-200 p-1 rounded">teacherPassword1!</code>
          </p>
           <p className="text-xs text-gray-500">
             Student: <code className="bg-gray-200 p-1 rounded">user@studysync.com</code> / <code className="bg-gray-200 p-1 rounded">userPassword1!</code>
          </p>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => navigateTo("signup")}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

function SignUpPage() {
  const { signup, navigateTo, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push("at least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("an uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("a lowercase letter");
    if (!/[0-9]/.test(password)) errors.push("a number");
    if (!/[!@#$%^&*]/.test(password)) errors.push("a special character");
    return errors;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Email format is invalid.";

    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      newErrors.password = `Password must contain ${passwordErrors.join(", ")}.`;
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    
    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({}); // Clear old errors
    if (validateForm()) {
      try {
        await signup(formData.name, formData.email, formData.password);
      } catch (err) {
        // Error is handled in context
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Create your StudySync account
        </h2>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && <ErrorMessage message={error} />}
          
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
            {validationErrors.name && <p className="mt-1 text-xs text-red-600">{validationErrors.name}</p>}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
            {validationErrors.email && <p className="mt-1 text-xs text-red-600">{validationErrors.email}</p>}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <PasswordInput
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {validationErrors.password && <p className="mt-1 text-xs text-red-600">{validationErrors.password}</p>}
          </div>
          
           <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
            />
            {validationErrors.confirmPassword && <p className="mt-1 text-xs text-red-600">{validationErrors.confirmPassword}</p>}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {isLoading ? "Creating account..." : "Sign up"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigateTo("login")}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}

function HomePage() {
  const { navigateTo, currentUser } = useAuth();
  
  const handleGetStarted = () => {
    if (currentUser) {
      let view = 'userDashboard';
      if (currentUser.role === 'admin') view = 'adminDashboard';
      if (currentUser.role === 'teacher') view = 'teacherDashboard';
      navigateTo(view);
    } else {
      navigateTo('login');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg">
      <div className="p-6 text-indigo-600 bg-white rounded-full shadow-lg">
        <IconBookOpen size={48} />
      </div>
      <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
        Welcome to <span className="text-blue-600">StudySync</span>
      </h1>
      <p className="max-w-xl mx-auto mt-4 text-lg text-gray-600">
        Your smart study scheduler. Organize tasks, manage users, and achieve your academic goals. This is the main "Home Page" showing website capabilities as requested.
      </p>

      <div className="mt-10">
        <button
          onClick={handleGetStarted}
          className="px-8 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
        >
          {currentUser ? "Go to Dashboard" : "Get Started"}
        </button>
      </div>

      <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="p-6 text-left bg-white rounded-lg shadow-md">
          <div className="p-3 text-white bg-blue-600 rounded-md w-max">
            <IconShield />
          </div>
          <h3 className="mt-4 text-lg font-semibold">Admin Capabilities</h3>
          <p className="mt-2 text-gray-600">
            Full control over the platform. Manage users, teachers, classes, and subjects.
          </p>
        </div>
        <div className="p-6 text-left bg-white rounded-lg shadow-md">
          <div className="p-3 text-white bg-teal-600 rounded-md w-max">
            <IconClipboard />
          </div>
          <h3 className="mt-4 text-lg font-semibold">Teacher Capabilities</h3>
          <p className="mt-2 text-gray-600">
            Manage your assigned classes. Upload study materials and post student marks.
          </p>
        </div>
        <div className="p-6 text-left bg-white rounded-lg shadow-md">
          <div className="p-3 text-white bg-indigo-600 rounded-md w-max">
            <IconUser />
          </div>
          <h3 className="mt-4 text-lg font-semibold">Student Capabilities</h3>
          <p className="mt-2 text-gray-600">
            A personalized dashboard to view your study tasks, marks, and class materials.
          </p>
        </div>
      </div>
    </div>
  );
}

function ChangePasswordPage() {
  const { changePassword, currentUser, isLoading, error, navigateTo, currentView } = useAuth();
  const [formData, setFormData] = useState({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
  const [validationError, setValidationError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push("at least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("an uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("a lowercase letter");
    if (!/[0-9]/.test(password)) errors.push("a number");
    if (!/[!@#$%^&*]/.test(password)) errors.push("a special character");
    return errors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");
    setSuccessMessage("");
    // Reset API error from context
    if (error) navigateTo(currentView); // Clears error

    // --- Input Validation ---
    if (!formData.oldPassword || !formData.newPassword || !formData.confirmNewPassword) {
      setValidationError("All fields are required.");
      return;
    }
    
    const passwordErrors = validatePassword(formData.newPassword);
    if (passwordErrors.length > 0) {
      setValidationError(`New password must contain ${passwordErrors.join(", ")}.`);
      return;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      setValidationError("New passwords do not match.");
      return;
    }
    
    if (formData.oldPassword === formData.newPassword) {
      setValidationError("New password must be different from the old password.");
      return;
    }
    try {
      const success = await changePassword(currentUser.id, formData.oldPassword, formData.newPassword);
      if (success) {
        setSuccessMessage("Password changed successfully!");
        setFormData({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
      }
    } catch (err) {
       // error is set in context
    }
  };

  return (
    <div className="max-w-lg p-6 mx-auto mt-10 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold">Change Password</h2>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        {error && <ErrorMessage message={error} />}
        {validationError && <ErrorMessage message={validationError} />}
        {successMessage && <SuccessMessage message={successMessage} />}
        
        <div>
          <label
            htmlFor="oldPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Old Password
          </label>
          <PasswordInput
            id="oldPassword"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            placeholder="Your current password"
          />
        </div>
        
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <PasswordInput
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Your new password"
          />
        </div>
        
        <div>
          <label
            htmlFor="confirmNewPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm New Password
          </label>
          <PasswordInput
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}

// --- Admin Dashboard Components ---

function UserForm({ user, onSave, onCancel, apiError }) {
  const { classes } = useAuth();
  const [formData, setFormData] = useState(
    user || { name: "", email: "", password: "", role: "user", classId: "", classIds: [] }
  );
  const [validationError, setValidationError] = useState("");
  
  const isEditing = !!user;

  // Ensure classIds is always an array
  if (isEditing && formData.role === 'teacher' && !Array.isArray(formData.classIds)) {
    setFormData(prev => ({ ...prev, classIds: [] }));
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleTeacherClassChange = (classId) => {
    setFormData(prev => {
      const newClassIds = prev.classIds.includes(classId)
        ? prev.classIds.filter(id => id !== classId)
        : [...prev.classIds, classId];
      return { ...prev, classIds: newClassIds };
    });
  };
  
  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push("at least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("an uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("a lowercase letter");
    if (!/[0-9]/.test(password)) errors.push("a number");
    if (!/[!@#$%^&*]/.test(password)) errors.push("a special character");
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    // --- Input Validation ---
    if (!formData.name.trim() || !formData.email.trim()) {
      setValidationError("Name and Email are required.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setValidationError("Email format is invalid.");
      return;
    }
    
    if (!isEditing || (isEditing && formData.password)) {
       if (!formData.password) {
         setValidationError("Password is required for new users.");
         return;
       }
       const passwordErrors = validatePassword(formData.password);
       if (passwordErrors.length > 0) {
         setValidationError(`Password must contain ${passwordErrors.join(", ")}.`);
         return;
       }
    }
    
    if (formData.role === 'user' && !formData.classId) {
      setValidationError("A class must be assigned to students.");
      return;
    }
    
    if (formData.role === 'teacher' && formData.classIds.length === 0) {
      setValidationError("At least one class must be assigned to teachers.");
      return;
    }
    
    const dataToSave = { ...formData };
    if (isEditing && !dataToSave.password) {
      delete dataToSave.password;
    }
    if (dataToSave.role === 'user') {
      dataToSave.classIds = [];
    }
    if (dataToSave.role === 'teacher') {
      dataToSave.classId = null;
    }

    onSave(dataToSave);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {(validationError || apiError) && <ErrorMessage message={validationError || apiError} />}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
          {isEditing && <span className="text-xs text-gray-500"> (Leave blank to keep current password)</span>}
        </label>
        <PasswordInput
          name="password"
          id="password"
          value={formData.password || ""}
          onChange={handleChange}
          placeholder={isEditing ? "Enter new password" : "Create password"}
          required={!isEditing}
        />
      </div>
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
        <select
          name="role"
          id="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="user">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      
      {formData.role === 'user' && (
        <div>
          <label htmlFor="classId" className="block text-sm font-medium text-gray-700">Assign to Class</label>
          <select
            name="classId"
            id="classId"
            value={formData.classId || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a class</option>
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      )}
      
      {formData.role === 'teacher' && (
         <div>
          <label className="block text-sm font-medium text-gray-700">Assign to Classes</label>
          <div className="mt-2 space-y-2 max-h-32 overflow-y-auto border p-2 rounded-md">
            {classes.map(c => (
              <label key={c.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.classIds.includes(c.id)}
                  onChange={() => handleTeacherClassChange(c.id)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{c.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-end pt-4 space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700"
        >
          {isEditing ? "Update User" : "Add User"}
        </button>
      </div>
    </form>
  );
}

function UserManagement() {
  const { users, addUser, updateUser, deleteUser, isLoading, error: globalError, getClassName } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null); // stores user to be deleted
  const [apiError, setApiError] = useState(null); // For modal-specific errors

  const handleOpenAddModal = () => {
    setEditingUser(null);
    setShowModal(true);
    setApiError(null);
  };

  const handleOpenEditModal = (user) => {
    setEditingUser(user);
    setShowModal(true);
    setApiError(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setApiError(null);
  };

  const handleSaveUser = async (data) => {
    setApiError(null);
    try {
      if (editingUser) {
        await updateUser(editingUser.id, data);
      } else {
        await addUser(data);
      }
      handleCloseModal();
    } catch (err) {
      setApiError(err.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setShowDeleteConfirm(null);
    } catch (err) {
       console.error(err.message);
       setShowDeleteConfirm(null);
    }
  };
  
  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'teacher': return 'bg-teal-100 text-teal-800';
      case 'user': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md relative">
      {isLoading && <LoadingSpinner />}
      {showModal && (
        <Modal
          title={editingUser ? "Edit User" : "Add New User"}
          onClose={handleCloseModal}
        >
          <UserForm
            user={editingUser}
            onSave={handleSaveUser}
            onCancel={handleCloseModal}
            apiError={apiError}
          />
        </Modal>
      )}
      
      {showDeleteConfirm && (
        <Modal 
          title="Confirm Deletion"
          onClose={() => setShowDeleteConfirm(null)}
        >
          <p>Are you sure you want to delete the user <span className="font-semibold">{showDeleteConfirm.email}</span>?</p>
          <p className="mt-1 text-sm text-red-600">This action cannot be undone and will also delete all their tasks and marks.</p>
          <div className="flex justify-end pt-4 mt-4 space-x-3 border-t">
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(null)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleDeleteUser(showDeleteConfirm.id)}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md shadow-sm hover:bg-red-700"
            >
              Delete User
            </button>
          </div>
        </Modal>
      )}

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">User Management</h3>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700"
        >
          <IconPlus />
          <span className="ml-2">Add New User</span>
        </button>
      </div>
      {globalError && !apiError && <ErrorMessage message={globalError} />}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Class / Assignments</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {user.role === 'user' && (user.classId ? getClassName(user.classId) : <span className="text-xs italic">No Class</span>)}
                  {user.role === 'teacher' && (user.classIds.length > 0 ? user.classIds.map(getClassName).join(', ') : <span className="text-xs italic">No Classes</span>)}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <button
                    onClick={() => handleOpenEditModal(user)}
                    className="mr-2 text-blue-600 hover:text-blue-900"
                    title="Edit"
                  >
                    <IconEdit />
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(user)}
                    className="text-red-600 hover:text-red-900"
                    title="Delete"
                    disabled={user.id === '1' || user.id === '2' || user.id === '3'} // Disable delete for demo accounts
                  >
                    <IconTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ConsolidatedOperations() {
  const { tasks, users, updateTask, deleteTask, isLoading, error } = useAuth();
  
  const userMap = users.reduce((acc, user) => {
    acc[user.id] = user.name;
    return acc;
  }, {});

  const handleToggleComplete = (task) => {
    updateTask(task.id, { completed: !task.completed });
  };
  
  return (
    <div className="p-6 mt-8 bg-white rounded-lg shadow-md relative">
       {isLoading && <LoadingSpinner />}
      <h3 className="mb-4 text-xl font-semibold">Consolidated Operations (All Study Tasks)</h3>
      {error && <ErrorMessage message={error} />}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Subject</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Due Date</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => handleToggleComplete(task)} className={`p-1 rounded-full ${task.completed ? 'text-green-600' : 'text-gray-300 hover:text-gray-500'}`}>
                    <IconCheck />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>{task.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{task.subject}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{task.date}</div>
                </td>
                 <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{userMap[task.userId] || 'Unknown User'}</div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Delete Task"
                  >
                    <IconTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SchoolManagement() {
  const { classes, subjects, addClass, deleteClass, addSubject, deleteSubject, isLoading, error } = useAuth();
  const [newClassName, setNewClassName] = useState("");
  const [newSubjectName, setNewSubjectName] = useState("");
  const [localError, setLocalError] = useState(null);

  const handleAddClass = async (e) => {
    e.preventDefault();
    setLocalError(null);
    if (!newClassName.trim()) {
      setLocalError("Class name cannot be empty.");
      return;
    }
    try {
      await addClass(newClassName.trim());
      setNewClassName("");
    } catch (err) {
      setLocalError(err.message);
    }
  };
  
  const handleAddSubject = async (e) => {
    e.preventDefault();
    setLocalError(null);
    if (!newSubjectName.trim()) {
      setLocalError("Subject name cannot be empty.");
      return;
    }
    try {
      await addSubject(newSubjectName.trim());
      setNewSubjectName("");
    } catch (err) {
      setLocalError(err.message);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
      {isLoading && <LoadingSpinner />}
      {(error || localError) && <div className="md:col-span-2"><ErrorMessage message={error || localError} /></div>}
      
      {/* Manage Classes */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Manage Classes</h3>
        <form onSubmit={handleAddClass} className="flex space-x-2 mb-4">
          <input
            type="text"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
            placeholder="New Class Name (e.g. Grade 10-A)"
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Add</button>
        </form>
        <ul className="divide-y divide-gray-200">
          {classes.map(c => (
            <li key={c.id} className="flex items-center justify-between py-2">
              <span className="text-gray-700">{c.name}</span>
              <button onClick={() => deleteClass(c.id)} className="text-red-500 hover:text-red-700"><IconTrash /></button>
            </li>
          ))}
        </ul>
      </div>

      {/* Manage Subjects */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Manage Subjects</h3>
        <form onSubmit={handleAddSubject} className="flex space-x-2 mb-4">
          <input
            type="text"
            value={newSubjectName}
            onChange={(e) => setNewSubjectName(e.target.value)}
            placeholder="New Subject Name (e.g. Physics)"
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Add</button>
        </form>
        <ul className="divide-y divide-gray-200">
          {subjects.map(s => (
            <li key={s.id} className="flex items-center justify-between py-2">
              <span className="text-gray-700">{s.name}</span>
              <button onClick={() => deleteSubject(s.id)} className="text-red-500 hover:text-red-700"><IconTrash /></button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users"); // 'users', 'school', 'tasks', 'password'
  const { navigateTo } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UserManagement />;
      case "school":
        return <SchoolManagement />;
      case "tasks":
        return <ConsolidatedOperations />;
      case "password":
        return <ChangePasswordPage />;
      default:
        return <UserManagement />;
    }
  };

  const TabButton = ({ tabName, label, onClick }) => (
    <button
      onClick={onClick || (() => setActiveTab(tabName))}
      className={`px-3 py-2 font-medium rounded-md text-sm ${
        activeTab === tabName
          ? "bg-blue-600 text-white"
          : "text-gray-600 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">Admin Dashboard</h1>
      <div className="flex flex-wrap p-1 mb-6 space-x-1 sm:space-x-2 bg-gray-100 rounded-lg">
        <TabButton tabName="users" label="User Management" />
        <TabButton tabName="school" label="School Management" />
        <TabButton tabName="tasks" label="Student Tasks" />
        <TabButton tabName="password" label="Change Password" />
        <TabButton tabName="home" label="Main Home Page" onClick={() => navigateTo('home')} />
      </div>
      <div>
        {renderContent()}
      </div>
    </div>
  );
}

// --- Teacher Dashboard Components ---

function UploadMarks() {
  const { 
    currentUser, classes, subjects, getStudentsByClassIds,
    addMark, deleteMark, marks, getSubjectName, getUserName, isLoading, error
  } = useAuth();
  
  const [formData, setFormData] = useState({ studentId: "", subjectId: "", assessment: "", marks: "", total: "" });
  const [localError, setLocalError] = useState(null);
  
  // Get students this teacher can see
  const myStudents = getStudentsByClassIds(currentUser.classIds || []);
  
  // Get subjects assigned to this teacher's classes (simplified: show all subjects)
  // In a real app, you'd link subjects to classes/teachers
  const mySubjects = subjects; 
  
  // Get marks this teacher has posted
  const myMarks = marks.filter(m => m.teacherId === currentUser.id);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    if (!formData.studentId || !formData.subjectId || !formData.assessment || !formData.marks || !formData.total) {
      setLocalError("All fields are required.");
      return;
    }
    if (parseFloat(formData.marks) > parseFloat(formData.total)) {
      setLocalError("Marks cannot be greater than total.");
      return;
    }
    try {
      await addMark(formData);
      setFormData({ studentId: "", subjectId: "", assessment: "", marks: "", total: "" });
    } catch (err) {
      setLocalError(err.message);
    }
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
      {isLoading && <LoadingSpinner />}
      
      {/* Upload Form */}
      <div className="lg:col-span-1 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Upload Marks</h3>
        {(error || localError) && <ErrorMessage message={error || localError} />}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">Student</label>
            <select name="studentId" id="studentId" value={formData.studentId} onChange={handleChange} className="w-full mt-1 p-2 bg-white border rounded-md">
              <option value="">Select Student</option>
              {myStudents.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
           <div>
            <label htmlFor="subjectId" className="block text-sm font-medium text-gray-700">Subject</label>
            <select name="subjectId" id="subjectId" value={formData.subjectId} onChange={handleChange} className="w-full mt-1 p-2 bg-white border rounded-md">
              <option value="">Select Subject</option>
              {mySubjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="assessment" className="block text-sm font-medium text-gray-700">Assessment Name</label>
            <input type="text" name="assessment" id="assessment" value={formData.assessment} onChange={handleChange} placeholder="e.g. Mid-Term Exam" className="w-full mt-1 p-2 border rounded-md" />
          </div>
          <div className="flex space-x-2">
            <div>
              <label htmlFor="marks" className="block text-sm font-medium text-gray-700">Marks</label>
              <input type="number" name="marks" id="marks" value={formData.marks} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
            </div>
            <div>
              <label htmlFor="total" className="block text-sm font-medium text-gray-700">Total</label>
              <input type="number" name="total" id="total" value={formData.total} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Upload Marks</button>
        </form>
      </div>
      
      {/* Existing Marks */}
      <div className="lg:col-span-2 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Uploaded Marks</h3>
         <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Student</th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Subject</th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Assessment</th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Score</th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {myMarks.map(m => (
                <tr key={m.id}>
                  <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">{getUserName(m.studentId)}</td>
                  <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{getSubjectName(m.subjectId)}</td>
                  <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{m.assessment}</td>
                  <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap"><span className="font-semibold">{m.marks}</span> / {m.total}</td>
                  <td className="px-4 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <button onClick={() => deleteMark(m.id)} className="text-red-600 hover:text-red-900"><IconTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function UploadMaterials() {
    const { 
    currentUser, classes, subjects, addMaterial, deleteMaterial, materials, 
    getClassName, getSubjectName, isLoading, error
  } = useAuth();
  
  const [formData, setFormData] = useState({ classId: "", subjectId: "", title: "", fileUrl: "" });
  const [localError, setLocalError] = useState(null);
  
  // Get classes this teacher is assigned to
  const myClasses = classes.filter(c => currentUser.classIds.includes(c.id));
  const mySubjects = subjects; // Simplified
  
  // Get materials this teacher has posted
  const myMaterials = materials.filter(m => m.teacherId === currentUser.id);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    if (!formData.classId || !formData.subjectId || !formData.title || !formData.fileUrl) {
      setLocalError("All fields are required.");
      return;
    }
    try {
      await addMaterial(formData);
      setFormData({ classId: "", subjectId: "", title: "", fileUrl: "" });
    } catch (err) {
      setLocalError(err.message);
    }
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
      {isLoading && <LoadingSpinner />}
      
      {/* Upload Form */}
      <div className="lg:col-span-1 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Upload Study Material</h3>
        {(error || localError) && <ErrorMessage message={error || localError} />}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="classId" className="block text-sm font-medium text-gray-700">Class</label>
            <select name="classId" id="classId" value={formData.classId} onChange={handleChange} className="w-full mt-1 p-2 bg-white border rounded-md">
              <option value="">Select Class</option>
              {myClasses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
           <div>
            <label htmlFor="subjectId" className="block text-sm font-medium text-gray-700">Subject</label>
            <select name="subjectId" id="subjectId" value={formData.subjectId} onChange={handleChange} className="w-full mt-1 p-2 bg-white border rounded-md">
              <option value="">Select Subject</option>
              {mySubjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Material Title</label>
            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} placeholder="e.g. Chapter 1 Notes" className="w-full mt-1 p-2 border rounded-md" />
          </div>
          <div>
            <label htmlFor="fileUrl" className="block text-sm font-medium text-gray-700">File URL (Mock)</label>
            <input type="text" name="fileUrl" id="fileUrl" value={formData.fileUrl} onChange={handleChange} placeholder="e.g. notes.pdf" className="w-full mt-1 p-2 border rounded-md" />
          </div>
          <button type="submit" disabled={isLoading} className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Upload Material</button>
        </form>
      </div>
      
      {/* Existing Materials */}
      <div className="lg:col-span-2 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Uploaded Materials</h3>
         <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Title</th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Class</th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Subject</th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">File</th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {myMaterials.map(m => (
                <tr key={m.id}>
                  <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">{m.title}</td>
                  <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{getClassName(m.classId)}</td>
                  <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{getSubjectName(m.subjectId)}</td>
                  <td className="px-4 py-4 text-sm text-blue-600 whitespace-nowrap">{m.fileUrl}</td>
                  <td className="px-4 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <button onClick={() => deleteMaterial(m.id)} className="text-red-600 hover:text-red-900"><IconTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("materials"); // 'materials', 'marks', 'password'
  const { navigateTo, currentUser, getClassName } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case "materials":
        return <UploadMaterials />;
      case "marks":
        return <UploadMarks />;
      case "password":
        return <ChangePasswordPage />;
      default:
        return <UploadMaterials />;
    }
  };

  const TabButton = ({ tabName, label, onClick }) => (
    <button
      onClick={onClick || (() => setActiveTab(tabName))}
      className={`px-3 py-2 font-medium rounded-md text-sm ${
        activeTab === tabName
          ? "bg-teal-600 text-white"
          : "text-gray-600 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <h1 className="mb-1 text-3xl font-bold">Teacher Dashboard</h1>
      <p className="mb-4 text-gray-600">Managing classes: <span className="font-semibold">{currentUser.classIds.map(getClassName).join(', ')}</span></p>
      
      <div className="flex flex-wrap p-1 mb-6 space-x-1 sm:space-x-2 bg-gray-100 rounded-lg">
        <TabButton tabName="materials" label="Study Materials" />
        <TabButton tabName="marks" label="Upload Marks" />
        <TabButton tabName="password" label="Change Password" />
        <TabButton tabName="home" label="Main Home Page" onClick={() => navigateTo('home')} />
      </div>
      <div>
        {renderContent()}
      </div>
    </div>
  );
}


// --- User (Student) Dashboard Component ---

function UserDashboard() {
  const { 
    currentUser, navigateTo, tasks, getStudentMarks, getStudentMaterials, 
    getSubjectName, getUserName, isLoading, error, getClassName
  } = useAuth();
  
  // Get all data for this student
  const myTasks = tasks.filter(task => task.userId === currentUser.id);
  const myMarks = getStudentMarks(currentUser.id);
  const myMaterials = getStudentMaterials(currentUser.classId);

  return (
    <div>
      <h1 className="mb-1 text-3xl font-bold">Welcome, {currentUser.name}!</h1>
      <p className="mb-6 text-gray-600">
        You are enrolled in: <span className="font-semibold">{getClassName(currentUser.classId) || "No Class Assigned"}</span>
      </p>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <div 
          onClick={() => navigateTo('changePassword')}
          className="p-6 text-center text-blue-700 bg-blue-100 rounded-lg shadow-sm cursor-pointer hover:bg-blue-200"
        >
          <IconLock className="inline-block w-8 h-8 mx-auto mb-2" />
          <h3 className="font-semibold">Change Password</h3>
          <p className="text-sm">Update your security settings</p>
        </div>
         <div 
          onClick={() => navigateTo('home')}
          className="p-6 text-center text-gray-700 bg-gray-100 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200"
        >
          <IconBookOpen className="inline-block w-8 h-8 mx-auto mb-2" />
          <h3 className="font-semibold">Main Home Page</h3>
          <p className="text-sm">View website capabilities</p>
        </div>
      </div>
      
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      {/* Grid for Tasks, Marks, Materials */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* My Tasks */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md">
          <h3 className="p-4 text-xl font-semibold border-b">Your Tasks (View-Only)</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Subject</th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Due Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {myTasks.length === 0 && !isLoading && (
                  <tr><td colSpan="4" className="px-6 py-4 text-center text-gray-500">You have no tasks assigned.</td></tr>
                )}
                {myTasks.map((task) => (
                  <tr key={task.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {task.completed ? (
                        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Completed</span>
                      ) : (
                        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">Pending</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>{task.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-500">{task.subject}</div></td>
                    <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-500">{task.date}</div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* My Marks */}
        <div className="bg-white rounded-lg shadow-md">
          <h3 className="p-4 text-xl font-semibold border-b">My Marks</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Subject</th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Assessment</th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Score</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {myMarks.length === 0 && !isLoading && (
                  <tr><td colSpan="3" className="px-6 py-4 text-center text-gray-500">No marks uploaded yet.</td></tr>
                )}
                {myMarks.map(m => (
                  <tr key={m.id}>
                    <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{getSubjectName(m.subjectId)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{m.assessment}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"><span className="font-semibold">{m.marks}</span> / {m.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* My Study Materials */}
        <div className="bg-white rounded-lg shadow-md">
          <h3 className="p-4 text-xl font-semibold border-b">My Study Materials</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Subject</th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">File</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {myMaterials.length === 0 && !isLoading && (
                  <tr><td colSpan="3" className="px-6 py-4 text-center text-gray-500">No materials uploaded for your class.</td></tr>
                )}
                {myMaterials.map(m => (
                  <tr key={m.id}>
                    <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">{m.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{getSubjectName(m.subjectId)}</td>
                    <td className="px-6 py-4 text-sm text-blue-600 whitespace-nowrap hover:underline cursor-pointer">{m.fileUrl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

// --- Main App Component (Router) ---

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { currentView, currentUser, logout, navigateTo } = useAuth();
  
  const renderView = () => {
    // --- Auth Pages ---
    if (!currentUser) {
      switch (currentView) {
        case "login":
          return <LoginPage />;
        case "signup":
          return <SignUpPage />;
        default:
          return <LoginPage />; // Default to login if not authenticated
      }
    }
    
    // --- Authenticated Pages ---
    // These are wrapped in the main layout
    let pageComponent;
    switch (currentView) {
      case "home":
        pageComponent = <HomePage />;
        break;
      case "adminDashboard":
        pageComponent = currentUser.role === "admin" ? <AdminDashboard /> : <UserDashboard />; // Role-based routing
        break;
      case "teacherDashboard":
        pageComponent = currentUser.role === "teacher" ? <TeacherDashboard /> : <UserDashboard />;
        break;
      case "userDashboard":
        pageComponent = <UserDashboard />;
        break;
      case "changePassword":
        pageComponent = <ChangePasswordPage />;
        break;
      default:
        // Handle invalid view state by routing to correct dashboard
        if (currentUser.role === 'admin') pageComponent = <AdminDashboard />;
        else if (currentUser.role === 'teacher') pageComponent = <TeacherDashboard />;
        else pageComponent = <UserDashboard />;
    }
    
    // Main App Layout
    return (
      <div className="flex flex-col min-h-screen font-sans bg-gray-100">
        <nav className="sticky top-0 z-40 w-full bg-white shadow-md">
          <div className="max-w-6xl px-4 mx-auto">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <button className="flex items-center" onClick={() => navigateTo('home')}>
                <IconBookOpen className="w-6 h-6 mr-2 text-blue-600" />
                <span className="text-xl font-bold text-gray-800">StudySync</span>
              </button>
              
              {/* Navigation */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigateTo('home')}
                  className="hidden px-3 py-2 text-sm font-medium text-gray-600 rounded-md sm:block hover:bg-gray-100"
                >
                  Home
                </button>
                
                {currentUser.role === 'admin' && (
                   <button
                    onClick={() => navigateTo('adminDashboard')}
                    className="hidden px-3 py-2 text-sm font-medium text-gray-600 rounded-md sm:block hover:bg-gray-100"
                  >
                    Admin
                  </button>
                )}
                
                {currentUser.role === 'teacher' && (
                   <button
                    onClick={() => navigateTo('teacherDashboard')}
                    className="hidden px-3 py-2 text-sm font-medium text-gray-600 rounded-md sm:block hover:bg-gray-100"
                  >
                    Teacher
                  </button>
                )}
                
                {currentUser.role === 'user' && (
                  <button
                    onClick={() => navigateTo('userDashboard')}
                    className="hidden px-3 py-2 text-sm font-medium text-gray-600 rounded-md sm:block hover:bg-gray-100"
                  >
                    Dashboard
                  </button>
                )}
                
                <span className="hidden sm:inline-block text-sm text-gray-500">|</span>
                
                <span className="hidden sm:inline-block text-sm font-medium text-gray-700">
                  Welcome, {currentUser.name}
                </span>

                <button
                  onClick={logout}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100"
                  title="Logout"
                >
                  <IconLogOut className="w-5 h-5" />
                  <span className="ml-1 sm:hidden">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Page Content */}
        <main className="flex-grow w-full max-w-6xl p-4 mx-auto md:p-8">
          {pageComponent}
        </main>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen antialiased text-gray-900 bg-gray-100">
      {renderView()}
    </div>
  );
}

export default App;


