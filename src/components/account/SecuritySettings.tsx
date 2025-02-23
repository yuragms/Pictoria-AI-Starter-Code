import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { User } from '@supabase/supabase-js';
import { Button } from '../ui/button';

interface SecuritySettingsProps {
  user: User;
}

const SecuritySettings = ({ user }: SecuritySettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h3 className="font-medium">Password</h3>
          <p className="text-sm text-muted-foreground">
            Change your password to keep your account secure
          </p>
          <Button variant={'outline'}>Change password</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;
