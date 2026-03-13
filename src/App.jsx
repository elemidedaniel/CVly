import CVProvider from "./context/CVContext";
import BuilderPage from "./pages/BuilderPage";

export default function App() {
  return (
    <CVProvider>
      <BuilderPage />
    </CVProvider>
  );
}