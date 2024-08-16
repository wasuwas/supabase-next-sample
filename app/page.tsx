import { Button, Container, Typography, Box } from "@mui/material";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";

export default async function Index() {
  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Header />
        <Typography variant="h4" component="h1" gutterBottom>
          Next steps
        </Typography>
        {isSupabaseConnected ? (
          <Typography>Supabase is connected!</Typography>
        ) : (
          <Typography>Connect your Supabase project</Typography>
        )}
        <Button
          component={Link}
          href="/notes"
          variant="contained"
          sx={{ mt: 2 }}
        >
          View Notes
        </Button>
      </Box>
    </Container>
  );
}
