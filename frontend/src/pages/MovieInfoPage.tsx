import Header from "../components/Header";
import Footer from "../components/Footer";
import Cookies from "js-cookie";
import { toast, Toaster } from "react-hot-toast"; // ✅

function MovieInfoPage() {
  const addPoints = () => {
    const currentPoints = parseInt(Cookies.get("userPoints") || "0");
    const newPoints = currentPoints + 10;
    Cookies.set("userPoints", newPoints.toString(), { expires: 7 });

    toast.success(`You've earned 10 points! Total: ${newPoints}`); // ✅
  };

  return (
    <div className="page-container">
      <Header />
      <div className="page-content">
        <h1>MovieInfo Huzzah!</h1>

        <button onClick={addPoints} style={{ marginTop: "20px" }}>
          Earn 10 Points for Viewing!
        </button>
      </div>
      <Footer />

      {/* ✅ Correct toaster */}
      <Toaster />
    </div>
  );
}

export default MovieInfoPage;
