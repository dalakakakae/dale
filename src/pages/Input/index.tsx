import { useField } from '@unform/core'
import React, { useEffect, useRef } from 'react'

export default function Input({ name, ...rest }: any) {
  const inputRef = useRef(null)
  const { fieldName, defaultValue, registerField, error }: any = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  return <input ref={inputRef} defaultValue={defaultValue} {...rest} />
}
