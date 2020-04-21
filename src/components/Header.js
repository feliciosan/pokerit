import React, {useContext} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom'
import {AuthContext} from "../contexts/Auth"
import {Auth} from '../services/firebase'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    toolbar: {
        padding: 0
    },
    title: {
        flexGrow: 1,
        cursor: 'pointer'
    }
}))

const Header = () => {
    const history = useHistory()
    const classes = useStyles()
    const {currentUser} = useContext(AuthContext)

    const handleSignOut = () => {
        Auth.signOut().then(() => {
            localStorage.removeItem('user_id')
            history.push('/')
        })
    }

    const goTo = (path) => {
        history.push(path)
    }

    return (
        <div className={classes.root}>
            <AppBar
                position="static">
                <Container>
                    <Toolbar className={classes.toolbar}>
                        <Typography
                            onClick={() => goTo('/')}
                            variant="h6"
                            className={classes.title}>
                            POKER IT
                        </Typography>
                        {currentUser && (
                            <>
                                <Button
                                    onClick={() => goTo('/')}
                                    color="inherit">
                                    HOME
                                </Button>
                                <Button
                                    onClick={handleSignOut}
                                    color="inherit">
                                    SIGN OUT
                                </Button>
                            </>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

export default Header
