import { useState } from "react";
import { PressableProps } from "react-native";
import styled, { css } from "styled-components/native"

//Criando meu próprio tipo para as propriedades exclusivas do botao
export type FilterStyleProps = {
    isActive?: boolean
}
/* 
    Unindo o meu tipo personalizado e PressableProps que vem do proprio React
    essa sintaxe significa que: o tipo Props vai ser todas as propriedades de
    FilterStyleProps + todas as de PressableProps.
 */ 
type Props = PressableProps & FilterStyleProps & {
    title: string
}

/* 
    Lembre-se, sempre que vir ...rest sendo usado como parametro de um component
    react, significa que quem chamar esse componente pode passar, alem dos outros
    parametros que voce colocar, como qualquer outra coisa adicional
*/
export default function Filter({isActive=false, title, ...rest}: Props){

    return(
        <Container 
            isActive={isActive}
            {...rest} 
        >
            <Title>{title}</Title>
        </Container>
    )
}

/*
    Aqui a sintaxe esta um pouco mais avançada pois eu uso recursos de linguagem do JS(TS)
    pra deixa-la mais resumida.
    O código abaixo é simples: se for passado o parametro isActive como 'true' a borda
    vai ficar com a cor verde, se não ela não aparece.
    a sintaxe => isActive && css`` é uma abreviação em forma de if ternário de:
    if(isActive == true){
        css``
    }
*/
const Container = styled.Pressable<FilterStyleProps>`
    ${({theme, isActive}) => isActive && css`
        border: 1px solid ${theme.COLORS.GREEN_700};
    `};

    border-radius: 4px;
    margin-right: 12px;

    align-items: center;
    justify-content: center;

    padding: 10px;
`;

const Title = styled.Text`
    ${({theme}) => css`
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.MD}px;
        color: ${theme.COLORS.WHITE}
    `}
`;