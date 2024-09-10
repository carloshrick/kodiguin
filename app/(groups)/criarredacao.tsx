import React, { useState, useEffect } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Pressable, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '@/components/Input';
import InputRedacao from '@/components/InputRedacao';
import { useRouter, useLocalSearchParams, Link as ExpoRouterLink } from 'expo-router';
import { nanoid } from 'nanoid';

export default function NovoModelo() {
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [height, setHeight] = useState(30);
    const [titulo, setTitulo] = useState<string>('');
    const [texto, setTexto] = useState<string>('');
    const router = useRouter();
    const { modeloTexto, modeloTitulo } = useLocalSearchParams();

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

    useEffect(() => {
        if (modeloTitulo && modeloTexto) {
            setTitulo(Array.isArray(modeloTitulo) ? modeloTitulo[0] : modeloTitulo);
            setTexto(Array.isArray(modeloTexto) ? modeloTexto[0] : modeloTexto);
        }
    }, [modeloTitulo, modeloTexto]);

    const handleTextChange = (text: string) => {
        setTexto(text);
        if (text.length === 2000) {
            Alert.alert('Atenção', 'Você atingiu 2000 caracteres! Aproximadamente 30 linhas');
        }
    };

    const generateUniqueId = () => {
        return Math.random().toString(36).substr(2, 9); // Gera uma string aleatória de 9 caracteres
    };

    const handleEditClick = async () => {
        try {
            console.log('Tentando salvar a redação...');
            const existingData = await AsyncStorage.getItem('redacoes');
            console.log('Dados existentes:', existingData);

            const redacoes = existingData ? JSON.parse(existingData) : [];
            const uniqueId = generateUniqueId();

            redacoes.push({ id: uniqueId, titulo, texto });

            await AsyncStorage.setItem('redacoes', JSON.stringify(redacoes));
            Alert.alert('Salvo', 'Sua redação foi salva com sucesso!');
            router.push('/(groups)');
        } catch (error) {
            console.error('Erro ao salvar a redação:', error);
            Alert.alert('Erro', 'Houve um erro ao salvar sua redação.');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ContainerBody>
                <Pressable style={estilo.botaosalvar} onPress={handleEditClick}>
                    <Text style={{ color: '#fff' }}>Salvar</Text>
                </Pressable>
                <Container>
                    <Input 
                        style={{ marginTop: -90 }} 
                        placeholder="Título" 
                        value={titulo}
                        onChangeText={setTitulo}
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
