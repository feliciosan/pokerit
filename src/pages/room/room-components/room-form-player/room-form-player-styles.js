import styled from 'styled-components';
import { Loading } from '../../../../styles/default/default';

export const FormJoinRoom = styled.form`
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

    @media (max-width: 600px) {
        padding: 20px;
        margin-top: 25px;
    }
`;
