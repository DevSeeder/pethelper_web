"use client";
import React, { useState } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

const Home: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editExpense, setEditExpense] = useState<Expense | null>(null);

  const addExpense = (expense: Expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const editExpenseItem = (expense: Expense) => {
    setEditExpense(expense);
  };

  const updateExpense = (updatedExpense: Expense) => {
    setExpenses(expenses.map(expense =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    ));
    setEditExpense(null);
  };

  return (
    <Container style={{ marginTop: '2em' }}>
      <Header as='h1'>Pet Expenses Tracker</Header>
      <ExpenseForm onAddExpense={addExpense} />
      <Segment>
        <ExpenseList
          expenses={expenses}
          onDeleteExpense={deleteExpense}
          onEditExpense={editExpenseItem}
        />
      </Segment>
      {editExpense && (
        <Segment>
          <Header as='h2'>Editar Despesa</Header>
          <ExpenseForm
            onAddExpense={updateExpense}
            initialExpense={editExpense}
          />
        </Segment>
      )}
    </Container>
  );
};

export default Home;
