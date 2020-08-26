import styled from 'styled-components';
import { Select } from '../../../../global/styles/components';

export const CardList = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const CardItem = styled.div`
    flex: 1;
    padding: 0 10px 20px;
    display: flex;

    svg {
        color: #f2f2f2;
        font-size: 40px;
    }

    @media (max-width: 600px) {
        padding: 0 7.5px 15px;
    }
`;

export const CardButton = styled.div`
    flex: 1;
    width: 75px;
    height: 110px;
    background: linear-gradient(110deg, #6d37af 50%, #7741b9 50%);
    border-bottom: 3px solid #d4bd1b;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    strong {
        font-size: 26px;
        font-weight: 600;
        color: #f2f2f2;
    }
    :after {
        position: absolute;
        content: '';
        width: calc(100% - 15px);
        height: calc(100% - 15px);
        border: 1px solid #f2f2f2;
        border-radius: 4px;
    }
    :hover {
        opacity: 0.8;
    }

    @media (max-width: 600px) {
        width: 60px;
        height: 90px;
    }
`;

export const SelectBox = styled.div`
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 20px;
    ${Select} {
        background: white;
    }

    @media (max-width: 600px) {
        margin-bottom: 0;
        padding: 0 7.5px;
    }
`;
