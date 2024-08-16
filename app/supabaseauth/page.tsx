"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button, Container, Typography, Box, Paper } from "@mui/material";
import { User } from "@supabase/supabase-js";

export default function SupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/supabaseauth`,
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Supabase Authentication
        </Typography>

        {user ? (
          <Paper elevation={3} sx={{ p: 3, mt: 3, width: "100%" }}>
            <Typography variant="h6" gutterBottom>
              User Information
            </Typography>
            <Typography>ID: {user.id}</Typography>
            <Typography>Email: {user.email}</Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSignOut}
              sx={{ mt: 2 }}
            >
              Sign Out
            </Button>
          </Paper>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignIn}
            sx={{ mt: 2 }}
          >
            Sign In with GitHub
          </Button>
        )}
      </Box>
    </Container>
  );
}
