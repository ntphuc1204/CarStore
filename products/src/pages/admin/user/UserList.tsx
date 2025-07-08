import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Divider,
  TextField,
  Box,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getAllUsers, type User } from "../../../services/userService";

export default function UserList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [users, setUsers] = React.useState<User[]>([]);
  const [searchText, setSearchText] = React.useState("");

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.userName.toLowerCase().includes(searchText.toLowerCase()) ||
      u.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Typography variant="h5" sx={{ padding: "20px" }}>
        Danh sách người dùng
      </Typography>
      <Divider />
      <Box p={2}>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Tìm kiếm"
            variant="outlined"
            size="small"
            value={searchText}
            onChange={handleSearch}
            sx={{ minWidth: 300 }}
            InputProps={{ endAdornment: <SearchIcon /> }}
          />
        </Stack>
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Tên người dùng</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Vai trò</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber || "Chưa có"}</TableCell>
                  <TableCell>{user.address || "Chưa có"}</TableCell>
                  <TableCell>{user.roles.join(", ")}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="my-mui-table">
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </Paper>
  );
}
