import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white flex flex-col transition-colors">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
