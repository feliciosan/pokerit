import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';

import { Auth } from '../services/firebase';
import { AuthContext } from '../contexts/Auth';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter, Redirect, Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    marginTop: {
        marginTop: theme.spacing(2),
    },
    marginBottom: {
        marginBottom: theme.spacing(2),
    },
}));

const Login = () => {
    const classes = useStyles();
    const { currentUser } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (event) => {
        const { email, password } = event.target.elements;

        event.preventDefault();
        setIsLoading(true);

        Auth.signInWithEmailAndPassword(email.value, password.value).catch(
            (error) => {
                setError(error.message);
                setIsLoading(false);
            }
        );
    };

    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <>
            <Box height="4px">
                {isLoading && <LinearProgress color="primary" />}
            </Box>

            <Container maxWidth="xs">
                <Box
                    marginTop={5}
                    padding={3}
                    borderRadius={5}
                    border={1}
                    borderColor="grey.300"
                >
                    {error && (
                        <Alert
                            severity="error"
                            className={classes.marginBottom}
                        >
                            {error}
                        </Alert>
                    )}

                    <Typography variant="h5" color="primary">
                        Login
                    </Typography>

                    <form onSubmit={handleLogin}>
                        <TextField
                            name="email"
                            label="Email"
                            variant="outlined"
                            type="email"
                            className={classes.marginTop}
                            required
                            disabled={isLoading}
                            fullWidth
                        />
                        <TextField
                            name="password"
                            type="password"
                            label="Password"
                            variant="outlined"
                            fullWidth
                            required
                            disabled={isLoading}
                            className={classes.marginTop}
                        />
                        <Button
                            type="submit"
                            size="large"
                            variant="contained"
                            color="primary"
                            fullWidth
                            required
                            disabled={isLoading}
                            className={classes.marginTop}
                        >
                            Login
                        </Button>
                    </form>
                    <Link to="/signup">
                        <Typography
                            variant="body2"
                            display="block"
                            color="primary"
                            fontWeight="fontWeightBold"
                            className={classes.marginTop}
                        >
                            Don&apos;t have an account?
                        </Typography>
                    </Link>
                </Box>
            </Container>
        </>
    );
};

export default withRouter(Login);
