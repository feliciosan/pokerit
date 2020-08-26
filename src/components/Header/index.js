import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../global/contexts/Auth';
import { Button, Container } from '../../global/styles/components';
import { HeaderBar, HeaderContent, HeaderLogo, HeaderMenu } from './styles';
import useAuth from '../../services/useAuth';

const Header = () => {
    const history = useHistory();
    const { loggedUser } = useContext(AuthContext);

    const handleSignOut = async () => {
        try {
            await useAuth.signOut();

            localStorage.removeItem('user_id');
            history.push('/signin');
        } catch (error) {
            //Error handler popup msg
        }
    };

    return (
        <HeaderBar>
            <Container>
                <HeaderContent>
                    <div>
                        <Link to="/">
                            <HeaderLogo>POKER IT</HeaderLogo>
                        </Link>
                    </div>
                    <div>
                        {loggedUser && (
                            <HeaderMenu>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Button
                                        color="lightPurple"
                                        small
                                        onClick={handleSignOut}
                                    >
                                        Sign Out
                                    </Button>
                                </li>
                            </HeaderMenu>
                        )}
                    </div>
                </HeaderContent>
            </Container>
        </HeaderBar>
    );
};

export default Header;
