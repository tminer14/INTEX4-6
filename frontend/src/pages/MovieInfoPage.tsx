import Header from "../components/Header";
import Footer from "../components/Footer";
import Cookies from "js-cookie"; // NEW: import js-cookie

function MovieInfoPage() {
  // NEW: Function to add points
  const addPoints = () => {
    const currentPoints = parseInt(Cookies.get("userPoints") || "0");
    const newPoints = currentPoints + 10; // Add 10 points for viewing a movie
    Cookies.set("userPoints", newPoints.toString(), { expires: 7 });
    alert(`You've earned 10 points! Total points: ${newPoints}`);
  };

  return (
    <div className="page-container">
      <Header />
      <div className="page-content">
        <h1>MovieInfo Huzzah!</h1>

        {/* NEW: Add Points Button */}
        <button onClick={addPoints} style={{ marginTop: "20px" }}>
          Earn 10 Points for Viewing!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default MovieInfoPage;
