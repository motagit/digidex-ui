import { Container } from '@mui/material';
import DigimonList from '../../DigimonList/DigimonList';

const Home = () => {
    
    return (
        <Container style={{maxWidth: 'none'}}>
            <DigimonList/>
        </Container>
    );
}

export default Home;