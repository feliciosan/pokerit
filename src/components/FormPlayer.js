import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Button, Input, FormTitle, FormGroup } from '../styles/forms';
import { Loading } from '../styles/components';

const FormJoinRoom = styled.form`
    max-width: 450px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    padding: 40px;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 5px 30px 5px #efefef;
    ${Loading} {
        margin-bottom: 30px;
    }
`;

const FormPlayer = ({ submit, formIsLoading }) => {
    return (
        <FormJoinRoom onSubmit={submit}>
            {formIsLoading ? <Loading /> : <FormTitle>Player name</FormTitle>}
            <FormGroup>
                <Input
                    name="name"
                    type="text"
                    placeholder="Name"
                    disabled={formIsLoading}
                    required
                />
            </FormGroup>
            <Button type="submit" color="purple" disabled={formIsLoading}>
                Join
            </Button>
        </FormJoinRoom>
    );
};

FormPlayer.propTypes = {
    submit: PropTypes.func.isRequired,
    formIsLoading: PropTypes.bool.isRequired,
};

export default FormPlayer;
