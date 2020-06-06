import React, { useState, useEffect, useReducer, useRef } from 'react';
import { View, ImageBackground, Image, StyleSheet, Text, Button, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, Animated, Keyboard } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();
    const [uf, setUf] = useState('');
    const [city, setCity] = useState('');
    const descriptionOpacity = useRef(new Animated.Value(100)).current;
    const titleMarginTop = useRef(new Animated.Value(64)).current;


    useEffect(() => {
        Keyboard.addListener('keyboardWillShow', event => {

            Animated.parallel([
                Animated.timing(titleMarginTop, {
                    duration: event.duration,
                    toValue: 20,
                }),
                Animated.timing(descriptionOpacity, {
                    duration: event.duration,
                    toValue: 0,
                })
            ]).start();
        });

    }, []);

    useEffect(() => {
        Keyboard.addListener('keyboardWillHide', event => {
            Animated.timing(descriptionOpacity, {
                duration: event.duration,
                toValue: 100,
            }).start();
            Animated.timing(descriptionOpacity, {
                duration: event.duration,
                toValue: 100,
            }).start();
        });
    }, []);


    function handleNavigateToPoints() {
        navigation.navigate('Points', {
            uf,
            city
        });
    }



    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">

            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground
                    style={styles.container}
                    source={require('../../assets/home-background.png')}
                    imageStyle={{ width: 274, height: 368 }}
                >
                    <View style={styles.main}>
                        <Image source={require('../../assets/logo.png')} />
                        <View>
                            <Animated.Text style={
                                [styles.title,
                                {
                                    marginTop: titleMarginTop
                                }]}>
                                Seu marketplace {'\n'}de coleta de {'\n'}resíduos</Animated.Text>
                            <Animated.Text
                                style={[
                                    styles.description,
                                    {
                                        opacity: descriptionOpacity
                                    }

                                ]}>
                                Ajudamos pessoa a encontrarem pontos de coleta de forma eficiente</Animated.Text>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <TextInput style={styles.input} placeholder="Digite a UF" value={uf} onChangeText={setUf} maxLength={2} autoCapitalize="characters" autoCorrect={false}></TextInput>
                        <TextInput style={styles.input} placeholder="Digite a Cidade" value={city} onChangeText={setCity} autoCorrect={false}></TextInput>
                        <RectButton style={styles.button}
                            onPress={handleNavigateToPoints}>
                            <View style={styles.buttonIcon}>
                                <Icon name="arrow-right" color="#FFF" size={24}></Icon>
                            </View>
                            <Text style={styles.buttonText}>Entrar</Text>
                        </RectButton>

                    </View>
                </ImageBackground>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32
    },

    main: {
        flex: 1,
        justifyContent: 'center',
    },

    title: {
        color: '#322153',
        fontSize: 32,
        fontFamily: 'Ubuntu_700Bold',
        maxWidth: 260,
        marginTop: 64,
    },

    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 16,
        fontFamily: 'Roboto_400Regular',
        maxWidth: 260,
        lineHeight: 24,
    },

    footer: {
        paddingBottom: 0
    },

    select: {},

    input: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
    },

    button: {
        backgroundColor: '#34CB79',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 8,
    },

    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    }
});

export default Home;