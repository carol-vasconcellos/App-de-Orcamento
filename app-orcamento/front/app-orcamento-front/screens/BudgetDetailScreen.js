import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BudgetDetailScreen({ route }) {
  const { budgetId } = route.params;
  const [budget, setBudget] = useState(null);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await fetch(`${apiUrl}/budgets/${budgetId}`);
        const data = await response.json();
        setBudget(data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do orçamento:', error);
      }
    };
    fetchBudget();
  }, [budgetId, apiUrl]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Orçamento</Text>
      {budget ? (
        <>
          <Text>Título: {budget.title}</Text>
          <Text>Cliente: {budget.customerName}</Text>
          <Text>Pedreiro: {budget.workerName}</Text>
          <Text>Total: R${budget.totalCost.toFixed(2)}</Text>
          <Text>Prazo: {new Date(budget.deadline).toLocaleDateString()}</Text>
        </>
      ) : (
        <Text>Carregando...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
});
