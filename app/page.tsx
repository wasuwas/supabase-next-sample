import { Button, Container, Typography, Box, Stack } from "@mui/material";
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
      <Box sx={{ mt: 4, alignItems: "center" }}>
        <Header />
        <Typography variant="h4" component="h1" gutterBottom>
          Next steps
        </Typography>
        {isSupabaseConnected ? (
          <Typography>Supabase is connected!</Typography>
        ) : (
          <Typography>Connect your Supabase project</Typography>
        )}
        <Stack spacing={2} sx={{ mt: 4, alignItems: "center" }}>
          <Button
            component={Link}
            href="/notes"
            variant="contained"
            fullWidth
            sx={{ maxWidth: 250 }}
          >
            View Notes
          </Button>
          <Button
            component={Link}
            href="/supabaseauth"
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ maxWidth: 250 }}
          >
            Try Supabase Auth
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
