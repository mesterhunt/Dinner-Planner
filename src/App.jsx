import { auth, provider } from "./firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [mealPlan, setMealPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
  };

  const handleLogout = () => {
    signOut(auth);
    setUser(null);
  };

  const generateMealPlan = async () => {
    console.log("API Key:", import.meta.env.VITE_CLAUDE_API_KEY);
    setLoading(true);
    setMealPlan("");

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content:
              "Generate a simple weekly dinner plan for a family of 4. List Monday to Sunday with one meal per day. Keep it short.",
          },
        ],
      }),
    });

    const data = await response.json();
    setMealPlan(data.content[0].text);
    setLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-orange-500">
        🍽️ My Dinner Planner v2
      </h1>
      <p className="text-green-500 mt-2">🛒 Shopping List coming soon!</p>

      {user ? (
        <div className="mt-4">
          <p className="text-gray-700">Welcome, {user.displayName}!</p>
          <button
            onClick={handleLogout}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Sign Out
          </button>

          <button
            onClick={generateMealPlan}
            className="mt-4 ml-2 bg-orange-500 text-white px-4 py-2 rounded-lg"
          >
            {loading ? "Generating..." : "Generate Meal Plan"}
          </button>

          {mealPlan && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h2 className="font-bold text-gray-700 mb-2">Your Meal Plan:</h2>
              <pre className="text-gray-600 whitespace-pre-wrap">
                {mealPlan}
              </pre>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
}

export default App;
