import { createClient } from "@/utils/supabase/server";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
} from "@mui/material";
import Link from "next/link";

export default async function Notes() {
  const supabase = createClient();
  const { data: notes, error } = await supabase.from("notes").select();

  if (error) {
    console.error("Error fetching notes:", error);
    return (
      <Typography color="error">
        Failed to load notes. Please try again later.
      </Typography>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" component="h1">
            Notes
          </Typography>
          <Typography variant="body1" component="p">
            supabase.from("notes").select();でsupabase上のnotesテーブルからデータを取得しています。
          </Typography>
        </Box>
      </Box>
      {notes && notes.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="notes table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notes.map((note) => (
                <TableRow key={note.id}>
                  <TableCell component="th" scope="row">
                    {note.id}
                  </TableCell>
                  <TableCell>{note.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" align="center">
          No notes found.
        </Typography>
      )}
      <Button
        component={Link}
        href="/"
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
      >
        Back to Home
      </Button>
    </Container>
  );
}