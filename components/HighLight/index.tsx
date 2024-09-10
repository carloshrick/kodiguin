import styled from "styled-components/native"

type Props = {
    title?: string,
    subtitle: string
}

export default function HighLight({ title='Default', subtitle }: Props)
{
    return(
        <Container>
            <Title>{title}</Title>
            <SubTitle>{subtitle}</SubTitle>
        </Container>
    )
}

const Container = styled.View`
    width: 100%;
    margin: 32px 0px;
`

const Title = styled.Text`
    text-align: center;
    font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
    font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
    color: ${({ theme }) => theme.COLORS.WHITE};
`

const SubTitle = styled.Text`
    text-align: center;
    font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
    color: ${({ theme }) => theme.COLORS.GRAY_300};
`