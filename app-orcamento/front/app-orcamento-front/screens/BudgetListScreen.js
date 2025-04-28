import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function BudgetListScreen({ navigation }) {
  const [budgets, setBudgets] = useState([]);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL; // Corrigido para Expo padrão

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await fetch(`${apiUrl}/budgets`);
        const textResponse = await response.text(); // Usando .text() para depuração
        
        console.log("Resposta da API:", textResponse); // Adicionando log
        
        const data = JSON.parse(textResponse); // Tentando fazer o parse manual
        setBudgets(data);
      } catch (error) {
        console.error('Erro ao buscar orçamentos:', error);
      }
    };

    fetchBudgets();
  }, [apiUrl]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lista de Orçamentos</Text>
      <FlatList
        data={budgets}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('BudgetDetailScreen', { budgetId: item._id })}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 10 },
});
