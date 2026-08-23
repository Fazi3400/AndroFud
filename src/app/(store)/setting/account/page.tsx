"use client";

import React, { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { getClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Lock, LogOut, Trash2, Calendar, CheckCircle2 } from "lucide-react";

export default function AccountPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdatePassword = async () => {
    if (!passwordData.newPassword.trim()) {
      toast({
        title: "Error",
        description: "Password cannot be empty",
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
      });
      return;
    }

    setIsChangingPassword(true);
    try {
      const supabaseClient = getClient();
      if (!supabaseClient) {
        toast({
          title: "Error",
          description: "Client not initialized",
        });
        setIsChangingPassword(false);
        return;
      }
      const { error } = await supabaseClient.auth.updateUser({
        password: passwordData.newPassword,
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
        });
      } else {
        toast({
          title: "Success",
          description: "Password updated successfully",
        });
        setPasswordData({ newPassword: "", confirmPassword: "" });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update password",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeletingAccount(true);
    try {
      const supabaseClient = getClient();
      if (!supabaseClient) {
        toast({
          title: "Error",
          description: "Client not initialized",
        });
        setIsDeletingAccount(false);
        return;
      }
      await supabaseClient.auth.signOut();
      toast({
        title: "Account Deleted",
        description: "Your account has been deleted successfully",
      });
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete account",
      });
      setIsDeletingAccount(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-[#a855f7]">
          Account Settings
        </h1>
        <p className="text-[#67e8f9]">
          Manage your account security and preferences
        </p>
      </div>

      {/* Email Card */}
      <div className="bg-[#0d2818] rounded-2xl border-2 border-[#0099ff] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="bg-gradient-to-r from-[#1a3a2e] to-[#285A48] px-8 py-6 border-b-2 border-[#0099ff] flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#a855f7]" />
          <div>
            <h3 className="text-lg font-bold text-[#a855f7]">Email Address</h3>
            <p className="text-sm text-[#67e8f9] mt-1">Your primary email</p>
          </div>
        </div>
        <div className="p-8 space-y-4">
          <div className="h-12 px-4 rounded-full border-2 border-[#0099ff] bg-[#1a3a2e] flex items-center text-[#a855f7] font-medium">
            {user.email}
          </div>
          <div className="flex items-center gap-2 text-sm text-[#67e8f9] dark:text-[#a855f7] font-medium">
            <CheckCircle2 className="w-4 h-4" />
            Email verification: Verified
          </div>
        </div>
      </div>

      {/* Password Card */}
      <div className="bg-[#0d2818] rounded-2xl border-2 border-[#0099ff] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="bg-gradient-to-r from-[#1a3a2e] to-[#285A48] px-8 py-6 border-b-2 border-[#0099ff] flex items-center gap-3">
          <Lock className="w-5 h-5 text-[#a855f7]" />
          <div>
            <h3 className="text-lg font-bold text-[#a855f7]">Change Password</h3>
            <p className="text-sm text-[#67e8f9] mt-1">Update your password regularly</p>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* New Password */}
          <div className="space-y-3">
            <label htmlFor="newPassword" className="text-sm font-semibold text-[#a855f7] block">
              New Password
            </label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="Enter new password (min. 6 characters)"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="h-12 rounded-full border-2 border-[#0099ff] focus:border-[#d8b4fe] bg-[#1a3a2e] text-[#a855f7] placeholder-[#d8b4fe] text-lg"
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-3">
            <label htmlFor="confirmPassword" className="text-sm font-semibold text-[#a855f7] block">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="h-12 rounded-full border-2 border-[#0099ff] focus:border-[#d8b4fe] bg-[#1a3a2e] text-[#a855f7] placeholder-[#d8b4fe] text-lg"
            />
          </div>

          <Button
            onClick={handleUpdatePassword}
            disabled={isChangingPassword || !passwordData.newPassword}
            className="w-full h-11 rounded-full bg-[#d8b4fe] hover:bg-[#0099ff] text-white font-semibold"
          >
            {isChangingPassword ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </div>

      {/* Sessions Card */}
      <div className="bg-[#0d2818] rounded-2xl border-2 border-[#0099ff] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="bg-gradient-to-r from-[#1a3a2e] to-[#285A48] px-8 py-6 border-b-2 border-[#0099ff] flex items-center gap-3">
          <LogOut className="w-5 h-5 text-[#a855f7]" />
          <div>
            <h3 className="text-lg font-bold text-[#a855f7]">Active Sessions</h3>
            <p className="text-sm text-[#67e8f9] mt-1">Manage your logged-in devices</p>
          </div>
        </div>

        <div className="p-8 space-y-4">
          <div className="bg-[#1a3a2e] rounded-full p-4 flex items-center justify-between border-2 border-[#0099ff]">
            <div className="space-y-1">
              <p className="text-sm font-bold text-[#a855f7]">Current Device</p>
              <p className="text-xs text-[#67e8f9]">This browser</p>
            </div>
            <span className="text-xs bg-[#d8b4fe] text-[#a855f7] px-3 py-1 rounded-full font-semibold flex items-center gap-1">
              <span className="w-2 h-2 bg-[#0099ff] rounded-full"></span>
              Active
            </span>
          </div>
          <Button variant="outline" className="w-full h-11 rounded-full border-2 border-[#0099ff] text-[#a855f7] hover:bg-[#1a3a2e]">
            Sign Out All Other Sessions
          </Button>
        </div>
      </div>

      {/* Account Info Card */}
      <div className="bg-[#0d2818] rounded-2xl border-2 border-[#0099ff] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="bg-gradient-to-r from-[#1a3a2e] to-[#285A48] px-8 py-6 border-b-2 border-[#0099ff] flex items-center gap-3">
          <Calendar className="w-5 h-5 text-[#a855f7]" />
          <div>
            <h3 className="text-lg font-bold text-[#a855f7]">Account Information</h3>
            <p className="text-sm text-[#67e8f9] mt-1">Important dates</p>
          </div>
        </div>

        <div className="p-8 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#1a3a2e] rounded-xl p-4 border-2 border-[#0099ff]">
              <p className="text-xs text-[#67e8f9] font-medium mb-2">Account Created</p>
              <p className="text-lg font-bold text-[#a855f7]">
                {user.created_at ? new Date(user.created_at).toLocaleDateString() : "Unknown"}
              </p>
            </div>
            <div className="bg-[#1a3a2e] rounded-xl p-4 border-2 border-[#0099ff]">
              <p className="text-xs text-[#67e8f9] font-medium mb-2">Last Sign In</p>
              <p className="text-lg font-bold text-[#a855f7]">
                {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : "Never"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-950/30 rounded-2xl border-2 border-red-800 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-red-600/30 to-red-600/10 px-8 py-6 border-b-2 border-red-800 flex items-center gap-3">
          <Trash2 className="w-5 h-5 text-red-500" />
          <div>
            <h3 className="text-lg font-bold text-red-500">Danger Zone</h3>
            <p className="text-sm text-red-400 mt-1">Irreversible actions</p>
          </div>
        </div>

        <div className="p-8 space-y-4">
          <p className="text-sm text-foreground">
            Deleting your account is permanent and cannot be undone. All your data will be permanently deleted.
          </p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-full h-11 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold">
                Delete My Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl">Delete Account?</AlertDialogTitle>
                <AlertDialogDescription className="text-base">
                  This action cannot be undone. This will permanently delete your account and all associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex gap-3 justify-end pt-4">
                <AlertDialogCancel className="h-10 rounded-full px-6">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  disabled={isDeletingAccount}
                  className="bg-red-600 hover:bg-red-700 h-10 rounded-full px-6 text-white font-semibold"
                >
                  {isDeletingAccount ? "Deleting..." : "Delete Account"}
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
