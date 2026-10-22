import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Expert() {
  const [queries, setQueries] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    fetchPendingQueries();
  }, []);

  const fetchPendingQueries = () => {
    API.get("/expert-query/pending", axiosConfig)
      .then((res) => setQueries(res.data))
      .catch((err) => console.error("Error fetching pending queries", err));
  };

  const handleAnswerChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const submitAnswer = (queryId) => {
    const answer = answers[queryId];
    if (!answer) return alert("Answer cannot be empty.");

    const payload = { queryId, answer };

    API.post("/expert-query/answer", payload, axiosConfig)
      .then(() => {
        alert("Answer submitted successfully!");
        setAnswers((prev) => {
          const updated = { ...prev };
          delete updated[queryId];
          return updated;
        });
        fetchPendingQueries();
      })
      .catch((err) => {
        console.error("Error submitting answer", err);
        alert("Failed to submit answer.");
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">🧠 Expert Query Panel</h2>

      {queries.length === 0 ? (
        <p className="text-muted text-center mt-4">No pending queries found.</p>
      ) : (
        queries.map((query) => (
          <div key={query.id} className="card shadow-sm p-3 mb-3">
            <p><strong>Q:</strong> {query.question}</p>
            <p><strong>Farm:</strong> {query.farmName}</p>

            <div className="mb-2">
              <textarea
                className="form-control"
                rows="2"
                placeholder="Write your answer..."
                value={answers[query.id] || ""}
                onChange={(e) => handleAnswerChange(query.id, e.target.value)}
              />
            </div>
            <button
              className="btn btn-success"
              onClick={() => submitAnswer(query.id)}
            >
              Submit Answer
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Expert;