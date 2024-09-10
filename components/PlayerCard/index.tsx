import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import styled, { css } from "styled-components/native";
import ButtonIcon from "../ButtonIcon";

type Props = {
    name: string
}

export default function PlayerCard({name}: Props){
    return(<Container>
        <Icon name="person" />
        <Name>{name}</Name>
        <ButtonIcon 
            icon="close"
            type="SECONDARY"
        />
    </Container>)
}

const Container = styled.View`
    width: 100%;
    height: 56px;

    background-color: ${({ theme }) => theme.COLORS.GRAY_500};

    flex-direction: row;
    align-items: center;
`

const Name = styled.Text`
    flex: 1;
    ${({theme})=> css`
        font-size: ${theme.FONT_SIZE.MD}px;
        color: ${theme.COLORS.GRAY_200};
        font-family: ${theme.FONT_FAMILY.REGULAR};
    `}
`
const Icon = styled(MaterialIcons).attrs(({ theme }) => ({
    size: 24,
    color: theme.COLORS.GRAY_200
}))`
    margin-left: 16px;
    margin-right: 4px;
`