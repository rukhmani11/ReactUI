import { Button, FormControl, FormHelperText, Grid, InputLabel } from '@mui/material';
import { cyan } from '@mui/material/colors';
import React, { useState } from 'react'
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";


export default function ColorPalette(props: any) {
    const {
        label,
        value,
        error = null,
        onChange,
        ...other
    } = props;
    //console.log(value);
    const [color, setColor] = useColor(value || "cyan");
    const [open, setopen] = useState(false);
    const openBox = () => {
        setopen(!open);
    }

    return (
        <>
            <FormControl variant="outlined" fullWidth size='small'
                {...(error && { error: true })}>
                <InputLabel>{label} : <b>{color.hex}</b></InputLabel>

                {open && <div style={{marginTop:'35px'}}> <ColorPicker color={color} onChange={onChange} 
                    {...other}
                />
                </div>
                }
                {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>

            <div>
                <Grid container spacing={3} marginTop={1}>
                    <Grid item xs={6} sm={6}>
                        <Button
                            variant="outlined"
                            onClick={() => openBox()}
                        >
                            {open ? 'Click To Close Palette' : 'Click To Open Palette'}
                        </Button>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <div className='palette' style={{ backgroundColor: color.hex }}></div>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

