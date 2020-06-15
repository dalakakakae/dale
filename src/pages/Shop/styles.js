import styled from 'styled-components'
import Input from '../Input/index.tsx'

export const Container = styled.div`
  width: 60%;
  margin: 0 auto;

.edit_plugin {
  height: 350px;
  width: auto;
}`

export const Product = styled.div`
  height: 240px;
  width: 130px;
  margin-left: 30px
`

export const Button = styled.button`
  border: none;
  width: 100%;
  margin-right: 25px;
  height: 20%;
  background: #e60605;
  color: white;
  cursor: pointer;
  fixed: bottom;

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

export const Title = styled.p`
  color: white;
  height: 40px;
`

export const Submit = styled.input`
  width: 100%;
  height: 52px;
  padding: 0 10px;
  color: white;
  background: black;
  border: none;
  font-weight: bold;
  cursor: pointer;

  :hover {
    opacity: 0.7;
    transition: linear 0.2s;
  }
`