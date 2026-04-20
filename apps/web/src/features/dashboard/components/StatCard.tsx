import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import React from 'react';

export interface StatCardTrend {
  value: string;
  icon: React.ReactElement;
  color?: string;
}

export interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactElement;
  iconBgColor?: string;
  iconColor?: string;
  trend?: StatCardTrend;
}

export function StatCard({
  title,
  value,
  icon,
  iconBgColor = 'primary.light',
  iconColor = 'primary.main',
  trend,
}: StatCardProps) {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Avatar
            sx={{
              bgcolor: iconBgColor,
              color: iconColor,
              width: 44,
              height: 44,
            }}
          >
            {icon}
          </Avatar>
          {trend ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: trend.color ?? 'success.main',
              }}
            >
              {trend.icon}
              <Typography variant="body2" fontWeight={600}>
                {trend.value}
              </Typography>
            </Box>
          ) : null}
        </Box>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h6" fontWeight={700}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

