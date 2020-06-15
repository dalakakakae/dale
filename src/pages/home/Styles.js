import styled from "styled-components";

const ContainerTaskInfo = styled.div`
  align-items: center;
`;


const TaskActive = styled.div`
  background: #ffffff;
  height: 130px;
  display: flex;
  padding: 10px;
  align-items: center;
  border-radius: 25px;
`;


const TaskContainer = styled.div`
  background: #EFF3F8;
  height: 130px;
  display: flex;
  padding: 10px;
  align-items: center;
  margin-left: 20px;
`;


const ContainerTask = styled.div`
  height: 60vh;
  background: #EFF3F8;
`;


const IconAdd = styled.i`
  margin-right: 20;
  color: #9954ff;
  font-size: 60;
`;

const ButtonAdd = styled.div`
  height: 15vh;
  background: #eff3f8;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextInfoBio = styled.p`
  color: #888888;
  font-size: 14px;
  font-weight: 600;
  margin: 0px;
`;

const InfoBio = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleBio = styled.span`
  width: 100%;
  color: #2d2c35;
  font-size: 50px;
  font-weight: 700;
  margin: 0px;
`;

const CotainerTitle = styled.div`
  height: 15vh;
`;

const ConatinerBio = styled.div`
  width: 40vw;
  height: 100vh;
  background: #ffffff;
  padding: 20px;
`;

const ConatinerImageBio = styled.div`
  height: 25vh;
  margin-top: 45;
`;

const TextBio = styled.p`
  color: #888888;
  font-size: 16px;
  font-weight: 500;
`;

const ContainerBio = styled.div`
  height: 100%;
  margin-top: 45px;
`;

const ContainerSeqBio = styled.div`
    @media (max-width: 1409px) {
        display: hidden;
    }
`;

const ImgBio = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;

const IconsSlected = styled.i`
  margin-right: 20px;
  color: #888888;
  font-size: 18px;
`;

const TittleTask = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: black;
  padding: 0px;
  margin: 0px;
`;

const TextTask = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: #888888;
  padding: 0px;
  margin: 0px;
`;

const ContainerTextSelected = styled.div`
  display: flex;
  align-items: center;
`;

const TextSelected = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: #888888;
  padding: 0px;
  margin: 0px;
`;

const ContainerSelected = styled.div`
  background: #eff3f8;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const Hr = styled.hr`
  margin: 0;
`;

const IconClose = styled.i`
  margin-right: 20px;
  color: #888888;
`;

const ContainerSlect = styled.div`
  display: flex;
  align-items: center;
`;

const IconFilter = styled.i`
  margin-right: 20px;
  color: #888888;
`;

const TextFilter = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: #888888;
  padding: 0px;
  margin: 0px;
`;

const ContainerFilter = styled.div`
  background: #eff3f8;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const TittleCenter = styled.p`
  font-size: 20px;
  font-weight: 800;
  color: black;
`;

export const Container = styled.div`
  width: 50vw;
  height: 100vh;
  background: #eff3f8;
`;

export const ContainerCenter = styled.div`
    height: 25vh, 
    background: EFF3F8, 
    padding: 30
`;

export const App = styled.div`
    display: flex;
    width: 100vw;
    alignContent: center;
`;

export const ContainerSideBar = styled.div`
    width: 15vw;
    height: 100vh;
    background: #EFF3F8;

    @media (max-width: 1557) {
        width: 17vw;
    }
    @media (max-width: 1557px) {
        width: 19vw;
    }
    @media (max-width: 1310px) {
        width: 23vw;
    }
    @media (max-width: 1310px) {
        width: 25vw;
    }
`;

