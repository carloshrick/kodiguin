import React, { useEffect, useState } from 'react';
import styled from "styled-components/native";
import { View, Text, Pressable, ScrollView, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { Link as ExpoRouterLink } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

interface Redacao {
    id: string;
    titulo: string;
    texto: string;
}

export default function Home() {
    const [redacoes, setRedacoes] = useState<Redacao[]>([]);
    const router = useRouter();

    useFocusEffect(
        React.useCallback(() => {
            loadFromCache();
        }, [])
    );

    const params = useLocalSearchParams();

    const loadFromCache = async () => {
        try {
            const savedRedacoes = await AsyncStorage.getItem('redacoes');
            const parsedRedacoes: Redacao[] = savedRedacoes ? JSON.parse(savedRedacoes) : [];
            setRedacoes(parsedRedacoes);
        } catch (error) {
            console.error('Erro ao carregar do cache:', error);
        }
    };

    const removeRedacao = async (id: string) => {
        try {
            const existingRedacoes = await AsyncStorage.getItem('redacoes');
            const parsedRedacoes: Redacao[] = existingRedacoes ? JSON.parse(existingRedacoes) : [];

            const updatedRedacoes = parsedRedacoes.filter(redacao => redacao.id !== id);

            await AsyncStorage.setItem('redacoes', JSON.stringify(updatedRedacoes));
            
            Alert.alert('Excluído', 'Sua redação foi excluída com sucesso!');
            loadFromCache(); // Recarregar redações após exclusão
        } catch (error) {
            console.error('Erro ao excluir no cache:', error);
        }
    };

    const handleCardPress = (redacao: Redacao) => {
        router.push({
            pathname: '/visualizacao',
            params: {
                id: redacao.id,
                titulo: redacao.titulo,
                texto: redacao.texto
            }
        });
    };

    return (
        <ContainerBody>
            <Container>
                <Title>MINHAS</Title>
                <Title>REDAÇÕES</Title>

                <ScrollView>
                    {redacoes.length > 0 ? (
                        redacoes.map((redacao) => (
                            <Card key={redacao.id}>
                                <Pressable onPress={() => handleCardPress(redacao)}>
                                    <CardTitle>{redacao.titulo || 'Sem título'}</CardTitle>
                                    <CardText>{redacao.texto || 'Sem conteúdo disponível.'}</CardText>
                                </Pressable>
                                <Pressable onPress={() => removeRedacao(redacao.id)}>
                                    <Text>Remover Redação</Text>
                                </Pressable>
                            </Card>
                        ))
                    ) : (
                        <EmptyText>Nenhuma redação salva.</EmptyText>
                    )}
                </ScrollView>
            </Container>

            <Footer>
                <ButtonContainer href='/newRedacao'>
                    <Icone source={require('../../assets/mais.png')} /> 
                </ButtonContainer>

                <ButtonContainer href='/criarredacao'>
                    <Icone source={require('../../assets/editor-de-texto.png')} /> 
                </ButtonContainer>
            </Footer>
        </ContainerBody>
    );
}

// Estilos
const ContainerBody = styled.View`
    flex: 1;
    background-color: #F5F5F5;
    align-items: center;
`;

const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #18206f;
    margin-bottom: 8px;
`;

const Card = styled.View`
    background-color: #fff;
    border-radius: 10px;
    padding: 16px;
    margin-top: 20px;
    width: 90%;
    shadow-color: #000;
    shadow-opacity: 0.2;
    shadow-radius: 3px;
    shadow-offset: 0px 2px;
    elevation: 5;
    height: 150px;
    margin-bottom: 40px;
`;

const CardTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #18206f;
    margin-bottom: 10px;
`;

const CardText = styled.Text`
    font-size: 16px;
    color: #333;
    max-height: 80px;
`;

const EmptyText = styled.Text`
    font-size: 18px;
    color: #999;
    margin-top: 20px;
`;

const Container = styled.View`
    flex: 1;
    background-color: #F5F5F5;
    padding: 16px;
    align-items: center;
    margin-top: 40px;
`;

const Footer = styled.View`
    width: 100%;
    position: absolute;
    bottom: 0;
    flex-direction: row;
    justify-content: space-around;
    background-color: #18206f;
    align-items: center;
    height: 90px;
`;

const ButtonContainer = styled(ExpoRouterLink)`
    height: 80px;
    width: 80px;
    align-items: center;
    border-radius: 8px;
    justify-content: center;
    padding-left: 20px;
    margin-top: 20px;
`;

const Icone = styled.Image`
    border-radius: 8px;
    width: 30px;  
    height: 30px;
`;
