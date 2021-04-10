import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import PlayList from "./components/Playlist";
import AddSong from "./components/AddSong";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./context/Auth";
import { UserProvider } from "./context/User";

const httpLink = createHttpLink({
  uri: "https://serene-shelf-76717.herokuapp.com/",
});
const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return { headers: { authorization: token ? `Bearer ${token}` : "" } };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <UserProvider>
          <Container>
            <NavBar />
            <PlayList />
          </Container>
        </UserProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
