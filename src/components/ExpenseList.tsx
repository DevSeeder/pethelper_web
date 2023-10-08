import React from 'react';
import { List, Header, Button } from 'semantic-ui-react';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: number) => void;
  onEditExpense: (expense: Expense) => void;
}

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDeleteExpense, onEditExpense }) => {
  const groupedExpenses: { [key: string]: Expense[] } = {};

  expenses.forEach(expense => {
    if (!groupedExpenses[expense.category]) {
      groupedExpenses[expense.category] = [];
    }
    groupedExpenses[expense.category].push(expense);
  });

  const totalExpenses = expenses.reduce((total, expense) => Number(total) + Number(expense.amount), 0);

  return (
    <>
      <Header as='h2'>Total de Despesas: R${totalExpenses}</Header>
      {Object.keys(groupedExpenses).map(category => {
        const totalCategoryExpense = groupedExpenses[category].reduce((total, expense) => Number(total) + Number(expense.amount), 0);

        return (
          <div key={category}>
            <Header as='h3'>{category}</Header>
            <List divided relaxed>
              {groupedExpenses[category].map(expense => (
                <List.Item key={expense.id}>
                  <List.Content floated='right'>
                    <Button color='red' onClick={() => onDeleteExpense(expense.id)}>
                      Excluir
                    </Button>
                    <Button color='blue' onClick={() => onEditExpense(expense)}>
                      Editar
                    </Button>
                  </List.Content>
                  <List.Content>
                    <List.Header>{expense.description}</List.Header>
                    <List.Description>R${expense.amount}</List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
            <Header as='h4'>
              Total em {category}: R${totalCategoryExpense}
            </Header>
          </div>
        );
      })}
    </>
  );
};

export default ExpenseList;
