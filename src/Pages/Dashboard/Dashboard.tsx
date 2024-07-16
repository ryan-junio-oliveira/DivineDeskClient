import Sidebar from '../../Components/Dashboard/SideBar';
import { Container } from 'react-bootstrap';

const Dashboard = () => {

  return (
    <div className="d-flex">
      <Sidebar />
      <Container className="flex-grow-1">
      </Container>
    </div>
  );
};

export default Dashboard;