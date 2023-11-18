import React from 'react'
import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';

export default function Checkbox(props: any) {

    const { name, label, value, onChange, ...other  } = props;

    const convertToDefEventPara = (name: string, value: any) => ({
        target: {
            name, value
        }
    })

    return (
        <FormControl>
            <FormControlLabel
                control={<MuiCheckbox
                    name={name}
                    color="primary"
                    checked={value}
                    {...other}
                    onChange={e => onChange(convertToDefEventPara(name, e.target.checked))}
                />}
                label={label}
            />
        </FormControl>
    )
}
