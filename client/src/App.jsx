import { Suspense } from "react";
import { RouterProvider} from "react-router-dom";
import { Router } from "./routes";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/common/Loader";
import "./App.css";

const App = () => {
  const router = Router();
  return (
    <>
        <Suspense fallback={<Loader />}>
          <ToastContainer
            autoClose={1500}
            closeOnClick
            pauseOnFocusLoss={false}
            pauseOnHover
            transition={Bounce}
            className='mt-16 xsm:mt-12 w-[90%] xsm:w-auto min-w-[200px] xsm:min-w-[320px] left-auto text-sm xsm:text-sm md:text-base'
          />
          <RouterProvider router={router} />
        </Suspense>
    </>
  );
};

export default App;
