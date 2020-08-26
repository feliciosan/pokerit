import styled from 'styled-components';
import { Loading } from '../../global/styles/components';

export const PageHeaderForm = styled.form`
    display: flex;
    width: 330px;
    input {
        flex: 2.5;
    }
    button {
        flex: 0.5;
        margin-left: 15px;
    }

    @media (max-width: 600px) {
        width: 100%;
        margin-top: 5px;
    }
`;

export const PageContent = styled.div`
    padding: 15px;
    background: #f7f7f7;
    border-radius: 4px;
    margin-top: 25px;
    ${Loading} {
        margin-top: 40px;
        margin-bottom: 40px;
    }

    @media (max-width: 600px) {
        padding: 7.5px;
    }
`;

export const RoomList = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const RoomItem = styled.div`
    width: 20%;
    padding: 15px;
    float: left;

    @media (max-width: 600px) {
        width: 50%;
        padding: 7.5px;
    }
`;

export const RemoveItem = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;
    font-size: 22px;
    display: flex;
    display: none;
    :hover {
        color: #d4bd1b;
    }
`;

export const RoomItemContent = styled.div`
    padding: 30px 25px;
    background: linear-gradient(110deg, #6d37af 50%, #7741b9 50%);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    border-bottom: 4px solid #d4bd1b;
    :hover {
        opacity: 0.9;
        ${RemoveItem} {
            display: block;
        }
    }
`;

export const RoomItemAvatar = styled.div`
    height: 25px;
    padding: 20px 0 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    span {
        font-weight: 600;
        font-size: 38px;
        color: white;
    }
`;

export const RoomItemText = styled.p`
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
`;

export const NoResults = styled.div`
    text-align: center;
    width: 100%;
    label {
        display: block;
        color: #ababab;
    }
`;
