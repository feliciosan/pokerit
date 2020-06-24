import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

import { Container } from '../styles/components';
import { AuthContext } from '../contexts/Auth';
import { Auth } from '../services/firebase';
import { Button } from '../styles/forms';

const HeaderBar = styled.div`
    width: 100%;
    border-bottom: 4px solid;
    border-color: ${(props) =>
        ['signin', 'signup', 'recover-password'].includes(props.currentRoute)
            ? 'transparent'
            : '#d4bd1b'};
    background: ${(props) =>
        ['signin', 'signup', 'recover-password'].includes(props.currentRoute)
            ? 'transparent'
            : '#6d37af'};
`;

const HeaderContent = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #ffffff;
`;

const HeaderLogo = styled.span`
    background: #f2f2f2;
    color: #823dd5;
    padding: 5px 10px;
    font-weight: 600;
    border-radius: 4px;
    height: 32px;
    display: block;
`;

const HeaderMenu = styled.ul`
    > li {
        display: inline-block;
        margin-left: 10px;
        > a {
            cursor: pointer;
            font-weight: 600;
            color: #f2f2f2;
            :hover {
                opacity: 0.8;
            }
        }
    }
`;

const Header = ({ currentRoute }) => {
    const history = useHistory();
    const { loggedUser } = useContext(AuthContext);

    const handleSignOut = () => {
        Auth.signOut().then(() => {
            localStorage.removeItem('user_id');

            if (loggedUser) {
                history.push('/signin');
            }
        });
    };

    return (
        <HeaderBar currentRoute={currentRoute}>
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
                                        color="purple"
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

Header.propTypes = {
    currentRoute: PropTypes.string.isRequired,
};

export default Header;
