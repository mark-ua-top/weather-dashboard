import React from 'react';
import styled from 'styled-components';

const DeleteButton = ({ onClick }) => {
    return (
        <StyledWrapper>
            <button className="delete-btn" onClick={onClick}>
                <svg
                    viewBox="0 0 15 17.5"
                    height="25"
                    width="25"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                >
                    <path
                        transform="translate(-2.5 -1.25)"
                        d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"
                    />
                </svg>
            </button>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .delete-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    width: 25px;
    height: 25px;
    position: relative;
    padding: 0;
  }

  .icon {
    width: 100%;
    height: 100%;
    fill: rgb(168, 7, 7);
    transition: transform 0.2s, fill 0.2s;
  }

  .delete-btn:hover .icon {
    transform: scale(1.3);
    fill: red;
  }

  .delete-btn::after {
    content: 'delete';
    position: absolute;
    top: -150%;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgb(168, 7, 7);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 10px;
    color: white;
    text-transform: uppercase;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s, top 0.2s;
  }

  .delete-btn:hover::after {
    opacity: 1;
    visibility: visible;
    top: -180%;
  }
`;

export default DeleteButton;