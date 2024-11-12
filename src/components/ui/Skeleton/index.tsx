import styled from "styled-components";

const Skeleton = styled.div<{ $width?: string, $height?: string, $rounded?: string }>`
    width: ${({ $width }) => $width ? $width : 'auto'};
    height: ${({ $height}) => $height ? $height : '8px'};
    background-color: #c0c0c0;
    border-radius: ${({ $rounded}) => $rounded ? $rounded : '8px'};
    margin-bottom: 16px;
    padding: .5rem;
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: space-between;
    animation: loading 1s infinite;
    @keyframes loading {
        0% {
        opacity: 0.5;
        }
        50% {
        opacity: 1;
        }
        100% {
        opacity: 0.5;
        }
    }
`;

export default Skeleton;