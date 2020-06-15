import styled from 'styled-components'
import Input from '../Input/index.tsx'

export const Container = styled.div`
  height: 100vh;

  .logo {
    position: absolute;
    top: 30px;
    left: 10%;
  }

  .background {
    height: 100%;
  }

  @media (min-width: 768px) {
    .logo {
        display: none;
    }

  @media (max-width: 768px) {
    height: 100vh;
    width: 100vw;

    .logo {
      position: absolute;
      top: 30px;
      left: 10%;
    }
    .background {
      height: 45vh;
      width: 100vw;
    }
    overflow: hidden;
  }
`

export const Title = styled.div`
  top: 60px;
  left: 37%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  img {
    margin-right: 20px;
  }

  h1 {
    font-weight: 600;
    font-size: 45px;
    color: white;
  }

  @media (max-width: 768px) {
    position: absolute;
    top: 190px;
    left: 4%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;

    img {
      margin-right: 20px;
    }

    h1 {
      font-weight: 600;
      font-size: 25px;
    }
  }
`

export const FormStyled = styled.div`
  width: 300px;
`

export const InputStyled = styled(Input)`
  width: 100%;
  margin-bottom: 20px;
  background: rgba(224, 231, 255, 0.1);
  border: 1px solid #7d7d7d;
  height: 40px;
  padding: 0 10px;
  color: white;
`

export const PannelRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo_form{
    width: 25%;
    height: 25%;
  }

  label {
    color: white;
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 15px;
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;
    height: 100vh;
    padding-top: 100px;
    width: 100vw;

    .logo_form {
      display: none;
    }

    label {
      color: white;
      font-size: 12px;
      font-weight: bold;
      margin-bottom: 15px;
      text-transform: uppercase;
    }
  }
`

export const Submit = styled.input`
  width: 100%;
  height: 52px;
  padding: 0 10px;
  color: white;
  background: #e60605;
  border: none;
  font-weight: bold;
  cursor: pointer;

  :hover {
    opacity: 0.7;
    transition: linear 0.2s;
  }
`
