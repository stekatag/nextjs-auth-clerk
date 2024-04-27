"use client";
import React, { useState } from "react";
import { useAuth, useSignIn } from "@clerk/nextjs";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

const ForgotPasswordPage: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  // If the user is already signed in,
  // redirect them to the home page
  if (isSignedIn) {
    router.push("/");
  }

  // Send the password reset code to the user's email
  async function create(e: React.FormEvent) {
    e.preventDefault();
    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then((_) => {
        setSuccessfulCreation(true);
        setError("");
      })
      .catch((err) => {
        const errorMessage = err.errors[0].longMessage;
        console.error("error", errorMessage);
        // Check if the error message contains the specific error
        if (
          errorMessage.includes(
            "`reset_password_email_code` isn't allowed for `strategy` when user's password is not set."
          )
        ) {
          setError(
            "It looks like your account was created using a third-party service and does not have a password set directly with us. To reset your access, please log in through the third-party service you used originally."
          );
        } else {
          setError(errorMessage);
        }
      });
  }

  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the home page
  async function reset(e: React.FormEvent) {
    e.preventDefault();
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((result) => {
        // Check if 2FA is required
        if (result.status === "needs_second_factor") {
          setSecondFactor(true);
          setError("");
        } else if (result.status === "complete") {
          // Set the active session to
          // the newly created session (user is now signed in)
          setActive({ session: result.createdSessionId });
          setError("");
        } else {
          console.log(result);
        }
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  return (
    <Card className="flex flex-col gap-4 p-6">
      <CardTitle className="text-center">Forgot your password?</CardTitle>
      <CardDescription>
        Enter your email address to receive a password reset code
      </CardDescription>
      <form
        className="flex flex-col space-y-4"
        onSubmit={!successfulCreation ? create : reset}
      >
        {!successfulCreation && (
          <>
            <Label htmlFor="email">Please provide your email address</Label>
            <Input
              type="email"
              placeholder="e.g john@doe.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button>Send password reset code</Button>
            {error && (
              <Alert className="text-left max-w-md" variant="destructive">
                <AlertCircle />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="">{error}</AlertDescription>
              </Alert>
            )}
          </>
        )}

        {successfulCreation && (
          <>
            <Label htmlFor="password">Enter your new password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Label htmlFor="password">
              Enter the password reset code that was sent to your email
            </Label>
            <Input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <Button>Reset</Button>
            {error && <p>{error}</p>}
          </>
        )}

        {secondFactor && (
          <p className="">2FA is required, but this UI does not handle that</p>
        )}
      </form>
    </Card>
  );
};

export default ForgotPasswordPage;
