"use client"
import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' }

export default function Button({ variant = 'primary', className = '', ...props }: Props){
  const base = 'inline-flex items-center gap-2 px-4 py-2 rounded text-sm'
  const style = variant === 'primary' ? 'bg-primary text-white hover:opacity-95' : 'border text-gray-700'
  return <button className={`${base} ${style} ${className}`} {...props} />
}
