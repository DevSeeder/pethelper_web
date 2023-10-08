import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Dropdown } from 'semantic-ui-react';

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
  initialExpense?: Expense;
}

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface ExpenseFormState {
  id: number;
  description: string;
  amount: number;
  category: string;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense, initialExpense = { id: 0, description: '', amount: 0, category: '' } }) => {
  const [formData, setFormData] = useState<ExpenseFormState>(initialExpense);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAddExpense(formData);
    setFormData({ id: 0, description: '', amount: 0, category: '' });
  };

  const categoryOptions = [
    { key: 'food', value: 'food', text: 'Alimentação' },
    { key: 'hygiene', value: 'hygiene', text: 'Higiene' },
    { key: 'vaccines', value: 'vaccines', text: 'Vacinas' },
    { key: 'medicalExpenses', value: 'medicalExpenses', text: 'Despesas Médicas' },
    { key: 'shopping', value: 'shopping', text: 'Compras' },
    { key: 'toys', value: 'toys', text: 'Brinquedos' },
  ];

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        label='Description'
        placeholder='Description'
        name='description'
        value={formData.description}
        onChange={handleChange}
      />
      <Form.Input
        label='Amount'
        placeholder='Amount'
        type='number'
        name='amount'
        value={formData.amount}
        onChange={handleChange}
      />
      <Form.Field>
        <label>Categoria</label>
        <Dropdown
          placeholder='Selecione uma categoria'
          fluid
          selection
          options={categoryOptions}
          name='category'
          value={formData.category}
          onChange={(e, { value }) => handleChange({ target: { name: 'category', value } })}
        />
      </Form.Field>
      <Button type='submit'>Adicionar Despesa</Button>
    </Form>
  );
};

export default ExpenseForm;
