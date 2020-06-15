import React, { useEffect, useState, useRef } from "react";
import { FormStyled, InputStyled, Submit } from "./styles";
import { useSubscription, useMutation, gql } from "@apollo/client";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { Form } from "@unform/web";
import { useHistory } from "react-router-dom";

const PLANET = gql`
  subscription MyQuery {
    categories {
      name
      id
      games {
        name
        id
        rate
        description
      }
    }
  }
`;

const CREATE_GAME = gql`
  mutation MyMutation(
    $name: String!
    $categoria: uuid!
    $id: uuid!
    $description: String!
  ) {
    insert_games(
      objects: [
        {
          name: $name
          rate: "3"
          user_id: $id
          category_uuid: $categoria
          description: $description
        }
      ]
    ) {
      returning {
        id
        rate
      }
    }
  }
`;

const DELETE_GAME = gql`
  mutation MyMutation($uuid: uuid!) {
    delete_games(where: { id: { _eq: $uuid } }) {
      affected_rows
    }
  }
`;

const EDIT_GAME = gql`
  mutation MyMutation($id: uuid!, $name: String!, $description: String!) {
    update_games(
      where: { id: { _eq: $id } }
      _set: { name: $name, description: $description }
    ) {
      returning {
        id
      }
    }
  }
`;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const Shop = () => {
  const history = useHistory();
  const [type, setType] = useState("false");
  const [visable, setVisable] = useState(false);
  const [visableEdit, setVisableEdit] = useState(false);
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [editData, setEditData] = useState();
  const { data } = useSubscription(PLANET, {});
  const formRef = useRef(null);
  const [addReview] = useMutation(CREATE_GAME);
  const [deleteGamer] = useMutation(DELETE_GAME);
  const [editGameQuery] = useMutation(EDIT_GAME);

  async function handleSubmit(value) {
    try {
      var retrievedObject = localStorage.getItem("@raizs/user");
      const user = JSON.parse(retrievedObject);

      addReview({
        variables: {
          name: value.name,
          categoria: categoria,
          id: user.id,
          description: descricao,
        },
      })
        .then(() => {})
        .catch((e) => {});
      setVisable(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleEdit(value) {
    try {
      editGameQuery({
        variables: {
          name: value.name,
          id: editData.id,
          description: editData.description,
        },
      })
        .then(() => {})
        .catch((e) => console.log(e));
      setVisableEdit(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteGame(id) {
    try {
      console.log(id);
      deleteGamer({ variables: { uuid: id } })
        .then(() => console.log(id))
        .catch((e) => console.log(e));
    } catch (err) {
      console.log(err);
    }
  }

  async function editGame(data) {
    try {
      console.log(data);
      setEditData(data);
      setVisableEdit(true);
    } catch (err) {
      console.log(err);
    }
  }

  async function setCategoria2(id) {
    try {
      setCategoria(id);
      setVisable(true);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (data) {
      console.log(data["categories"]);
    }

    var retrievedObject = localStorage.getItem("@raizs/user");

    const user = JSON.parse(retrievedObject);
    if (user.type == "admin") {
      history.push("/admin");
    }

    setType(user.type);
  }, [data]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 3000, min: 1200 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1200, min: 800 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: "90vh",
            width: "80vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {data &&
            data["categories"].map((livro) => {
              if (livro.games.length > 0 || type == "publishing") {
                return (
                  <div
                    style={{
                      width: "70vw",
                      height: "40vh",
                      marginTop: 25,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h1 style={{ color: "#ccc" }}>{livro.name}</h1>
                      {type == "publishing" && (
                        <i
                          onClick={() => setCategoria2(livro.id)}
                          style={{ color: "white" }}
                          class="fa fa-plus"
                          aria-hidden="true"
                        ></i>
                      )}
                    </div>
                    <hr style={{ background: "white" }} />
                    <Carousel responsive={responsive} className="edit_plugin">
                      {livro &&
                        livro.games.map((livro) => {
                          return (
                            <>
                              <div
                                style={{
                                  height: "250px",
                                  background: "cover",
                                  backgroundImage:
                                    "url('http://lorempixel.com/800/800')",
                                  width: "70%",
                                  backgroundRepeat: "no-repeat",
                                  backgroundSize: "cover",
                                }}
                              >
                                {type == "publishing" && (
                                  <div
                                    style={{
                                      zIndex: 100,
                                      position: "absolute",
                                      left: "50%",
                                    }}
                                  >
                                    <i
                                      onClick={() => deleteGame(livro.id)}
                                      style={{ color: "white" }}
                                      class="fa fa-trash-o"
                                      aria-hidden="true"
                                    ></i>
                                    <i
                                      onClick={() => editGame(livro)}
                                      style={{
                                        color: "white",
                                        marginRight: "25px",
                                      }}
                                      class="fa fa-edit"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                )}
                              </div>
                              <Link to={`/product/${livro.id}`}>
                                <h1 style={{ color: "#ccc" }}>{livro.name}</h1>
                              </Link>
                            </>
                          );
                        })}
                    </Carousel>
                  </div>
                );
              }
            })}
        </div>
        {visable && (
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
                onClick={() => setVisable(false)}
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
                  <h1 style={{ fontSize: 30, fontWeight: 700 }}>cadastrar</h1>
                </div>
                <Form ref={formRef} onSubmit={handleSubmit} method="POST">
                  <label>Nome</label>
                  <InputStyled name="name" type="name" />
                  <textarea
                    style={{ background: "#433f41", width: "100%" }}
                    name="description"
                    type="description"
                    placeholder="descricao"
                    defaultValue={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                  <Submit type="submit" value="ENVIAR" />
                </Form>
              </FormStyled>
            </div>
          </div>
        )}
        {visableEdit && (
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
                onClick={() => setVisableEdit(false)}
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
                  <h1 style={{ fontSize: 30, fontWeight: 700 }}>Editar</h1>
                </div>
                <Form ref={formRef} onSubmit={handleEdit} method="POST">
                  <label>Nome</label>
                  <InputStyled
                    name="name"
                    type="name"
                    defaultValue={editData.name}
                  />
                  <textarea
                    style={{ background: "#433f41", width: "100%" }}
                    name="description"
                    type="description"
                    defaultValue={editData.description}
                    onChange={(e) => (editData.description = e.target.value)}
                  />
                  <Submit type="submit" value="Salvar" />
                </Form>
              </FormStyled>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Shop;
