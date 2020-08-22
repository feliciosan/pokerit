import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledFormInputError = styled.div`
    position: absolute;
    bottom: -10px;
    right: 10px;
    font-size: 14px;
    background-color: #f2f2f2;
    padding: 0 5px;
    color: #da5a5a;
`;

const MemoizedFormInputError = ({ touched, error }) => {
    return touched && error ? (
        <StyledFormInputError>{error}</StyledFormInputError>
    ) : (
        <></>
    );
};

MemoizedFormInputError.propTypes = {
    touched: PropTypes.bool,
    error: PropTypes.string,
};

export const FormInputError = memo(MemoizedFormInputError);
