import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import styled from 'styled-components/native';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputRedacao from '@/components/InputRedacao';
import Input from '@/components/Input';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface Redacao {
    id: string;
    titulo: string;
    texto: string;
}

export default function Visualizacao() {
    const [isEditing, setIsEditing] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [texto, setTexto] = useState('');
    const [height, setHeight] = useState(30);
    const params = useLocalSearchParams();
    const router = useRouter();

    useEffect(() => {
        const initialTitulo = params.titulo as string || '';
        const initialTexto = params.texto as string || '';
        setTitulo(initialTitulo);
        setTexto(initialTexto);
    }, []);

    const handleTextChange = (text: string) => {
        if (text.length <= 2000) {
            setTexto(text);
        }
        if (text.length === 2000) {
            Alert.alert('Atenção', 'Você atingiu 2000 caracteres! Aproximadamente 30 linhas');
        }
    };

    const saveToCache = async () => {
        try {
            const existingRedacoes = await AsyncStorage.getItem('redacoes');
            const parsedRedacoes: Redacao[] = existingRedacoes ? JSON.parse(existingRedacoes) : [];
            const { id } = params; // Supondo que 'id' esteja sendo passado nos parâmetros
    
            const updatedRedacoes = parsedRedacoes.map(redacao => {
                if (redacao.id === id) {
                    return { ...redacao, titulo, texto };
                }
                return redacao;
            });
    
            await AsyncStorage.setItem('redacoes', JSON.stringify(updatedRedacoes));
            
            Alert.alert('Salvo', 'Sua redação foi salva com sucesso!');
            setIsEditing(false);
            router.push('/(groups)');
        } catch (error) {
            console.error('Erro ao salvar no cache:', error);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ContainerBody>
                <Pressable 
                    style={estilo.botaosalvar} 
                    onPress={() => {
                        if (isEditing) {
                            saveToCache(); 
                        } else {
                            setIsEditing(true);
                        }
                    }}
                >
                    <Text style={{ color: '#fff' }}>{isEditing ? 'Salvar' : 'Editar'}</Text>
                </Pressable>

                <Container>
                    {isEditing ? (
                        <>
                            <Input
                                placeholder="Título" 
                                value={titulo}
                                onChangeText={setTitulo}
                            />
                            <InputRedacao 
                                placeholder="Escreva sua redação..."
                                multiline={true}
                                style={{ height: Math.max(height, 30), borderWidth: 1, padding: 10, marginBottom: 60 }}
                                onChangeText={handleTextChange}
                                value={texto}
                                onContentSizeChange={(event) => {
                                    const newHeight = event.nativeEvent.contentSize.height;
                                    // Atualiza o height apenas se for necessário
                                    if (Math.abs(height - newHeight) > 1) {
                                        setHeight(newHeight);
                                    }
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <TituloTexto>{titulo || 'Sem título'}</TituloTexto>
                            <Texto>{texto || 'Escreva sua redação...'}</Texto>
                        </>
                    )}
                </Container>

                <Footer>
                    <ButtonContainer href='/(groups)'>
                        <Icone source={require('../../assets/botao-de-inicio.png')} /> 
                    </ButtonContainer>
                    <ButtonContainer href='/(groups)'>
                        <Icone source={require('../../assets/editor-de-texto.png')} /> 
                    </ButtonContainer>
                </Footer>
            </ContainerBody>
        </KeyboardAvoidingView>
    );
}

// Styled components
const ContainerBody = styled.View`
    flex: 1;
    background-color: #F5F5F5;
`;

const Container = styled.View`
    flex: 1;
    background-color: #F5F5F5;
    padding: 16px;
    margin-top: 130px;
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

const ButtonContainer = styled(Link)`
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

const estilo = StyleSheet.create({
    botaosalvar: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: '#18206f', 
        paddingBottom: 13,
        paddingTop: 13,
        width: 80,
        alignItems: 'center',
        borderRadius: 10,
        zIndex: 10,
    }
});

const TituloTexto = styled.Text`
    font-size: 24px;
    font-weight: bold;
    margin-top: -90px;
    margin-bottom: 20px;
`;

const Texto = styled.Text`
    font-size: 18px;
    padding: 10px;
    border-width: 1px;
    border-color: #ccc;
    border-radius: 10px;
    background-color: #fff;
`;
