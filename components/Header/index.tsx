import theme from "@/theme"
import { NativeStackHeaderProps } from "@react-navigation/native-stack"
import { CaretLeft } from "phosphor-react-native"
import { Pressable, StatusBar } from "react-native"
import styled, { ThemeProvider } from "styled-components/native"

export default function Header(props: NativeStackHeaderProps){

    /*
        Essa função checa se é possivel voltar para uma tela anterior na 
        pilha (Stack) de telas, mas lembre-se que a decisão de qual tela pode navegar 
        para qual é totalmente sua:
        Se vc usar o push, sera possivel voltar, se usar o replace, não
    */
    const canGoBack = props.navigation.canGoBack();

    //Uma outra forma de criar uma função, nesse caso para voltar pra a pagina anterior
    /*
        Pode escrever da forma tradicional se quiser, não faz diferença
        function backScreen(){
            props.navigation.goBack()
        }
    */

    const backScreen = () => {
        props.navigation.goBack()
    }

    return(
        <ThemeProvider theme={theme}>
            {/* Caso seja possivel voltar */}
            <Container>
                { 
                    canGoBack ?
                    <Pressable style={{flex: 1}} onPress={backScreen}>
                        <BotaoVoltar />
                    </Pressable> 
                    : 
                    null
                }
                <Logo source={require('../../assets/bob.png')}/>
            </Container>
        </ThemeProvider>
    )
}

const Container = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: ${StatusBar.currentHeight}px;
    background-color: ${({theme}) => theme.COLORS.GRAY_500};
`
const Logo = styled.Image`
    height: 70px;
    width: 60px;
`
const BotaoVoltar = styled(CaretLeft)`
    size: 50px;
    color: white;
    align-items: center;
`