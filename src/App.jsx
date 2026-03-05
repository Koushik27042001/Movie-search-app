import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
