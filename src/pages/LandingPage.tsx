import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-md p-8 text-center space-y-6">
        <h1 className="text-3xl font-semibold">Notes App</h1>

        <p className="text-gray-600">
          A simple, secure place to create and manage your notes.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/login"
            className="px-6 py-2 bg-black text-white rounded-md hover:opacity-90"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-6 py-2 border border-black rounded-md hover:bg-gray-100"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
