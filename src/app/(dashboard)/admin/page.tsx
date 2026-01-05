
import { KpiCard } from "@/components/dashboard/kpi-card";
import { QuickAction } from "@/components/dashboard/quick-action";
import { AnalyticsPlaceholders } from "@/components/dashboard/analytics-placeholder";
import { Users, FileQuestion, GraduationCap, Activity, PlusCircle, UploadCloud, FileText, Building2, Settings, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  return (
    <div className="space-y-8 p-6 md:p-10 max-w-[1600px] mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Admin. Here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <Button className="rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20">
            Download Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Total Users"
          value="12,345"
          change="+12.5%"
          trend="up"
          icon={Users}
          colorClass="text-blue-600 bg-blue-50"
        />
        <KpiCard
          title="Total Questions"
          value="4,890"
          change="+5.2%"
          trend="up"
          icon={FileQuestion}
          colorClass="text-blue-600 bg-blue-50"
        />
        <KpiCard
          title="Active Tests"
          value="156"
          change="-2.4%"
          trend="down"
          icon={GraduationCap}
          colorClass="text-blue-600 bg-blue-50"
        />
        <KpiCard
          title="Avg. Score"
          value="78%"
          change="+1.8%"
          trend="up"
          icon={Activity}
          colorClass="text-blue-600 bg-blue-50"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <QuickAction label="New Question" icon={PlusCircle} variant="blue" />
          <QuickAction label="Bulk Upload" icon={UploadCloud} />
          <QuickAction label="Create Test" icon={FileText} />
          <QuickAction label="Company Tests" icon={Building2} />
          <QuickAction label="Manage Users" icon={UserCog} />
          <QuickAction label="Settings" icon={Settings} />
        </div>
      </div>

      {/* Analytics Section */}
      <div>
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-indigo-600 rounded-full"></span>
          Platform Analytics
        </h2>
        <AnalyticsPlaceholders />
      </div>
    </div>
  );
}
