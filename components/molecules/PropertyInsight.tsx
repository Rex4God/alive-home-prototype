"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const propertyValueData = [
  { month: "Jan", aiValue: 480000, marketAvg: 460000 },
  { month: "Feb", aiValue: 490000, marketAvg: 465000 },
  { month: "Mar", aiValue: 505000, marketAvg: 470000 },
  { month: "Apr", aiValue: 510000, marketAvg: 475000 },
  { month: "May", aiValue: 530000, marketAvg: 480000 },
  { month: "Jun", aiValue: 540000, marketAvg: 485000 },
];

const propertyInquiryData = [
  { month: "Jan", inquiries: 15 },
  { month: "Feb", inquiries: 24 },
  { month: "Mar", inquiries: 18 },
  { month: "Apr", inquiries: 25 },
  { month: "May", inquiries: 32 },
  { month: "Jun", inquiries: 29 },
];

export default function PropertyInsights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* AI Property Value Trend */}
      <Card>
        <CardHeader>
          <CardTitle>AI Property Value Trend</CardTitle>
          <CardDescription>
            Estimated value of your properties over time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={propertyValueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip
                formatter={(value: number) => `₦${value.toLocaleString()}`}
              />
              <Line
                type="monotone"
                dataKey="aiValue"
                stroke="#22c55e" // Green
                strokeWidth={3}
                dot={{ r: 5 }}
                name="Property Value (AI Est.)"
              />
              <Line
                type="monotone"
                dataKey="marketAvg"
                stroke="#C77D01" // Blue
                strokeWidth={3}
                dot={{ r: 5 }}
                name="Market Avg. Price"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Property Inquiry Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Property Inquiry Trends</CardTitle>
          <CardDescription>
            Monthly inquiries received for your listings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={propertyInquiryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="inquiries" fill="#C77D01" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
