"use client";
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'classnames';

type DialogProps = {
  title: string;
  description?: string;
  triggerLabel: string;
};

function PrimaryButton({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-md bg-black text-white dark:bg-white dark:text-black',
        'px-4 py-2 text-sm font-medium shadow hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2',
        'ring-black dark:ring-white',
        className,
      )}
      {...props}
    />
  );
}

const AppDialog: React.FC<DialogProps> = ({ title, description, triggerLabel, children }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <PrimaryButton>{triggerLabel}</PrimaryButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content
          className={
            'fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg dark:bg-neutral-900'
          }
        >
          <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
          {description && (
            <Dialog.Description className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
              {description}
            </Dialog.Description>
          )}
          <div className="mt-4">{children}</div>
          <div className="mt-6 flex justify-end gap-2">
            <Dialog.Close asChild>
              <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800">
                Закрыть
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <PrimaryButton>ОК</PrimaryButton>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

type UserMenuItem = { key: string; label: string };

const userMenuItems: UserMenuItem[] = [
  { key: 'profile', label: 'Профиль' },
  { key: 'settings', label: 'Настройки' },
  { key: 'logout', label: 'Выйти' },
];

type DropdownProps = {
  onSelect: (key: string) => void;
};

const UserDropdown: React.FC<DropdownProps> = ({ onSelect }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <PrimaryButton>Меню пользователя</PrimaryButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={6}
          className="min-w-[180px] rounded-md border bg-white p-1 shadow-lg dark:border-neutral-700 dark:bg-neutral-900"
        >
          {userMenuItems.map((item) => (
            <DropdownMenu.Item
              key={item.key}
              className={
                'cursor-pointer select-none rounded px-3 py-2 text-sm outline-none hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }
              onSelect={(e) => {
                e.preventDefault();
                onSelect(item.key);
              }}
            >
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default function RadixPage() {
  return (
    <div className="p-6 space-y-6">
      <AppDialog title="Пример диалога" description="Реализация на Radix UI." triggerLabel="Открыть диалог">
        <p className="text-sm text-neutral-700 dark:text-neutral-300">Произвольный контент внутри модального окна.</p>
      </AppDialog>

      <UserDropdown onSelect={(key) => console.log('menu:', key)} />
    </div>
  );
}


