import { ChangeEvent } from "react";

export interface IModalInput {
    name: string;
    label: string;
    placeholder?: string;
    type: string;
    min?: number;
    max?: number;
    errorMessage?: string;
    onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
    refine?: () => boolean;
}