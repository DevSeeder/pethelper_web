import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Dropdown } from 'semantic-ui-react';

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
  initialExpense?: Expense;
} 

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense, initialExpense = { id: 0, description: '', amount: 0, category: '' } }) => {
  const [formData, setFormData] = useState<Expense>(initialExpense);

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
    { key: 'Alimentação', value: 'Alimentação', text: 'Alimentação' },
    { key: 'Higiene', value: 'Higiene', text: 'Higiene' },
    { key: 'Vacinas', value: 'Vacinas', text: 'Vacinas' },
    { key: 'médico', value: 'médico', text: 'Despesas Médicas' },
    { key: 'Compras', value: 'Compras', text: 'Compras' },
    { key: 'Brinquedos', value: 'toys', text: 'Brinquedos' },
  ];

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        label='Descrição'
        placeholder='Descrição'
        name='description'
        value={formData.description}
        onChange={handleChange}
      />
      <Form.Input
        label='Valor'
        placeholder='Valor'
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
