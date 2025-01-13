import { Database } from '@datatypes.types';
import React from 'react';
import { Card, CardHeader, CardTitle } from '../ui/card';

type ModelType = {
  error: string | null;
  success: boolean;
  data: Database['public']['Tables']['models']['Row'][] | null;
};

interface ModelsListProps {
  models: ModelType;
}

const ModelsList = ({ models }: ModelsListProps) => {
  const { data, success, error } = models;

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Models Found</CardTitle>
        </CardHeader>
      </Card>
    );
  }
  return <div>ModelsList</div>;
};

export default ModelsList;
