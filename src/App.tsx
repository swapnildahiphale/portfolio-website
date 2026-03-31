import { lazy, Suspense } from "react";
import "./App.css";
import BlogRouter from "./components/Blog/BlogRouter";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  return (
    <>
      <LoadingProvider>
        <BlogRouter>
          <Suspense>
            <MainContainer>
              <Suspense>
                <CharacterModel />
              </Suspense>
            </MainContainer>
          </Suspense>
        </BlogRouter>
      </LoadingProvider>
    </>
  );
};

export default App;
