"use client";
import React from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large' | 'extraLarge';

export interface CustomButtonProps extends Omit<ButtonProps, 'variant' | 'size' | 'color'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
}

const getMuiVariant = (variant: ButtonVariant): ButtonProps['variant'] => {
    switch (variant) {
        case 'primary':
            return 'contained';
        case 'secondary':
            return 'outlined';
        case 'danger':
            return 'danger' as unknown as ButtonProps['variant'];
        default:
            return 'contained';
    }
};

export const CustomButton: React.FC<CustomButtonProps> = ({
    variant = 'primary',
    size = 'medium',
    loading = false,
    disabled = false,
    children,
    startIcon,
    ...props
}) => {
    const muiVariant = getMuiVariant(variant);
    const muiColor: ButtonProps['color'] | undefined = variant === 'danger' ? undefined : variant;

    return (
        <Button
            variant={muiVariant}
            size={size as ButtonProps['size']}
            color={muiColor}
            disabled={disabled || loading}
            startIcon={loading ? <CircularProgress size={16} /> : startIcon}
            {...props}
        >
            {children}
        </Button>
    );
};

export default CustomButton;


