import { PressableProps } from "react-native"
import { MaterialIcons } from '@expo/vector-icons'
import styled from "styled-components/native"

export type ButtonIconTypeStyleProps = 'PRIMARY' | 'SECONDARY'

type Props = {
    type: ButtonIconTypeStyleProps
}

type PropsButtonIcons = PressableProps & {
    /*
        Como o MaterialIcons é uma lib externa ao expo, suas propriedades e tipo
        não são passados diretamente pelo sistema, ao inves disso, fazemos um
        mapeamento da biblioteca.
    */

    icon: keyof typeof MaterialIcons.glyphMap
    type?: ButtonIconTypeStyleProps
}

export default function ButtonIcon({icon, type='PRIMARY', ...rest}: PropsButtonIcons){
    return(
        <Container {...rest}>
            <Icon name={icon} type={type} />
        </Container>
    )
}

const Container = styled.Pressable`
    width: 40px;
    height: 56px;

    justify-content: center;
    align-items: center;

    margin-left: 8px;
`
// Assim eu acesso diretamente os atributos do icone que vem de MaterialIcons
const Icon = styled(MaterialIcons).attrs<Props>(({theme, type}) => ({
    size: 24,
    color: type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED
}))``;