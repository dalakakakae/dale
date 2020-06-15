import styled from 'styled-components'
import Input from '../Input/index.tsx'

export const Container = styled.div`
  height: 90vh;
  width: 90vw;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
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

