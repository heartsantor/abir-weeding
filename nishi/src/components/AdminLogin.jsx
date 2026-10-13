import { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, ArrowLeft } from "lucide-react";

export default function AdminLogin({ onLoginSuccess, onBackHome }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in both fields");
      return;
    }
    // Allow demo admin login
    if (username.toLowerCase() === "admin" && password === "admin") {
      sessionStorage.setItem("eleganza_admin_auth", "token_" + Date.now());
      onLoginSuccess();
    } else if (username && password) {
      // Also allow flexible admin demo
      sessionStorage.setItem("eleganza_admin_auth", "token_" + Date.now());
      onLoginSuccess();
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <button
          onClick={onBackHome}
          className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Invitation
        </button>

        <div className="text-center mb-8">
          <h1 className="font-display text-4xl mb-2 text-foreground">Admin Portal</h1>
          <p className="font-body text-sm text-foreground/70">
            Manage your wedding invitation & RSVPs
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 card-elegant">
          {error && (
            <div className="p-3 text-xs bg-red-100 text-red-700 rounded-md border border-red-200">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-wider font-body text-foreground/80 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full pl-10 pr-4 py-2 text-sm bg-background/50 border border-foreground/20 rounded-md text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-body text-foreground/80 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin"
                className="w-full pl-10 pr-4 py-2 text-sm bg-background/50 border border-foreground/20 rounded-md text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-primary text-primary-foreground font-body text-sm tracking-wider uppercase transition-opacity hover:opacity-90 cursor-pointer"
          >
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
}
