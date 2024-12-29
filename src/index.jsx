import { PrivyProvider } from "@privy-io/react-auth";

// ... other imports

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PrivyProvider
      appId={process.env.REACT_APP_PRIVY_APP_ID}
      config={{
        loginMethods: ["email"],
        appearance: {
          theme: "dark",
          accentColor: "#676FFF",
        },
      }}
    >
      <StateContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StateContextProvider>
    </PrivyProvider>
  </React.StrictMode>,
);
