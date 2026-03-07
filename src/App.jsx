import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen text-gray-900 transition-colors duration-300 bg-white dark:bg-gray-900 dark:text-white">
      <Navbar />

      <main className="container flex-grow px-4 py-6 mx-auto">
        <AppRoutes />
      </main>

      <Footer />
    </div>
  );
}

export default App;