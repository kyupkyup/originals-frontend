import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
    ${reset};
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap');

    * {
        box-sizing:border-box;
    }
    body{
        background-color:${props => props.theme.ligthGray5};
        color:${props => props.theme.blackColor};
        font-size:14pt;
        font-family: 'Open Sans',  'sans-serif';
    }
    a {
        color:${props => props.theme.blueColor};
        text-decoration:none;
    }
    input:focus{
        outline:none;
    }
`;
