import React, { useState } from 'react';
import { ScrollView, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function CreateMaterialScreen() {
  const [materialName, setMaterialName] = useState('');
  const [materialDescription, setMaterialDescription] = useState('');

  const handleSubmit = async () => {
    if (materialName === '' || materialDescription === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/materials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: materialName,
          quantity: 1,  // Se você quiser, pode pedir para preencher a quantidade
          unitPrice: 0, // E o preço também
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Material criado:', data);
        Alert.alert('Sucesso', 'Material cadastrado com sucesso!');
        setMaterialName('');
        setMaterialDescription('');
      } else {
        Alert.alert('Erro', 'Erro ao cadastrar material');
      }
    } catch (error) {
      console.error('Erro ao cadastrar material:', error);
      Alert.alert('Erro', 'Erro ao conectar com servidor');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Cadastrar Material</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome do Material"
        value={materialName}
        onChangeText={setMaterialName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Descrição do Material"
        value={materialDescription}
        onChangeText={setMaterialDescription}
      />
      
      <Button title="Cadastrar" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
});
