import { UploadFile } from '@mui/icons-material';
import { FormControl, FormHelperText, Typography } from '@mui/material';
import { useCallback, type CSSProperties } from 'react';
import { useDropzone } from 'react-dropzone'
import { useController, type FieldValues, type UseControllerProps } from "react-hook-form"


const dropZoneStyles: CSSProperties = {
    display: 'flex',
    border: 'dashed 3px #767676',
    borderColor: '#767676',
    borderRadius: '10px',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: "100%",
  }

  const dropZoneActive: CSSProperties = {
    borderColor: 'green'
  }

  const dropZoneError: CSSProperties = {
    borderColor: 'red'
  }


type Props<T extends FieldValues> = {
  name: keyof T
} & UseControllerProps<T>

export function AppDropZone<T extends FieldValues> (props: Props<T>) {
  const { fieldState, field } = useController({...props});

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const fileWithPreview = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0])
      });

      field.onChange(fileWithPreview);
    }
  }, [field]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onDrop, accept: { "image/*": [] } });

  return (
    <div {...getRootProps()} style={{ flex: 1 }}>
      <FormControl 
        style={ 
          isDragActive 
            ? {...dropZoneStyles, ...dropZoneActive} 
            : fieldState.error
            ? {...dropZoneStyles, ...dropZoneError}
            : dropZoneStyles }
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