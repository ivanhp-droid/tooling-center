import React from 'react';

interface GoodBadExampleProps {
  good: React.ReactNode;
  bad: React.ReactNode;
  goodLabel?: string;
  badLabel?: string;
}

export default function GoodBadExample({ 
  good, 
  bad, 
  goodLabel = '✅ Good Example',
  badLabel = '❌ Bad Example'
}: GoodBadExampleProps): JSX.Element {
  return (
    <div className="example-container">
      <div className="example-good">
        <h4>{goodLabel}</h4>
        {good}
      </div>
      <div className="example-bad">
        <h4>{badLabel}</h4>
        {bad}
      </div>
    </div>
  );
}
