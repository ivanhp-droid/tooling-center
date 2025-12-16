import React from 'react';

interface ChecklistProps {
  items: string[];
}

export default function Checklist({ items }: ChecklistProps): JSX.Element {
  return (
    <ul className="checklist">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
