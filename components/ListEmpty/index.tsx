import styled from "styled-components/native"

type Props = {
    message: string
}

export default function ListEmpty({ message }: Props){
    return(
        <Container>
            <Message>{message}</Message>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const Message = styled.Text`
    text-align: center;
    font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
    color: ${({ theme }) => theme.COLORS.GRAY_300}
`