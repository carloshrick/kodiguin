import { nanoid } from 'nanoid';
import React, { useState, useEffect } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Pressable, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Input from '@/components/Input';
import InputRedacao from '@/components/InputRedacao';
import { useRouter, useLocalSearchParams, Link as ExpoRouterLink } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Redacao {
    id: string;
    titulo: string;
    texto: string;
}

export default function NovoModelo() {
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [height, setHeight] = useState(30);
    const [isEditing, setIsEditing] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [texto, setTexto] = useState('');
    const router = useRouter();
    const params = useLocalSearchParams();

    useEffect(() => {
        const initialTitulo = Array.isArray(params.modeloTitulo) ? params.modeloTitulo[0] : params.modeloTitulo || '';
        const initialTexto = Array.isArray(params.modeloTexto) ? params.modeloTexto[0] : params.modeloTexto || '';
        setTitulo(initialTitulo);
        setTexto(initialTexto);
    }, []);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const handleTextChange = (text: string) => {
        if (text.length <= 2000) {
            setTexto(text);
        }
        if (text.length === 2000) {
            Alert.alert('Atenção', 'Você atingiu 2000 caracteres! Aproximadamente 30 linhas');
        }
    };

    const handleTituloChange = (newTitulo: string) => {
        setTitulo(newTitulo);
    };

    const generateUniqueId = () => {
        return Math.random().toString(36).substr(2, 9); // Gera uma string aleatória de 9 caracteres
    };

    const saveToCache = async () => {
        try {
            console.log('Tentando salvar no cache...');
            const existingRedacoes = await AsyncStorage.getItem('redacoes');
            console.log('Redações existentes:', existingRedacoes);
            
            const parsedRedacoes: Redacao[] = existingRedacoes ? JSON.parse(existingRedacoes) : [];
            console.log('Redações parseadas:', parsedRedacoes);

            const novaRedacao: Redacao = {
                id: generateUniqueId(), // Gera um ID único
                titulo,
                texto
            };

            console.log('Nova redação:', novaRedacao);

            const updatedRedacoes = [...parsedRedacoes, novaRedacao];
            console.log('Redações atualizadas:', updatedRedacoes);

            await AsyncStorage.setItem('redacoes', JSON.stringify(updatedRedacoes));
            
            Alert.alert('Salvo', 'Sua redação foi salva com sucesso!');
            router.push('/'); // Volte para a tela inicial
        }
        
        catch(erro){
            console.log('erro')
        }
    };
    
    const handleEditClick = () => {
        if (isEditing) {
            saveToCache(); 
        }
        setIsEditing(!isEditing);
    };
    
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ContainerBody>
                <Pressable style={estilo.botaosalvar} onPress={handleEditClick}>
                    <Text style={{ color: '#fff' }}>{isEditing ? 'Salvar' : 'Editar'}</Text>
                </Pressable>

                <Container>
                    {isEditing ? (
                        <>
                            <Input 
                                style={{ marginTop: -90 }} 
                                placeholder="Título" 
                                value={titulo}
                                onChangeText={handleTituloChange}
                            />
                            <InputRedacao 
                                placeholder="Escreva sua redação..."
                                multiline={true}
                                style={{ height, borderWidth: 1, padding: 10, marginBottom: 60 }}
                                onChangeText={handleTextChange}
                                value={texto}
                                onContentSizeChange={(event) => {
                                    setHeight(event.nativeEvent.contentSize.height);
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

                {!keyboardVisible && (
                    <Footer>
                        <ButtonContainer href='/(groups)'>
                            <Icone source={require('../../assets/botao-de-inicio.png')} /> 
                        </ButtonContainer>
                        <ButtonContainer href='/(groups)'>
                            <Icone source={require('../../assets/editor-de-texto.png')} /> 
                        </ButtonContainer>
                    </Footer>
                )}
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
