import { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography, Stack } from "@mui/material";
import Sidenav from "../../components/admin/Sidenav";
import Navbar from "../../components/admin/Navbar";
import "../../dash.css";

import {
  getDashboardStats,
  type DashboardStats,
} from "../../services/bookingService";

export default function Home() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getDashboardStats();
        setStats(response);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="bgcolor">
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={2}>
            {/* Thống kê chính */}
            <Grid size={{ xs: 12 }}>
              <Stack spacing={2} direction="row" flexWrap="wrap">
                <StatCard
                  title="Tổng số đơn"
                  value={stats?.totalBookings}
                  color="#1976d2"
                />
                <StatCard
                  title="Đang chờ"
                  value={stats?.pending}
                  color="#f9a825"
                />
                <StatCard
                  title="Đã xác nhận"
                  value={stats?.confirmed}
                  color="#388e3c"
                />
                <StatCard
                  title="Đã hủy"
                  value={stats?.cancelled}
                  color="#d32f2f"
                />
                <StatCard
                  title="Tổng doanh thu"
                  value={"$" + stats?.totalRevenue?.toLocaleString("vi-VN")}
                  color="#6a1b9a"
                />
              </Stack>
            </Grid>

            {/* Biểu đồ và bảng thống kê */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Card sx={{ height: "60vh" }}>
                <CardContent>
                  <Typography variant="h6">
                    Biểu đồ doanh thu (placeholder)
                  </Typography>
                  {/* Bạn có thể nhúng biểu đồ tại đây */}
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: "60vh" }}>
                <CardContent>
                  <Typography variant="h6">
                    Thông tin khác (placeholder)
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number | undefined;
  color: string;
}) {
  return (
    <Card
      sx={{ minWidth: 180, flex: 1, backgroundColor: color, color: "white" }}
    >
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          {value ?? "..."}
        </Typography>
      </CardContent>
    </Card>
  );
}
