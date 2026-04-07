import { useEffect, Suspense, lazy } from "react";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  useEffect(() => {
    // Cleanup of music-related localStorage keys
    localStorage.removeItem("musicStarted");
    localStorage.removeItem("musicMuted");
  }, []);

  return (
    <>
      <LoadingProvider>
        <Suspense fallback={null}>
          <MainContainer>
            <Suspense fallback={null}>
              <CharacterModel />
            </Suspense>
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </>
  );
};

export default App;
