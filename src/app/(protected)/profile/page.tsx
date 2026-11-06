"use client";

import {
  AtSign,
  CircleUserRound,
  Hash,
  Mail,
  UserRound,
  VenusAndMars,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/hooks/hooks";
import Image from "next/image";

export default function ProfilePage() {
  const { user, initialized, error } = useAppSelector((state) => state.auth);

  if (!initialized) {
    return (
      <main className="mx-auto w-full max-w-4xl space-y-6 p-6 md:p-8">
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <Skeleton className="size-16 shrink-0 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-32" />
            </div>
          </CardContent>
          <CardContent className="grid gap-5 pt-4 sm:grid-cols-2">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="h-16" />
            ))}
          </CardContent>
        </Card>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto w-full max-w-4xl p-6 md:p-8">
        <p role="alert" className="text-sm text-destructive">
          {error ?? "Unable to load your profile. Please refresh the page."}
        </p>
      </main>
    );
  }

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
  const displayName = fullName || user.username;
  const initials =
    fullName
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || user.username.slice(0, 2).toUpperCase();

  const details = [
    { label: "Full name", value: fullName || "Not provided", icon: UserRound },
    { label: "Username", value: user.username, icon: AtSign },
    { label: "Email address", value: user.email, icon: Mail },
    {
      label: "Gender",
      value: user.gender || "Not provided",
      icon: VenusAndMars,
    },
    { label: "Account ID", value: String(user.id), icon: Hash },
  ];
  console.log("User image: ", typeof user.image);

  return (
    <main className="mx-auto w-full max-w-4xl space-y-6 p-6 md:p-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Your profile
        </h1>
        <p className="text-sm text-muted-foreground">
          View the personal details associated with your account.
        </p>
      </header>

      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <div
            aria-hidden="true"
            className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary"
          >
            {user.image ? (
              <Image
                src={user.image}
                alt="user image"
                width={64}
                height={64}
                className="size-full object-cover"
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>
          <div className="min-w-0 space-y-1">
            <CardTitle className="truncate text-xl">{displayName}</CardTitle>
            <CardDescription className="truncate">{user.email}</CardDescription>
          </div>
          <Badge variant="secondary" className="ml-auto shrink-0">
            Account
          </Badge>
        </CardHeader>

        <Separator />

        <CardContent className="grid gap-5 pt-6 sm:grid-cols-2">
          {details.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex min-w-0 items-start gap-3">
              <div className="mt-0.5 rounded-lg bg-muted p-2 text-muted-foreground">
                <Icon aria-hidden="true" className="size-4" />
              </div>
              <div className="min-w-0 space-y-1">
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="break-words text-sm font-medium">{value}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
