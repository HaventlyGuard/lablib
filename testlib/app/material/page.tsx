"use client";
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Stack, Typography, Chip, Switch } from '@mui/material';
import { DataGrid, GridColDef, GridRowSelectionModel, GridEventListener } from '@mui/x-data-grid';
import { theme } from './theme';
import CustomButton from './CustomButton';

type UserRole = 'Admin' | 'User' | 'Manager';
type UserStatus = 'active' | 'inactive';

interface UserRow {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
}

const rows: UserRow[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User', status: 'inactive' },
    { id: 3, name: 'Carol', email: 'carol@example.com', role: 'Manager', status: 'active' },
];

const roleColor: Record<UserRole, 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'> = {
    Admin: 'error',
    Manager: 'warning',
    User: 'info',
};

const columns: GridColDef<UserRow>[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 120 },
    { field: 'email', headerName: 'Email', flex: 1.2, minWidth: 160 },
    {
        field: 'role',
        headerName: 'Role',
        width: 140,
        renderCell: (params) => <Chip label={params.value} color={roleColor[params.value]} size="small" />,
    },
    {
        field: 'status',
        headerName: 'Active',
        width: 120,
        renderCell: (params) => (
            <Switch
                checked={params.value === 'active'}
                inputProps={{ 'aria-label': `toggle ${params.row.name} status` }}
            />
        ),
    },
];

export default function MaterialShowcase() {
    const [selection, setSelection] = React.useState<GridRowSelectionModel>([]);

    const handleRowClick: GridEventListener<'rowClick'> = (params) => {
        console.log('Row clicked:', params.row as UserRow);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>MUI Custom Button</Typography>
                <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: 'wrap' }}>
                    <CustomButton>Primary</CustomButton>
                    <CustomButton variant="secondary">Secondary</CustomButton>
                    <CustomButton variant="danger">Danger</CustomButton>
                    <CustomButton size="small">Small</CustomButton>
                    <CustomButton size="large">Large</CustomButton>
                    <CustomButton size="extraLarge">XL</CustomButton>
                    <CustomButton loading>Loading</CustomButton>
                    <CustomButton disabled>Disabled</CustomButton>
                </Stack>

                <Typography variant="h5" gutterBottom>Typed Data Grid</Typography>
                <Box sx={{ height: 360, width: '100%' }}>
                    <DataGrid<UserRow>
                        rows={rows}
                        columns={columns}
                        checkboxSelection
                        onRowSelectionModelChange={(model) => setSelection(model)}
                        onRowClick={handleRowClick}
                    />
                </Box>
                <Typography variant="body2" sx={{ mt: 1 }}>Selected: {selection.join(', ') || 'none'}</Typography>
            </Box>
        </ThemeProvider>
    );
}