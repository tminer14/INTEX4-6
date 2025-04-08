import { Link } from "react-router-dom";

function ForbiddenPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-4">403 - Forbidden</h1>
      <p className="text-lg mb-6">
        You do not have permission to view this page.
      </p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default ForbiddenPage;
