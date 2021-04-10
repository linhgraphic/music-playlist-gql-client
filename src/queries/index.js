import { gql } from "@apollo/client";

const getSongsQuery = gql`
  {
    songs {
      id
      title
      date
      artistId
      userName
      createdAt
      user {
        username
      }
    }
  }
`;
const getArtistQuery = gql`
  {
    artists {
      id
      name
      bio
    }
  }
`;

const getSongQuery = gql`
  query($id: ID) {
    song(id: $id) {
      title
      date
      userName
      createdAt
      artist {
        name
        bio
        songs {
          title
          user {
            username
          }
        }
      }
    }
  }
`;
const getSongByUserQuery = gql`
  query($userName: String!) {
    findSongByUser(userName: $userName) {
      id
      title
      date
      userName
      createdAt
      artist {
        id
        name
        bio
      }
    }
  }
`;
const addSongMutation = gql`
  mutation($title: String!, $date: Int!, $artistId: ID!) {
    addSong(title: $title, date: $date, artistId: $artistId) {
      id
      title
      date
    }
  }
`;
const addArtistMutation = gql`
  mutation($name: String!, $bio: String) {
    addArtist(name: $name, bio: $bio) {
      id
      name
      bio
    }
  }
`;
const deleteSongQuery = gql`
  mutation($id: ID!) {
    deleteSong(id: $id) {
      title
      date
    }
  }
`;
const updateSongQuery = gql`
  mutation($id: ID!, $title: String!, $date: Int) {
    updateSong(id: $id, title: $title, date: $date) {
      title
      date
    }
  }
`;
const userRegister = gql`
  mutation($username: String!, $password: String!, $confirmPassword: String!) {
    register(
      username: $username
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      username
      password
      token
    }
  }
`;
const userLogin = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      password
      token
    }
  }
`;
const getUsersQuery = gql`
  query {
    users {
      id
      username
      songs {
        id
        title
        date
        createdAt
        userName
        artist {
          id
          name
          bio
        }
      }
    }
  }
`;

export {
  getSongQuery,
  getSongsQuery,
  getArtistQuery,
  addSongMutation,
  addArtistMutation,
  deleteSongQuery,
  updateSongQuery,
  userRegister,
  userLogin,
  getUsersQuery,
  getSongByUserQuery,
};
