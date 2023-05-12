// libraries
import { Provider } from "react-redux";

// redux
import store from "@/redux/store";

// styles
import "./App.css";

// components
import Routes from "@/routing/Routes";

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
