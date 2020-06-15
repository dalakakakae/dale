import { Form } from "@unform/web";
import React, { useRef, useState, useEffect } from "react";
import { Container, FormStyled, InputStyled, Submit } from "./styles";

import { useMutation, useSubscription } from "@apollo/client";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";
import { Table, Tag, Space } from "antd";

const GAMES = gql`
  subscription MyQuery2 {
    games {
      name
      id
      rate
      user {
        name
        id
        email
      }
      category {
        name
        id
      }
    }
  }
`;

const CATEGORIAS = gql`
  subscription MyQuery {
    categories {
      id
      name
    }
  }
`;

const COMMENTS = gql`
  subscription MyQuery3 {
    comments {
      comment
      id
      name
      game {
        id
        name
      }
    }
  }
`;

const USERS = gql`
  subscription MyQuery {
    users {
      name
      id
      type
      email
    }
  }
`;

const DELETE_USERS = gql`
  mutation MyMutation($uuid: uuid!) {
    delete_users(where: { id: { _eq: $uuid } }) {
      affected_rows
    }
  }
`;

const DELETE_GAMES = gql`
  mutation MyMutation3($uuid: uuid!) {
    delete_games(where: { id: { _eq: $uuid } }) {
      affected_rows
    }
  }
`;

const DELETE_COMMENTS = gql`
  mutation MyMutation($uuid: uuid!) {
    delete_comments(where: { id: { _eq: $uuid } }) {
      affected_rows
    }
  }
`;

const DELETE_CATEGORIA = gql`
  mutation MyMutation($uuid: uuid!) {
    delete_categories(where: { id: { _eq: $uuid } }) {
      affected_rows
    }
  }
`;

const CREATE_CATEGORIA = gql`
  mutation MyMutation($name: String!) {
    insert_categories(objects: { name: $name }) {
      affected_rows
    }
  }
`;

const ADD_USER = gql`
  mutation MyMutation(
    $email: String!
    $name: String!
    $pass: String!
    $type: String!
  ) {
    insert_users(
      objects: { email: $email, name: $name, pass: $pass, type: $type }
    ) {
      affected_rows
    }
  }
`;

const Admin = () => {
  const [gamesData, setGames] = useState();
  const [userData, setUser] = useState();
  const [commentsData, setComments] = useState();
  const [categories, setCategories] = useState();
  const games = useSubscription(GAMES, {});
  const users = useSubscription(USERS, {});
  const comments = useSubscription(COMMENTS, {});
  const categorias = useSubscription(CATEGORIAS, {});
  const [delete_games] = useMutation(DELETE_GAMES);
  const [delete_users] = useMutation(DELETE_USERS);
  const [delete_comments] = useMutation(DELETE_COMMENTS);
  const [delete_categoria] = useMutation(DELETE_CATEGORIA);
  const [create_categoria] = useMutation(CREATE_CATEGORIA);
  const [add_user] = useMutation(ADD_USER);
  const formRef = useRef(null);
  const [visableAddUser, setVisableAddUser] = useState(false);
  const [visableAddCategoria, setVisableAddCategoria] = useState(false);
  const history = useHistory();

  async function deleteGames(value) {
    console.log(value);
    delete_games({ variables: { uuid: value } })
      .then((e) => console.log("f"))
      .catch((e) => console.log(e));
    try {
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteUsers(value) {
    console.log(value);
    delete_users({ variables: { uuid: value } })
      .then((e) => console.log("deleted"))
      .catch((e) => console.log("erro"));
    try {
    } catch (err) {
      console.log(err);
    }
  }

  async function handleAddUser(value) {
    add_user({
      variables: {
        name: value.name,
        email: value.email,
        pass: value.pass,
        type: value.type,
      },
    })
      .then((e) => setVisableAddUser(false))
      .catch((e) => console.log(e));
    try {
    } catch (err) {
      console.log(err);
    }
  }

  async function handleAddCategoria(value) {
    create_categoria({ variables: { name: value.name } })
      .then((e) => setVisableAddCategoria(false))
      .catch((e) => console.log(e));
    try {
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteComments(value) {
    console.log(value);
    delete_comments({ variables: { uuid: value } })
      .then((e) => console.log(e))
      .catch((e) => console.log("e"));
    try {
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteCategoria(value) {
    delete_categoria({ variables: { uuid: value } })
      .then((e) => console.log(e))
      .catch((e) => console.log("e"));
    try {
    } catch (err) {
      console.log(err);
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => <a>{record.name}</a>,
    },
    {
      title: "rate",
      dataIndex: "rate",
      key: "rate",
      render: (text, record) => <a>{record.rate}</a>,
    },
    {
      title: "email produtor",
      dataIndex: "email",
      key: "email",
      render: (text, record) => <a>{record.user && record.user.name}</a>,
    },
    {
      title: "Categoris",
      key: "tags",
      dataIndex: "tags",
      render: (tags, record) => (
        <Tag color={"blue"} key={"tag"}>
          {record.category && record.category["name"]}
        </Tag>
      ),
    },
    {
      title: "acoes",
      key: "action",
      render: (text, record) => (
        <Space onClick={() => deleteGames(record.id)} size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const columns2 = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => <a>{record.name}</a>,
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      render: (text, record) => <a>{record.email}</a>,
    },
    {
      title: "type",
      dataIndex: "type",
      key: "type",
      render: (text, record) => <a>{record.type}</a>,
    },
    {
      title: "acoes",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => deleteUsers(record.id)}>Delete</a>
        </Space>
      ),
    },
  ];

  const columns3 = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => <a>{record.name}</a>,
    },
    {
      title: "comentario",
      dataIndex: "comment",
      key: "comment",
      render: (text, record) => <a>{text}</a>,
    },
    {
      title: "game",
      dataIndex: "game",
      key: "game",
      render: (text, record) => <a>{record.game && record.game.name}</a>,
    },
    {
      title: "acoes",
      key: "action",
      render: (text, record) => (
        <Space onClick={() => deleteComments(record.id)} size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const columns4 = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => <a>{record.name}</a>,
    },
    {
      title: "acoes",
      key: "action",
      render: (text, record) => (
        <Space onClick={() => deleteCategoria(record.id)} size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (games.data) {
      setGames(games.data.games);
    }
    if (comments.data) {
      setComments(comments.data.comments);
    }
    if (users.data) {
      setUser(users.data.users);
    }
    if (categorias.data) {
      setCategories(categorias.data.categories);
    }

    var retrievedObject = localStorage.getItem("@raizs/user");

    const user = JSON.parse(retrievedObject);
    if (user.type != "admin") {
      history.push("/shop");
    }
  }, [games, users, comments]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#ccc",
      }}
    >
      <Container>
        <div style={{ width: "43%", height: "200px" }}>
          {gamesData && (
            <Table
              columns={columns}
              dataSource={gamesData}
              pagination={false}
              scroll={{ y: 240 }}
            />
          )}
        </div>
        <div style={{ width: "43%", height: "200px" }}>
          <Table
            columns={columns3}
            dataSource={commentsData}
            pagination={false}
            scroll={{ y: 240 }}
          />
        </div>
        <div style={{ width: "43%", height: "200px" }}>
          <Table
            columns={columns2}
            dataSource={userData}
            pagination={false}
            scroll={{ y: 240 }}
            footer={() => (
              <a onClick={() => setVisableAddUser(true)}>Adicionar</a>
            )}
          />
        </div>
        <div style={{ width: "43%", height: "200px" }}>
          <Table
            columns={columns4}
            dataSource={categories}
            pagination={false}
            scroll={{ y: 240 }}
            footer={() => (
              <a onClick={() => setVisableAddCategoria(true)}>Adicionar</a>
            )}
          />
        </div>
      </Container>

      {visableAddUser && (
        <div
          style={{
            width: "30vw",
            height: "80vh",
            background: "#433f41",
            zIndex: 100,
            position: "absolute",
          }}
        >
          <div
            style={{
              zIndex: 100,
              position: "absolute",
              left: "95%",
            }}
          >
            <i
              onClick={() => setVisableAddUser(false)}
              style={{ color: "white" }}
              class="fa fa-close"
              aria-hidden="true"
            ></i>
          </div>
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormStyled>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <h1 style={{ fontSize: 30, fontWeight: 700 }}>
                  Adicionar Usuario
                </h1>
              </div>
              <Form ref={formRef} onSubmit={handleAddUser} method="POST">
                <label>Nome</label>
                <InputStyled name="name" type="name" />
                <label>email</label>
                <InputStyled name="email" type="email" />
                <label>senha</label>
                <InputStyled name="pass" type="senha" />
                <label>type</label>
                <InputStyled name="type" type="name" />
                <Submit type="submit" value="Salvar" />
              </Form>
            </FormStyled>
          </div>
        </div>
      )}
      {visableAddCategoria && (
        <div
          style={{
            width: "30vw",
            height: "80vh",
            background: "#433f41",
            zIndex: 100,
            position: "absolute",
          }}
        >
          <div
            style={{
              zIndex: 100,
              position: "absolute",
              left: "95%",
            }}
          >
            <i
              onClick={() => setVisableAddCategoria(false)}
              style={{ color: "white" }}
              class="fa fa-close"
              aria-hidden="true"
            ></i>
          </div>
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormStyled>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <h1 style={{ fontSize: 30, fontWeight: 700 }}>
                  Adicionar Categoria
                </h1>
              </div>
              <Form ref={formRef} onSubmit={handleAddCategoria} method="POST">
                <label>Nome</label>
                <InputStyled name="name" type="name" />
                <Submit type="submit" value="Salvar" />
              </Form>
            </FormStyled>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
