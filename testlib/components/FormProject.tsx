import React from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd';
import type { Dayjs } from 'dayjs';

type ProjectPriority = 'low' | 'medium' | 'high';

export interface ProjectFormValues {
  name: string;
  description: string;
  priority: ProjectPriority;
  categories: string[];
  deadline: Dayjs | null;
  budget: number;
}

const required = (message: string) => ({ required: true, message });

const nameRule = [
  required('Введите название проекта'),
  { min: 3, message: 'Минимум 3 символа' },
];

const descriptionRule = [required('Введите описание')];

const priorityRule = [required('Выберите приоритет')];

const categoriesRule = [
  required('Выберите хотя бы одну категорию'),
  {
    validator: (_: unknown, value: string[]) =>
      Array.isArray(value) && value.length > 0
        ? Promise.resolve()
        : Promise.reject('Нужно выбрать минимум одну категорию'),
  },
];

const deadlineRule = [required('Выберите дедлайн')];

const budgetRule = [
  required('Укажите бюджет'),
  {
    type: 'number' as const,
    min: 0,
    message: 'Бюджет не может быть отрицательным',
  },
];

const priorities: { label: string; value: ProjectPriority }[] = [
  { label: 'Низкий', value: 'low' },
  { label: 'Средний', value: 'medium' },
  { label: 'Высокий', value: 'high' },
];

const categoryOptions: { label: string; value: string }[] = [
  { label: 'Web', value: 'web' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'ML', value: 'ml' },
  { label: 'Research', value: 'research' },
];

const FormProject: React.FC = () => {
  const [form] = Form.useForm<ProjectFormValues>();

  const onFinish = (values: ProjectFormValues) => {
    const result = {
      ...values,
      deadline: values.deadline ? values.deadline.toDate() : null,
    } as Omit<ProjectFormValues, 'deadline'> & { deadline: Date | null };
    // eslint-disable-next-line no-console
    console.log('Project submit:', result);
  };

  return (
    <Form<ProjectFormValues>
      form={form}
      layout="vertical"
      style={{ maxWidth: 720 }}
      onFinish={onFinish}
      initialValues={{ priority: 'medium', categories: [], deadline: null }}
    >
      <Form.Item<ProjectFormValues> label="Название" name="name" rules={nameRule}>
        <Input placeholder="Введите название проекта" allowClear />
      </Form.Item>

      <Form.Item<ProjectFormValues> label="Описание" name="description" rules={descriptionRule}>
        <Input.TextArea placeholder="Краткое описание" rows={4} showCount maxLength={500} />
      </Form.Item>

      <Form.Item<ProjectFormValues> label="Приоритет" name="priority" rules={priorityRule}>
        <Select<ProjectPriority> options={priorities} placeholder="Выберите приоритет" />
      </Form.Item>

      <Form.Item<ProjectFormValues> label="Категории" name="categories" rules={categoriesRule}>
        <Select<string[]> mode="multiple" options={categoryOptions} placeholder="Выберите категории" allowClear />
      </Form.Item>

      <Form.Item<ProjectFormValues> label="Дедлайн" name="deadline" rules={deadlineRule}>
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item<ProjectFormValues> label="Бюджет" name="budget" rules={budgetRule}>
        <InputNumber style={{ width: '100%' }} placeholder="Укажите бюджет" addonAfter="₽" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">Создать проект</Button>
      </Form.Item>
    </Form>
  );
};

export default FormProject;