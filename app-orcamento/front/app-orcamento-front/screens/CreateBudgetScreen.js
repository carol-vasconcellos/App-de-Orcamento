import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function CreateBudgetScreen() {
  const [title, setTitle] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [workerName, setWorkerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [workerEmail, setWorkerEmail] = useState('');
  const [materials, setMaterials] = useState([{ materialId: '', quantity: '', unitPrice: '' }]);
  const [deadline, setDeadline] = useState('');
  const [availableMaterials, setAvailableMaterials] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;
  const resendApiUrl = process.env.REACT_APP_RESEND_API_URL;
  const resendApiKey = process.env.REACT_APP_RESEND_API_KEY;
  const resendEmailFrom = process.env.REACT_APP_RESEND_EMAIL_FROM;

  const materialsApiUrl = `${apiUrl}/materials`;

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch(materialsApiUrl);
        const data = await response.json();
        setAvailableMaterials(data);
      } catch (error) {
        console.error('Erro ao buscar materiais:', error);
      }
    };

    fetchMaterials();
  }, []);

  const handleMaterialChange = (index, field, value) => {
    const newMaterials = [...materials];
    newMaterials[index][field] = value;
    setMaterials(newMaterials);
  };

  const handleAddMaterial = () => {
    setMaterials([...materials, { materialId: '', quantity: '', unitPrice: '' }]);
  };

  const handleRemoveMaterial = (index) => {
    const newMaterials = [...materials];
    newMaterials.splice(index, 1);
    setMaterials(newMaterials);
  };

  const handleSubmit = async () => {
    if (!title || !customerName || !workerName || !customerEmail || !workerEmail || !deadline) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    const formattedMaterials = materials.map(m => ({
      materialId: m.materialId,
      quantity: parseInt(m.quantity, 10),
      unitPrice: parseFloat(m.unitPrice),
    }));

    const newBudget = { title, customerName, workerName, customerEmail, workerEmail, materials: formattedMaterials, deadline };

    try {
      const response = await fetch(`${apiUrl}/budgets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBudget),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Orçamento criado com sucesso!');
        await sendEmailNotification();
      } else {
        alert(data.message || 'Erro ao criar o orçamento');
      }
    } catch (error) {
      console.error('Erro ao criar o orçamento:', error);
    }
  };

  const sendEmailNotification = async () => {
    const emailData = {
      from: resendEmailFrom,
      to: [customerEmail, workerEmail],
      subject: `Novo Orçamento Criado: ${title}`,
      html: `
        <h1>Detalhes do Orçamento</h1>
        <p><strong>Cliente:</strong> ${customerName}</p>
        <p><strong>Pedreiro:</strong> ${workerName}</p>
        <p><strong>Prazo:</strong> ${deadline}</p>
        <p><strong>Título:</strong> ${title}</p>
        <p>Obrigado por utilizar nosso sistema!</p>
      `,
    };

    try {
      const response = await fetch(resendApiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        console.log('Email enviado com sucesso!');
      } else {
        console.error('Erro ao enviar email');
      }
    } catch (error) {
      console.error('Erro na comunicação com Resend:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Criar Novo Orçamento</Text>

      <TextInput style={styles.input} placeholder="Título do Orçamento" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Nome do Cliente" value={customerName} onChangeText={setCustomerName} />
      <TextInput style={styles.input} placeholder="Nome do Pedreiro" value={workerName} onChangeText={setWorkerName} />
      <TextInput style={styles.input} placeholder="Email do Cliente" value={customerEmail} onChangeText={setCustomerEmail} />
      <TextInput style={styles.input} placeholder="Email do Pedreiro" value={workerEmail} onChangeText={setWorkerEmail} />

      <FlatList
        data={materials}
        renderItem={({ item, index }) => (
          <View style={styles.materialRow}>
            <View style={[styles.input, styles.smallInput]}>
              <Picker
                selectedValue={item.materialId}
                onValueChange={(value) => handleMaterialChange(index, 'materialId', value)}
              >
                <Picker.Item label="Selecione um material" value="" />
                {availableMaterials.map((material) => (
                  <Picker.Item key={material._id} label={material.name} value={material._id} />
                ))}
              </Picker>
            </View>

            <TextInput
              style={[styles.input, styles.smallerInput]}
              placeholder="Qtd"
              value={String(item.quantity)}
              onChangeText={(text) => handleMaterialChange(index, 'quantity', text)}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, styles.smallInput]}
              placeholder="R$ 0,00"
              value={item.unitPrice}
              onChangeText={(text) => handleMaterialChange(index, 'unitPrice', text)}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleRemoveMaterial(index)}>
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <Button title="Adicionar Material" onPress={handleAddMaterial} />
      <TextInput style={styles.input} placeholder="Prazo (DD/MM/YYYY)" value={deadline} onChangeText={setDeadline} />
      <Button title="Criar Orçamento" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
    justifyContent: 'center',
  },
  materialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  smallInput: {
    flex: 2,
    marginRight: 5,
  },
  smallerInput: {
    flex: 1,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#FF4D4D',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
