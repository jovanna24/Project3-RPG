import "./App.css";
import { Outlet } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { setContext } from "@apollo/client/link/context";
import Modal from "./components/Modal/Modal.jsx";
import { useState } from "react";



// might need to fix 10-12 when ready for dev
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "Test",
    body: "Hello",
  }); 

  return (
    <ApolloProvider client={client}>
          <div className="flex-column justify-center align-center min-100-vh bg-primary">
            <Modal setShowModal={setShowModal} title={modalContent.title} body={modalContent.body} showModal={showModal} setShowModal={setShowModal}/>
            <Navbar setShowModal={setShowModal} setModalContent={setModalContent}/>
            <div className="container">
              <Outlet />
            </div>
            <Footer />
          </div>
    </ApolloProvider>
  );
}

export default App;
