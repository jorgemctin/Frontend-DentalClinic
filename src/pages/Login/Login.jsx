import React, { useState, useEffect } from "react";
import "./Login.css";
import { InputText } from "../../common/InputText/InputText";
import { loginMe } from "../../services/apiCalls";
import { Card, Col, Container, Row, Form } from "react-bootstrap";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../userSlice";
import { ClinicButton } from "../../common/ClinicButton/ClinicButton";

export const Login = () => {

  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [userError, setUserError] = useState({});
  const navigate = useNavigate();

  //DISPATCH WRITE MODE
  const dispatch = useDispatch();

  //USESELECTOR READING MODE
  // const credentialsRdx = useSelector(userData);
  // const [welcome, setWelcome] = useState("");

  const [userLogin, setuserLogin] = useState({});

  //SENDING FORM LOGIN
  const submitHandler = (e, body) => {
    e.preventDefault();
    loginMe(body)
      .then((res) => {
        setToken(res.data.token);
        setuserLogin(res.data.user);
      })
      .catch((error) => {
        setUserError({ credentials: error.response.data.message });
      });
  };
  //USE DISPATCH 
  useEffect(() => {
    if (token) {
      let decoded = jwtDecode(token);
      dispatch(
        login({
          token: token,
          name: userLogin.name,
          role: decoded.roleId,
          userId: decoded.userId
        })
      );
      navigate("/");
    }
  }, [token, userLogin]);

  return (
    <div className="loginDesign">
      {/* {welcome !== "" ? (
        <div>{welcome}</div>
      ) : ( */}
      {/* La utilidad de la siguiente linea es renderizar un hook at tiempo real en el DOM */}
      {/* {<pre>{JSON.stringify(credentials, null, 2)}</pre>} */}
      <Container className="d-flex justify-content-center align-items-center mt-4">
        <Card style={{
          backgroundColor: 'rgba(64, 139, 209, 0.607)',
          borderRadius: '10em',
          boxShadow: 'rgba(0, 0, 0, 0.19) 0em 0.625em 1.25em, rgba(0, 0, 0, 0.23) 0em 0.375em 0.375em'
        }}>
          <Card.Title className="text-center mt-3 display-5"
            style={{
              textShadow: '0.05em 0.05em 0.06em rgba(0, 0, 0, 0.5)',
            }}>
            <strong>Iniciar sesión</strong></Card.Title>
          <Card.Body>
            <Row className="justify-content-center align-items-center">
              <Col xs={10} md={6}>
                <Form as={Row} className="d-flex justify-content-center">
                  <Form.Group className="mb-3">
                    <Form.Label><strong>Email:</strong></Form.Label>
                    <Col>
                      <InputText
                        type={"email"}
                        design={userError.emailError ? "errorInput" : ""}
                        name={"email"}
                        placeholder={"Enter email"}
                        state={setUser}
                        errorState={setUserError}
                      />
                      <div>{userError.emailError}</div>
                    </Col>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label><strong>Password:</strong></Form.Label>
                    <Col>
                      <InputText
                        type={"password"}
                        design={userError.passwordError ? "errorInput" : ""}
                        name={"password"}
                        placeholder={"Password"}
                        state={setUser}
                        errorState={setUserError}
                      />
                      <div>{userError.passwordError}</div>
                    </Col>
                  </Form.Group>
                  {userError?.credentials ? (
                    <div>{userError.credentials}</div>
                  ) : (
                    <div></div>
                  )}
                  <ClinicButton
                    // style={{ backgroundColor: '#13326fba' }}
                    text={'Aceptar'}
                    onClick={(e) => {
                      submitHandler(e, user);
                    }}
                  />
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};