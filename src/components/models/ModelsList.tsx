import { Database } from '@datatypes.types';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import Link from 'next/link';
import { Button } from '../ui/button';
import { formatDistance } from 'date-fns';
import {
  CheckCircle2,
  Clock,
  Divide,
  Loader2,
  User2,
  XCircle,
} from 'lucide-react';

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

  if (data?.length === 0) {
    return (
      <Card
        className="flex h-[450px] flex-col items-center justify-center text-center
      "
      >
        <CardHeader>
          <CardTitle>No Models Found</CardTitle>
          <CardDescription>
            You have not trained any models yet. Start by creating a new model.
          </CardDescription>
          <Link href="/model-training" className="inline-block pt-2" />
          <Button className="w-fit">Create Model</Button>
        </CardHeader>
      </Card>
    );
  }
  return (
    <div className="grid gap-6 grid-cols-3">
      {data?.map((model) => (
        <Card
          key={model.id}
          className="relative flex flex-col overflow-hidden
      "
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              {' '}
              <CardTitle>{model.model_name}</CardTitle>
              <div className="flex items-center gap-2">
                {model.training_status === 'succeeded' ? (
                  <div className="flex items-center gap-1 text-sm text-green-500">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="capitalize">Ready</span>
                  </div>
                ) : model.training_status === 'failed' ||
                  model.training_status === 'canceled' ? (
                  <div className="flex items-center gap-1 text-sm text-red-500">
                    <XCircle className="w-4 h-4" />
                    <span className="capitalize">{model.training_status}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-sm text-yellow-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="capitalize">Training</span>
                  </div>
                )}
              </div>
            </div>
            <CardDescription>
              Created{' '}
              {formatDistance(new Date(model.created_at), new Date(), {
                addSuffix: true,
              })}
            </CardDescription>
            <CardContent className="flex-1 p-0 pt-3">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-muted px-3 py-2">
                    {' '}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span style={{ whiteSpace: 'nowrap' }}>
                        Training Duration
                      </span>
                    </div>
                    <p className="mt-1 font-medium">
                      {Math.round(Number(model.training_time) / 60) || NaN} mins
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted px-3 py-2">
                    {' '}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User2 className="w-4 h-4" />
                      <span>Gender</span>
                    </div>
                    <p className="mt-1 font-medium">{model.gender}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default ModelsList;
