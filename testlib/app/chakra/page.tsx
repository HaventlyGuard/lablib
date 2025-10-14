"use client";
import React from 'react';
import {
  ChakraProvider,
  defaultSystem,
  Box,
  Button,
  Input,
  useDisclosure,
  Dialog,
  HStack,
  VStack,
  Text,
} from '@chakra-ui/react';

type UseModalReturn = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

function useModal(): UseModalReturn {
  const disc = useDisclosure();
  return { isOpen: disc.open, open: disc.onOpen, close: disc.onClose };
}

type UserRole = 'Admin' | 'User' | 'Manager';

interface UserFormValues {
  name: string;
  email: string;
  role: UserRole;
  department: string;
}


function UserModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [values, setValues] = React.useState<UserFormValues>({
    name: '',
    email: '',
    role: 'User',
    department: '',
  });

  const [errors, setErrors] = React.useState<Partial<Record<keyof UserFormValues, string>>>({});

  const update = <K extends keyof UserFormValues>(key: K, val: UserFormValues[K]) => {
    setValues((v) => ({ ...v, [key]: val }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof UserFormValues, string>> = {};
    if (!values.name || values.name.trim().length < 2) next.name = 'Введите имя (мин. 2)';
    if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Введите корректный email';
    if (!values.department) next.department = 'Укажите отдел';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    // eslint-disable-next-line no-console
    console.log('Create user:', values);
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => { if (!e.open) onClose(); }}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>Добавить пользователя</Dialog.Header>
          <Dialog.CloseTrigger />
          <Dialog.Body>
          <VStack className="gap-4" align="stretch">
            <div>
              <Text mb={1} fontWeight="medium">Имя</Text>
              <Input value={values.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('name', e.target.value)} placeholder="Иван" />
              {errors.name && <Text mt={1} color="red.400" fontSize="sm">{errors.name}</Text>}
            </div>
            <div>
              <Text mb={1} fontWeight="medium">Email</Text>
              <Input type="email" value={values.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('email', e.target.value)} placeholder="user@example.com" />
              {errors.email && <Text mt={1} color="red.400" fontSize="sm">{errors.email}</Text>}
            </div>
            <div>
              <Text mb={1} fontWeight="medium">Роль</Text>
              <select
                value={values.role}
                onChange={(e) => update('role', e.target.value as UserRole)}
                className="border rounded-md p-2"
              >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="User">User</option>
              </select>
            </div>
            <div>
              <Text mb={1} fontWeight="medium">Отдел</Text>
              <Input value={values.department} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('department', e.target.value)} placeholder="Маркетинг" />
              {errors.department && <Text mt={1} color="red.400" fontSize="sm">{errors.department}</Text>}
            </div>
          </VStack>
          </Dialog.Body>
          <Dialog.Footer>
            <Button mr={3} onClick={onClose} variant="ghost">Отмена</Button>
            <Button colorScheme="blue" onClick={submit}>Создать</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}

export default function ChakraPage() {
  const modal = useModal();

  return (
    <ChakraProvider value={defaultSystem}>
    <Box p={6}>
        <HStack justify="space-between" mb={4}>
          <Text fontSize="xl" fontWeight="bold">Chakra UI Theme & Modal</Text>
          {/* Theme toggle removed for v3 minimal example */}
        </HStack>
        <Button colorScheme="blue" onClick={modal.open}>Добавить пользователя</Button>
        <UserModal isOpen={modal.isOpen} onClose={modal.close} />
    </Box>
    </ChakraProvider>
  );
}

