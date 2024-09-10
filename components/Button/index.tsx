import { Pressable, PressableProps } from "react-native";
import styled from "styled-components/native";

/*
    Nesse componente em especial eu quero ser mais pratico,
    quero criar um unico componente que seja um botao que mude:
    a ação que ele realiza e seu estilo com base na forma que eu chamo
    ele na tela.
    Pra isso eu vou criar um type, ou seja um tipo fabricado que 
    dependendo de qual eu escolher quando chamar esse componente
    na tela, ele assumirá uma ou outra aparencia.
*/

//Aqui eu crio meu tipo especial, quando chamar na tela, o programador deverá escolher 
//entre 'PRIMARY' ou 'SECONDARY' 
export type ButtonTypeStyleProps = 'PRIMARY' | 'SECONDARY';

//Esse Props será usado como parametro do styled component Botao
type PropsStyled = {
    type: ButtonTypeStyleProps
}

type PropsButton = PressableProps & {
    title: string;
    
    // ? significa opcional, ou seja eu não sou obrigado a passar
    type?: ButtonTypeStyleProps;
}

export default function Button({ title, type='PRIMARY', ...rest}: 
    PropsButton){
    return(
        <Botao type={type}{...rest}>
            <Title>{title}</Title>
        </Botao>
    )
}

const Botao = styled(Pressable)<PropsStyled>`
    flex: 1;

    min-height: 56px;
    max-height: 56px;

    background-color: ${({ theme, type }) => 
    type === 'PRIMARY' ? '#18206f' : '#FF56'};

    border-radius: 6px;

    justify-content: center;
    align-items: center;
`

const Title = styled.Text`
    font-size: 18px;
    color: white;
`
