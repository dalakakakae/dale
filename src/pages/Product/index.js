import React, { useEffect, useState } from "react";
import { useMutation, gql, useSubscription } from "@apollo/client";
import styled from "styled-components";
import { PageHeader, Descriptions, Col, Rate } from "antd";
import { Link } from "react-router-dom";

const PLANET = gql`
  subscription MyQuery($id: uuid!) {
    games(where: { id: { _eq: $id } }) {
      name
      rate
      id
      description
      category {
        name
      }
      user {
        name
      }
      comments {
        comment
        name
      }
    }
  }
`;

const create_commet = gql`
  mutation MyMutation($commet: String!, $name: String!, $uuid: uuid!) {
    insert_comments(
      objects: { name: $name, game_uuid: $uuid, comment: $commet }
    ) {
      returning {
        name
      }
    }
  }
`;

export const Icon = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  padding: 5px;
  color: white;
`;

export const LiveContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  margintop: auto;

  .question {
    width: 100%;
    height: 100%;
    background: #433f41;
    padding: 20px;
    overflow: scroll;
    color: #fff;

    h2 {
      text-transform: uppercase;
      font-size: 18px;
    }

    textarea {
      border: 1px solid #979797;
      color: #979797;
      background: transparent;
      width: 100%;
      height: 120px;
      padding: 10px;
      margin-top: 10px;
    }

    button {
      width: 100%;
      height: 40px;
      background: #e60605;
      color: #fff;
      border: none;
      margin-top: 10px;
      margin-bottom: 20px;
      cursor: pointer;
    }

    ul {
      list-style: none;

      li {
        border-bottom: 1px solid #979797;
        padding: 10px 0;
      }
    }
  }

  img {
    width: 100%;
  }

  @media (max-width: 768px) {
    display: inline-block;

    .vimeo_player {
      width: 100%;
      height: 100%;

      iframe {
        width: 100%;
        height: 100%;
        border: none;
      }
    }

    .question {
      width: 100%;
      height: 100%;
      background: #433f41;
      padding: 20px;
      overflow: scroll;
      color: #fff;

      h2 {
        text-transform: uppercase;
        font-size: 18px;
      }

      textarea {
        border: 1px solid #979797;
        color: #979797;
        background: transparent;
        width: 100%;
        height: 120px;
        padding: 10px;
        margin-top: 10px;
      }

      button {
        width: 100%;
        height: 40px;
        background: #e60605;
        color: #fff;
        border: none;
        margin-top: 10px;
        margin-bottom: 20px;
        cursor: pointer;
      }

      ul {
        list-style: none;

        li {
          border-bottom: 1px solid #979797;
          padding: 10px 0;
        }
      }
    }
  }
`;

const Product = ({
  match: {
    params: { id },
  },
}) => {
  const { data } = useSubscription(PLANET, {
    variables: { id },
  });
  const [addReview] = useMutation(create_commet);
  const [question, setQuestion] = useState();

  async function addCommet(id) {
    var retrievedObject = localStorage.getItem("@raizs/user");
    const user = JSON.parse(retrievedObject);
    addReview({
      variables: { commet: question, name: user.name, uuid: data.games[0].id },
    })
      .then(() => {})
      .catch((e) => {});
  }
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",

          alignItems: "center",
        }}
      >
        <div style={{ height: "90vh", width: "80vw" }}>
          <div
            style={{
              width: "100%",
              height: "45%",
              background: "#433f41",
              display: "flex",
            }}
          >
            <Link to={`/shop`}>
              <Icon>
                <i class="fa fa-arrow-left" aria-hidden="true"></i>
              </Icon>
            </Link>
            <div
              style={{
                width: "30%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                style={{ width: "50%", height: "70%" }}
                src="http://lorempixel.com/800/800"
                alt=""
              />
            </div>
            <div
              style={{
                width: "70%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ width: "100%", height: "70%" }}>
                <div
                  className="site-page-header-ghost-wrapper"
                  style={{ backgroundColor: "#433f41" }}
                >
                  <PageHeader
                    ghost={false}
                    style={{ backgroundColor: "#433f41" }}
                    title={data && data.games[0].name}
                    extra={[<Rate allowHalf defaultValue={3} />]}
                  >
                    <Descriptions size="small" column={3}>
                      <Col span={10} style={{ textOverflow: "ellipsis" }}>
                        {data && data.games[0].description}
                      </Col>
                      <Descriptions.Item label="produtor">
                        <a>{data && data.games[0].user.name}</a>
                      </Descriptions.Item>
                      <Descriptions.Item label="categoria">
                        {data && data.games[0].category.name}
                      </Descriptions.Item>
                    </Descriptions>
                  </PageHeader>
                </div>
              </div>
            </div>
          </div>
          <LiveContainer>
            <div className="question">
              <h2>Comentarios</h2>
              <textarea
                placeholder="Digite aqui a sua comentario"
                onChange={(e) => setQuestion(e.target.value)}
                value={question}
              />
              <button onClick={() => addCommet()}>ENVIAR</button>
              <b>Comentarios</b>
              <ul>
                {data &&
                  data.games[0].comments.map((q) => <li>{q.comment}</li>)}
              </ul>
            </div>
          </LiveContainer>
        </div>
      </div>
    </>
  );
};

export default Product;
