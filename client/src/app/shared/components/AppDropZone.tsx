import { UploadFile } from '@mui/icons-material';
import { FormControl, FormHelperText, Typography } from '@mui/material';
import { useCallback, type CSSProperties } from 'react';
import { useDropzone } from 'react-dropzone'
import { useController, type FieldValues, type UseControllerProps } from "react-hook-form"


const dropZoneStyles: CSSProperties = {
    display: 'flex',
    border: 'dashed 3px #eee',
    borderColor: '#eee',
    borderRadius: '10px',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: "100%",
  }

  const dropZoneActive: CSSProperties = {
    borderColor: 'green'
  }


type Props<T extends FieldValues> = {
  name: keyof T
} & UseControllerProps<T>

export function AppDropZone<T extends FieldValues> (props: Props<T>) {
  const { fieldState, field } = useController({...props});

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);


  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onDrop });

  

  return (
    <div {...getRootProps()}>
      <FormControl 
        style={ isDragActive ? {...dropZoneStyles, ...dropZoneActive} : dropZoneStyles }
        error= {!!fieldState.error}
      >
        <input {...getInputProps()} />
        <UploadFile/>
        <Typography>Drop Image Here</Typography>
        <FormHelperText>{fieldState.error?.message}</FormHelperText>
      </FormControl>
    </div>
  )
}