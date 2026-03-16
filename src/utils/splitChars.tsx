import React from 'react'

export const splitChars = (text: string): React.ReactElement[] =>
  text.split('').map((char, i) => (
    <span key={i} className="anim-char inline-block">
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))
