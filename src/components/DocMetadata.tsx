import React from 'react';

interface DocMetadataProps {
  effectiveDate?: string;
  owners?: string[];
}

export default function DocMetadata({ effectiveDate, owners }: DocMetadataProps): JSX.Element {
  if (!effectiveDate && (!owners || owners.length === 0)) {
    return null;
  }

  return (
    <div className="doc-metadata">
      {effectiveDate && (
        <div>
          <strong>Effective Date:</strong> {effectiveDate}
        </div>
      )}
      {owners && owners.length > 0 && (
        <div>
          <strong>Owners:</strong> {owners.join(', ')}
        </div>
      )}
    </div>
  );
}
