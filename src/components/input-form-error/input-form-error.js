import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { StyledFormInputError } from './input-form-error-styles';

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
