import { TextInputProps } from "react-native";
import styled from "styled-components/native";

/*
    {...rest}: O operador spread é usado novamente para aplicar todas as propriedades 
    recebidas pelo componente Input ao TextInput subjacente. 
    Isso significa que qualquer propriedade adicional passada para Input será passada 
    para meu campo de texto.
*/

export default function Input({...rest}: TextInputProps){
    return(
        <Container 
            placeholderTextColor={'#999'}
            {...rest}
        />
        
    )
}

const Container = styled.TextInput`
    flex: 1;
    min-height: 56px;
    max-height: 70px;
    margin-top: 10px;
    color: black;
    font-size: 27px;
    border-radius: 6px;
    padding: 16px;
    border-bottom-width: 2px;
    border-bottom-color: #18206f;
`