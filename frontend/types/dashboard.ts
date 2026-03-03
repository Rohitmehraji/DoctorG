export type DashboardMetric = {
  key: string;
  label: string;
  value: string | number;
  helperText?: string;
  trend?: "up" | "down" | "flat";
};

export type MetricsSummaryApiResponse = {
  leads_this_week: number;
  conversion_rate: number;
  booked_revenue: number;
  followup_sla_minutes: number;
};
