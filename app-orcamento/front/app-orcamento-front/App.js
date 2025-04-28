import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CreateMaterialScreen from './screens/CreateMaterialScreen';
import CreateBudgetScreen from './screens/CreateBudgetScreen';
import BudgetListScreen from './screens/BudgetListScreen';
import BudgetDetailScreen from './screens/BudgetDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Início">
        <Stack.Screen name="Início" component={HomeScreen} />
        <Stack.Screen name="Cadastrar Material" component={CreateMaterialScreen} />
        <Stack.Screen name="Cadastrar Orçamento" component={CreateBudgetScreen} />
        <Stack.Screen name="Orçamentos" component={BudgetListScreen} />
        <Stack.Screen name="Detalhes do Orçamento" component={BudgetDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
