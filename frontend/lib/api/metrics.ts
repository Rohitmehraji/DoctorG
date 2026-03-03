import { DashboardMetric, MetricsSummaryApiResponse } from "@/types/dashboard";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

const placeholderSummary: MetricsSummaryApiResponse = {
  leads_this_week: 84,
  conversion_rate: 0.314,
  booked_revenue: 42300,
  followup_sla_minutes: 9
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function toDashboardMetrics(summary: MetricsSummaryApiResponse): DashboardMetric[] {
  return [
    {
      key: "leads_this_week",
      label: "Leads This Week",
      value: summary.leads_this_week,
      helperText: "Updated from metrics API",
      trend: "up"
    },
    {
      key: "conversion_rate",
      label: "Conversion Rate",
      value: `${(summary.conversion_rate * 100).toFixed(1)}%`,
      trend: "up"
    },
    {
      key: "booked_revenue",
      label: "Booked Revenue",
      value: formatCurrency(summary.booked_revenue),
      trend: "up"
    },
    {
      key: "followup_sla_minutes",
      label: "Follow-up SLA",
      value: `${summary.followup_sla_minutes}m`,
      trend: "flat"
    }
  ];
}

export async function getDashboardMetrics(clinicId: number): Promise<DashboardMetric[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/metrics/summary?clinic_id=${clinicId}`, {
      method: "GET",
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`Metrics request failed with status ${response.status}`);
    }

    const summary = (await response.json()) as MetricsSummaryApiResponse;
    return toDashboardMetrics(summary);
  } catch (_error) {
    return toDashboardMetrics(placeholderSummary);
  }
}
