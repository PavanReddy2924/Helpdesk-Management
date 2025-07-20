// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Chat = () => {
//   const [message, setMessage] = useState("");
//   const [response, setResponse] = useState(null);
//   const navigate = useNavigate();

//   const handleSend = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.post(
//         "http://127.0.0.1:8000/chat",
//         { message },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setResponse(res.data);
//     } catch (err) {
//       alert("Session expired or unauthorized");
//       localStorage.removeItem("token");
//       navigate("/login");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>Chat</h2>
//       <input
//         type="text"
//         placeholder="Ask something..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button onClick={handleSend}>Send</button>
//       <button onClick={handleLogout}>Logout</button>

//       {response && (
//         <div style={{ marginTop: "1rem" }}>
//           <strong>Answer:</strong> {response.answer}
//           <br />
//           <strong>Sources:</strong> {response.sources.join(", ")}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chat;
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Chat = () => {
//   const [message, setMessage] = useState("");
//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSend = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       const res = await axios.post(
//         "http://127.0.0.1:8000/chat",
//         { message },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setResponse(res.data);
//     } catch (err) {
//       alert("Session expired or unauthorized");
//       localStorage.removeItem("token");
//       navigate("/login");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 flex items-center justify-center p-4">
//       <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl border border-purple-200">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-purple-700">Markdown Chat Assistant</h2>
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
//           >
//             Logout
//           </button>
//         </div>

//         <textarea
//           className="w-full p-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
//           rows="4"
//           placeholder="Ask something about your markdown docs..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         ></textarea>

//         <button
//           onClick={handleSend}
//           className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded shadow transition"
//           disabled={loading}
//         >
//           {loading ? "Sending..." : "Send"}
//         </button>

//         {response && (
//           <div className="mt-6 bg-gray-50 p-4 rounded border border-gray-300">
//             <p className="text-gray-800">
//               <strong>Answer:</strong> {response.answer}
//             </p>
//             <p className="text-sm text-gray-500 mt-2">
//               <strong>Sources:</strong> {response.sources.join(", ")}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Chat;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSend = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://127.0.0.1:8000/chat",
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponse(res.data);
    } catch (err) {
      alert("Session expired or unauthorized");
      localStorage.removeItem("token");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-3xl border border-purple-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold text-purple-700">📘 Markdown Helpdesk Assistant</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow"
          >
            Logout
          </button>
        </div>

        <textarea
          className="w-full p-4 border rounded-lg mb-4 text-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400"
          rows="5"
          placeholder="💬 Ask something about your markdown docs..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <button
          onClick={handleSend}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg text-lg font-medium transition"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>

        {response && (
          <div className="mt-6 bg-gray-50 p-6 rounded-xl border border-gray-300 shadow-sm">
            <p className="text-xl text-gray-800">
              <strong>Answer:</strong><br /> {response.answer}
            </p>
            <p className="text-sm text-gray-600 mt-4">
              <strong>Sources:</strong> {response.sources.join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
